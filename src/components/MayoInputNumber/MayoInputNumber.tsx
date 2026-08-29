import "./MayoInputNumber.css";
import type { MayoInputNumberProps } from "./MayoInputNumber.types";

export function MayoInputNumber({
    value = 0,
    onChange,
    min,
    max,
    step = 1,
    size = "md",
    disabled = false,
    label,
    hint,
    error,
    placeholder,
}: MayoInputNumberProps) {
    const clamp = (v: number) => {
        if (min !== undefined && v < min) return min;
        if (max !== undefined && v > max) return max;
        return v;
    };

    const dec = () => onChange?.(clamp(value - step));
    const inc = () => onChange?.(clamp(value + step));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) onChange?.(clamp(v));
    };

    const canDec = min === undefined || value > min;
    const canInc = max === undefined || value < max;

    return (
        <div className="mayo-input-number-wrapper">
            {label && <label className="mayo-input-number__label">{label}</label>}
            <div className={`mayo-input-number mayo-input-number--${size}${error ? " mayo-input-number--error" : ""}${disabled ? " mayo-input-number--disabled" : ""}`}>
                <button
                    type="button"
                    className="mayo-input-number__btn"
                    onClick={dec}
                    disabled={disabled || !canDec}
                    aria-label="감소"
                >
                    −
                </button>
                <input
                    type="number"
                    className="mayo-input-number__input"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className="mayo-input-number__btn"
                    onClick={inc}
                    disabled={disabled || !canInc}
                    aria-label="증가"
                >
                    +
                </button>
            </div>
            {error && <span className="mayo-input-number__error">{error}</span>}
            {!error && hint && <span className="mayo-input-number__hint">{hint}</span>}
        </div>
    );
}
