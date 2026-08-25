import "./MayoTooltip.css";
import type { MayoTooltipProps } from "./MayoTooltip.types";

export function MayoTooltip({ content, children, position = "top" }: MayoTooltipProps) {
    return (
        <span className="mayo-tooltip-wrapper">
            {children}
            <span className={`mayo-tooltip mayo-tooltip--${position}`}>{content}</span>
        </span>
    );
}
