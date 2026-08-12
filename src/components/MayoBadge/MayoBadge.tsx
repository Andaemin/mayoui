import "./MayoBadge.css";
import type { MayoBadgeProps } from "./MayoBadge.types";

export function MayoBadge({ children, color = "blue", variant = "soft", size = "md", icon, iconClassName = "" }: MayoBadgeProps) {
    const className = ["mayo-badge", `mayo-badge--${variant}`, `mayo-badge--${color}`, `mayo-badge--${size}`].join(" ");
    const iconClass = ["mayo-badge__icon", iconClassName].filter(Boolean).join(" ");

    return (
        <span className={className}>
            {icon && <span className={iconClass}>{icon}</span>}
            {children}
        </span>
    );
}
