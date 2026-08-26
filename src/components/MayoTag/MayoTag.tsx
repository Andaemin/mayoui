import "./MayoTag.css";
import type { MayoTagProps } from "./MayoTag.types";

export function MayoTag({
    children,
    color = "blue",
    variant = "soft",
    size = "md",
    icon,
    iconClassName,
    onClose,
}: MayoTagProps) {
    return (
        <span className={`mayo-tag mayo-tag--${size} mayo-tag--${variant} mayo-tag--${color}`}>
            {icon && (
                <span className={`mayo-tag__icon${iconClassName ? ` ${iconClassName}` : ""}`}>
                    {icon}
                </span>
            )}
            <span className="mayo-tag__label">{children}</span>
            {onClose && (
                <button
                    className="mayo-tag__close"
                    onClick={onClose}
                    aria-label="태그 제거"
                    type="button"
                >
                    ×
                </button>
            )}
        </span>
    );
}
