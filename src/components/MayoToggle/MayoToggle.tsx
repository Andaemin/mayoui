import "./MayoToggle.css";
import type { MayoToggleProps } from "./MayoToggle.types";

export function MayoToggle({ checked, defaultChecked, onChange, disabled, label, size = "md", color = "blue" }: MayoToggleProps) {
    return (
        <label className={`mayo-toggle-wrapper ${disabled ? "mayo-toggle-wrapper--disabled" : ""}`}>
            <input
                type="checkbox"
                className="mayo-toggle__input"
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            <span className={`mayo-toggle mayo-toggle--${size} mayo-toggle--${color}`} />
            {label && <span className="mayo-toggle__label">{label}</span>}
        </label>
    );
}
