import "./MayoTextarea.css";
import type { MayoTextareaProps } from "./MayoTextarea.types";

export function MayoTextarea({ label, labelAlign = "left", error, hint, hintPosition = "bottom", size = "md", className = "", id, ...props }: MayoTextareaProps) {
    const textareaId = id ?? (label ? `mayo-textarea-${label}` : undefined);
    const textareaClassName = ["mayo-textarea", `mayo-textarea--${size}`, error ? "mayo-textarea--error" : "", className]
        .filter(Boolean)
        .join(" ");

    const hintEl = !error && hint && <span className="mayo-textarea__hint">{hint}</span>;

    return (
        <div className="mayo-textarea-wrapper">
            {label && (
                <label className="mayo-textarea__label" style={{ textAlign: labelAlign }} htmlFor={textareaId}>
                    {label}
                </label>
            )}
            {hintPosition === "top" && hintEl}
            <textarea id={textareaId} className={textareaClassName} {...props} />
            {error && <span className="mayo-textarea__error">{error}</span>}
            {hintPosition === "bottom" && hintEl}
        </div>
    );
}
