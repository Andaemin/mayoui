import "./MayoProgress.css";
import type { MayoProgressProps } from "./MayoProgress.types";

export function MayoProgress({ value, max = 100, size = "md", color = "blue", label, showValue = false }: MayoProgressProps) {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className={`mayo-progress mayo-progress--${size} mayo-progress--${color}`}>
            {(label || showValue) && (
                <div className="mayo-progress__header">
                    {label && <span className="mayo-progress__label">{label}</span>}
                    {showValue && <span className="mayo-progress__value">{Math.round(pct)}%</span>}
                </div>
            )}
            <div className="mayo-progress__track">
                <div className="mayo-progress__bar" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
