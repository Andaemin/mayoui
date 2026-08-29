import { useState, useRef, useEffect } from "react";
import "./MayoTimePicker.css";
import type { MayoTimePickerProps } from "./MayoTimePicker.types";

function pad(n: number) { return String(n).padStart(2, "0"); }

function isOutOfRange(h: number, m: number, min?: string, max?: string): boolean {
    const val = `${pad(h)}:${pad(m)}`;
    if (min && val < min) return true;
    if (max && val > max) return true;
    return false;
}

export function MayoTimePicker({
    value,
    onChange,
    placeholder = "시간 선택",
    disabled = false,
    minuteStep = 5,
    minTime,
    maxTime,
}: MayoTimePickerProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [selHour, selMin] = value
        ? value.split(":").map(Number)
        : [null, null];

    const [viewHour, setViewHour] = useState(selHour ?? 9);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

    const select = (h: number, m: number) => {
        if (isOutOfRange(h, m, minTime, maxTime)) return;
        onChange?.(`${pad(h)}:${pad(m)}`);
        setOpen(false);
    };

    return (
        <div className="mayo-timepicker" ref={wrapperRef}>
            <button
                type="button"
                className={`mayo-timepicker__input${open ? " mayo-timepicker__input--open" : ""}${disabled ? " mayo-timepicker__input--disabled" : ""}`}
                onClick={() => !disabled && setOpen(o => !o)}
                disabled={disabled}
            >
                <span className={value ? "mayo-timepicker__value" : "mayo-timepicker__placeholder"}>
                    {value || placeholder}
                </span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 4.5V8l2.5 2" strokeLinecap="round" />
                </svg>
            </button>

            {open && (
                <div className="mayo-timepicker__popup">
                    <div className="mayo-timepicker__columns">
                        {/* 시 */}
                        <div className="mayo-timepicker__col">
                            <div className="mayo-timepicker__col-header">시</div>
                            <div className="mayo-timepicker__col-list">
                                {hours.map(h => (
                                    <button
                                        key={h}
                                        className={`mayo-timepicker__item${h === viewHour ? " mayo-timepicker__item--hover" : ""}${h === selHour ? " mayo-timepicker__item--selected" : ""}`}
                                        onClick={() => setViewHour(h)}
                                    >
                                        {pad(h)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mayo-timepicker__sep">:</div>

                        {/* 분 */}
                        <div className="mayo-timepicker__col">
                            <div className="mayo-timepicker__col-header">분</div>
                            <div className="mayo-timepicker__col-list">
                                {minutes.map(m => {
                                    const outOfRange = isOutOfRange(viewHour, m, minTime, maxTime);
                                    const isSelected = viewHour === selHour && m === selMin;
                                    return (
                                        <button
                                            key={m}
                                            className={`mayo-timepicker__item${isSelected ? " mayo-timepicker__item--selected" : ""}${outOfRange ? " mayo-timepicker__item--disabled" : ""}`}
                                            onClick={() => select(viewHour, m)}
                                            disabled={outOfRange}
                                        >
                                            {pad(m)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
