import "./MayoDivider.css";
import type { MayoDividerProps } from "./MayoDivider.types";

export function MayoDivider({ orientation = "horizontal", variant = "solid", label, color = "#e5e7eb", thickness = 1 }: MayoDividerProps) {
    const style = {
        borderColor: color,
        borderWidth: thickness,
    };

    if (orientation === "vertical") {
        return <div className="mayo-divider mayo-divider--vertical" style={{ ...style, borderLeftStyle: variant }} />;
    }

    if (label) {
        return (
            <div className="mayo-divider mayo-divider--horizontal mayo-divider--labeled">
                <div className="mayo-divider__line" style={{ ...style, borderTopStyle: variant }} />
                <span className="mayo-divider__label">{label}</span>
                <div className="mayo-divider__line" style={{ ...style, borderTopStyle: variant }} />
            </div>
        );
    }

    return <hr className={`mayo-divider mayo-divider--horizontal mayo-divider--${variant}`} style={style} />;
}
