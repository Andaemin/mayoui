import { useState, useRef, useEffect } from "react";
import "./MayoDatePicker.css";
import type { MayoDatePickerProps } from "./MayoDatePicker.types";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function toDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function toMonthStr(y: number, m: number): string {
    return `${y}-${String(m + 1).padStart(2, "0")}`;
}

function parseDate(str: string): Date | null {
    if (!str) return null;
    const d = new Date(str.length === 4 ? `${str}-01-01` : str.length === 7 ? `${str}-01` : str);
    return isNaN(d.getTime()) ? null : d;
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isOutOfRange(date: Date, min?: string, max?: string): boolean {
    const d = toDateStr(date);
    if (min && d < min) return true;
    if (max && d > max) return true;
    return false;
}

export function MayoDatePicker({
    value,
    onChange,
    placeholder,
    disabled = false,
    minDate,
    maxDate,
    mode: pickerMode = "date",
}: MayoDatePickerProps) {
    const defaultPlaceholder = pickerMode === "year" ? "년도 선택" : pickerMode === "month" ? "년/월 선택" : "날짜 선택";
    const selected = value ? parseDate(value) : null;
    const today = new Date();

    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());
    const [calMode, setCalMode] = useState<"day" | "month" | "year">(
        pickerMode === "year" ? "year" : pickerMode === "month" ? "month" : "day"
    );

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setCalMode(pickerMode === "year" ? "year" : pickerMode === "month" ? "month" : "day");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [pickerMode]);

    const openCalendar = () => {
        if (disabled) return;
        if (selected) {
            setViewYear(selected.getFullYear());
            setViewMonth(selected.getMonth());
        }
        setOpen(true);
    };

    const selectDate = (date: Date) => {
        if (isOutOfRange(date, minDate, maxDate)) return;
        onChange?.(toDateStr(date));
        setOpen(false);
        setCalMode("day");
    };

    const selectMonth = (y: number, m: number) => {
        if (pickerMode === "month") {
            onChange?.(toMonthStr(y, m));
            setOpen(false);
        } else {
            setViewMonth(m);
            setCalMode("day");
        }
    };

    const selectYear = (y: number) => {
        if (pickerMode === "year") {
            onChange?.(String(y));
            setOpen(false);
        } else {
            setViewYear(y);
            setCalMode(pickerMode === "month" ? "month" : "day");
        }
    };

    const prevNav = () => {
        if (calMode === "year") setViewYear(y => y - 12);
        else if (calMode === "month") setViewYear(y => y - 1);
        else { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }
    };
    const nextNav = () => {
        if (calMode === "year") setViewYear(y => y + 12);
        else if (calMode === "month") setViewYear(y => y + 1);
        else { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }
    };

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const yearBase = Math.floor(viewYear / 12) * 12;
    const years = Array.from({ length: 12 }, (_, i) => yearBase + i);

    const selectedYear = selected?.getFullYear();
    const selectedMonth = selected?.getMonth();

    return (
        <div className="mayo-datepicker" ref={wrapperRef}>
            <button
                type="button"
                className={`mayo-datepicker__input${open ? " mayo-datepicker__input--open" : ""}${disabled ? " mayo-datepicker__input--disabled" : ""}`}
                onClick={openCalendar}
                disabled={disabled}
            >
                <span className={value ? "mayo-datepicker__value" : "mayo-datepicker__placeholder"}>
                    {value || placeholder || defaultPlaceholder}
                </span>
                <svg className="mayo-datepicker__icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="14" height="12" rx="2" />
                    <path d="M5 1v4M11 1v4M1 7h14" />
                </svg>
            </button>

            {open && (
                <div className="mayo-datepicker__popup">
                    <div className="mayo-datepicker__header">
                        <button className="mayo-datepicker__nav" onClick={prevNav}>‹</button>
                        <div className="mayo-datepicker__title">
                            <button
                                className="mayo-datepicker__title-btn"
                                onClick={() => pickerMode !== "year" && setCalMode(c => c === "year" ? (pickerMode === "month" ? "month" : "day") : "year")}
                            >
                                {calMode === "year" ? `${yearBase} - ${yearBase + 11}` : `${viewYear}년`}
                            </button>
                            {calMode === "day" && (
                                <button className="mayo-datepicker__title-btn" onClick={() => setCalMode("month")}>
                                    {MONTHS[viewMonth]}
                                </button>
                            )}
                        </div>
                        <button className="mayo-datepicker__nav" onClick={nextNav}>›</button>
                    </div>

                    {/* year picker */}
                    {calMode === "year" && (
                        <div className="mayo-datepicker__year-grid">
                            {years.map(y => (
                                <button
                                    key={y}
                                    className={`mayo-datepicker__year-btn${y === selectedYear ? " mayo-datepicker__year-btn--active" : ""}${y === viewYear && pickerMode !== "year" ? " mayo-datepicker__year-btn--view" : ""}`}
                                    onClick={() => selectYear(y)}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* month picker */}
                    {calMode === "month" && (
                        <div className="mayo-datepicker__month-grid">
                            {MONTHS.map((m, i) => (
                                <button
                                    key={m}
                                    className={`mayo-datepicker__month-btn${i === selectedMonth && viewYear === selectedYear ? " mayo-datepicker__month-btn--active" : ""}${i === viewMonth && pickerMode !== "month" ? " mayo-datepicker__month-btn--view" : ""}`}
                                    onClick={() => selectMonth(viewYear, i)}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* day picker */}
                    {calMode === "day" && (
                        <>
                            <div className="mayo-datepicker__weekdays">
                                {DAYS.map(d => <span key={d} className={`mayo-datepicker__weekday${d === "일" ? " mayo-datepicker__weekday--sun" : d === "토" ? " mayo-datepicker__weekday--sat" : ""}`}>{d}</span>)}
                            </div>
                            <div className="mayo-datepicker__grid">
                                {cells.map((date, i) => {
                                    if (!date) return <span key={i} />;
                                    const isToday = isSameDay(date, today);
                                    const isSelected = selected ? isSameDay(date, selected) : false;
                                    const outOfRange = isOutOfRange(date, minDate, maxDate);
                                    const isSun = date.getDay() === 0;
                                    const isSat = date.getDay() === 6;
                                    const cls = [
                                        "mayo-datepicker__day",
                                        isSelected ? "mayo-datepicker__day--selected" : "",
                                        isToday && !isSelected ? "mayo-datepicker__day--today" : "",
                                        outOfRange ? "mayo-datepicker__day--disabled" : "",
                                        isSun && !isSelected ? "mayo-datepicker__day--sun" : "",
                                        isSat && !isSelected ? "mayo-datepicker__day--sat" : "",
                                    ].filter(Boolean).join(" ");
                                    return (
                                        <button key={i} className={cls} onClick={() => selectDate(date)} disabled={outOfRange}>
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mayo-datepicker__footer">
                                <button
                                    className="mayo-datepicker__today-btn"
                                    onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); selectDate(today); }}
                                    disabled={isOutOfRange(today, minDate, maxDate)}
                                >
                                    오늘
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
