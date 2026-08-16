import "./MayoLoadingSpinner.css";
import type { MayoLoadingSpinnerProps } from "./MayoLoadingSpinner.types";

export function MayoLoadingSpinner({ size = "md", color = "blue", label }: MayoLoadingSpinnerProps) {
    return (
        <div className="mayo-spinner-wrapper" role="status" aria-label={label ?? "로딩 중"}>
            <span className={`mayo-spinner mayo-spinner--${size} mayo-spinner--${color}`} />
            {label && <span className="mayo-spinner__label">{label}</span>}
        </div>
    );
}
