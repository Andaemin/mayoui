import "./MayoRadio.css";
import type { MayoRadioProps } from "./MayoRadio.types";

export function MayoRadio({ name, value, checked, defaultChecked, onChange, disabled, label, size = "md", color = "blue" }: MayoRadioProps) {
    return (
        <label className={`mayo-radio-wrapper ${disabled ? "mayo-radio-wrapper--disabled" : ""}`}>
            <input
                type="radio"
                className="mayo-radio__input"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <span className={`mayo-radio mayo-radio--${size} mayo-radio--${color}`} />
            {label && <span className="mayo-radio__label">{label}</span>}
        </label>
    );
}
