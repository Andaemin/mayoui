import "./MayoSelect.css";
import type { MayoSelectProps } from "./MayoSelect.types";

export function MayoSelect({ label, labelAlign = "left", error, hint, size = "md", placeholder, options, className = "", id, ...props }: MayoSelectProps) {
    const selectId = id ?? (label ? `mayo-select-${label}` : undefined);
    const selectClassName = ["mayo-select", `mayo-select--${size}`, error ? "mayo-select--error" : "", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="mayo-select-wrapper">
            {label && (
                <label className="mayo-select__label" style={{ textAlign: labelAlign }} htmlFor={selectId}>
                    {label}
                </label>
            )}
            <div className="mayo-select__container">
                <select id={selectId} className={selectClassName} {...props}>
                    {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="mayo-select__arrow">▾</span>
            </div>
            {error && <span className="mayo-select__error">{error}</span>}
            {!error && hint && <span className="mayo-select__hint">{hint}</span>}
        </div>
    );
}
