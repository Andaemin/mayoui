import { useState } from "react";
import "./MayoCalendar.css";
import type { MayoCalendarProps } from "./MayoCalendar.types";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function toStr(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isSameDay(a: string, b: string) { return a === b; }
function isToday(str: string) { return str === toStr(...todayParts()); }
function todayParts(): [number, number, number] {
    const t = new Date();
    return [t.getFullYear(), t.getMonth(), t.getDate()];
}

export function MayoCalendar({ value, onChange, events = [], minDate, maxDate }: MayoCalendarProps) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [mode, setMode] = useState<"day" | "month" | "year">("day");

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const eventMap = new Map<string, typeof events>();
    for (const ev of events) {
        if (!eventMap.has(ev.date)) eventMap.set(ev.date, []);
        eventMap.get(ev.date)!.push(ev);
    }

    const yearBase = Math.floor(viewYear / 12) * 12;
    const years = Array.from({ length: 12 }, (_, i) => yearBase + i);

    const isDisabled = (str: string) => {
        if (minDate && str < minDate) return true;
        if (maxDate && str > maxDate) return true;
        return false;
    };

    return (
        <div className="mayo-calendar">
            {/* 헤더 */}
            <div className="mayo-calendar__header">
                <button className="mayo-calendar__nav" onClick={mode === "year" ? () => setViewYear(y => y - 12) : mode === "month" ? () => setViewYear(y => y - 1) : prevMonth}>‹</button>
                <div className="mayo-calendar__title">
                    <button className="mayo-calendar__title-btn" onClick={() => setMode(m => m === "year" ? "day" : "year")}>
                        {mode === "year" ? `${yearBase} - ${yearBase + 11}` : `${viewYear}년`}
                    </button>
                    {mode !== "year" && (
                        <button className="mayo-calendar__title-btn" onClick={() => setMode(m => m === "month" ? "day" : "month")}>
                            {MONTHS[viewMonth]}
                        </button>
                    )}
                </div>
                <button className="mayo-calendar__nav" onClick={mode === "year" ? () => setViewYear(y => y + 12) : mode === "month" ? () => setViewYear(y => y + 1) : nextMonth}>›</button>
            </div>

            {/* year picker */}
            {mode === "year" && (
                <div className="mayo-calendar__year-grid">
                    {years.map(y => (
                        <button key={y} className={`mayo-calendar__year-btn${y === viewYear ? " mayo-calendar__year-btn--active" : ""}`}
                            onClick={() => { setViewYear(y); setMode("month"); }}>
                            {y}
                        </button>
                    ))}
                </div>
            )}

            {/* month picker */}
            {mode === "month" && (
                <div className="mayo-calendar__month-grid">
                    {MONTHS.map((m, i) => (
                        <button key={m} className={`mayo-calendar__month-btn${i === viewMonth ? " mayo-calendar__month-btn--active" : ""}`}
                            onClick={() => { setViewMonth(i); setMode("day"); }}>
                            {m}
                        </button>
                    ))}
                </div>
            )}

            {/* day grid */}
            {mode === "day" && (
                <>
                    <div className="mayo-calendar__weekdays">
                        {DAYS.map((d, i) => (
                            <span key={d} className={`mayo-calendar__weekday${i === 0 ? " mayo-calendar__weekday--sun" : i === 6 ? " mayo-calendar__weekday--sat" : ""}`}>{d}</span>
                        ))}
                    </div>
                    <div className="mayo-calendar__grid">
                        {cells.map((day, i) => {
                            if (!day) return <div key={i} className="mayo-calendar__cell mayo-calendar__cell--empty" />;
                            const dateStr = toStr(viewYear, viewMonth, day);
                            const evs = eventMap.get(dateStr) ?? [];
                            const selected = value ? isSameDay(dateStr, value) : false;
                            const today_ = isToday(dateStr);
                            const disabled = isDisabled(dateStr);
                            const isSun = i % 7 === 0;
                            const isSat = i % 7 === 6;

                            return (
                                <div
                                    key={i}
                                    className={[
                                        "mayo-calendar__cell",
                                        selected ? "mayo-calendar__cell--selected" : "",
                                        today_ && !selected ? "mayo-calendar__cell--today" : "",
                                        disabled ? "mayo-calendar__cell--disabled" : "",
                                        isSun && !selected ? "mayo-calendar__cell--sun" : "",
                                        isSat && !selected ? "mayo-calendar__cell--sat" : "",
                                    ].filter(Boolean).join(" ")}
                                    onClick={() => !disabled && onChange?.(dateStr)}
                                >
                                    <span className="mayo-calendar__day-num">{day}</span>
                                    {evs.length > 0 && (
                                        <div className="mayo-calendar__events">
                                            {evs.slice(0, 2).map((ev, ei) => (
                                                <span key={ei} className="mayo-calendar__event" style={{ background: ev.color ?? "var(--mayo-color-primary)" }}>
                                                    {ev.label}
                                                </span>
                                            ))}
                                            {evs.length > 2 && <span className="mayo-calendar__event-more">+{evs.length - 2}</span>}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
