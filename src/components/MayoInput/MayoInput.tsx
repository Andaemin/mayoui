import "./MayoInput.css";
import type { MayoInputProps } from "./MayoInput.types";

export function MayoInput({ label, labelAlign = "left", error, hint, size = "md", className = "", id, ...props }: MayoInputProps) {
    const inputId = id ?? (label ? `mayo-input-${label}` : undefined);
    const inputClassName = ["mayo-input", `mayo-input--${size}`, error ? "mayo-input--error" : "", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="mayo-input-wrapper">
            {label && (
                <label className="mayo-input__label" style={{ textAlign: labelAlign }} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input id={inputId} className={inputClassName} {...props} />
            {error && <span className="mayo-input__error">{error}</span>}
            {!error && hint && <span className="mayo-input__hint">{hint}</span>}
        </div>
    );
}
