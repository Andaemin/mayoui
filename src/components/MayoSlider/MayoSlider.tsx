import "./MayoSlider.css";
import type { MayoSliderProps } from "./MayoSlider.types";

export function MayoSlider({
    value = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    color = "blue",
    disabled = false,
    showValue = false,
    label,
}: MayoSliderProps) {
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className={`mayo-slider-wrapper${disabled ? " mayo-slider-wrapper--disabled" : ""}`}>
            {(label || showValue) && (
                <div className="mayo-slider__header">
                    {label && <span className="mayo-slider__label">{label}</span>}
                    {showValue && <span className="mayo-slider__value">{value}</span>}
                </div>
            )}
            <div
                className={`mayo-slider mayo-slider--${color}`}
                style={{ "--mayo-slider-percent": `${percent}%` } as React.CSSProperties}
            >
                <input
                    type="range"
                    className="mayo-slider__input"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange?.(Number(e.target.value))}
                />
            </div>
        </div>
    );
}
