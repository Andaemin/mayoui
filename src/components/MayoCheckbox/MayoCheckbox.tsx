import "./MayoCheckbox.css";
import type { MayoCheckboxProps } from "./MayoCheckbox.types";

export function MayoCheckbox({ checked, defaultChecked, onChange, disabled, label, size = "md", color = "blue" }: MayoCheckboxProps) {
    return (
        <label className={`mayo-checkbox-wrapper ${disabled ? "mayo-checkbox-wrapper--disabled" : ""}`}>
            <input
                type="checkbox"
                className="mayo-checkbox__input"
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            <span className={`mayo-checkbox mayo-checkbox--${size} mayo-checkbox--${color}`} />
            {label && <span className="mayo-checkbox__label">{label}</span>}
        </label>
    );
}
