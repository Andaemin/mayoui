import "./MayoHeader.css";
import type { MayoHeaderProps } from "./MayoHeader.types";

export function MayoHeader({ logo, nav, actions }: MayoHeaderProps) {
    return (
        <header className="mayo-header">
            <div className="mayo-header__left">{logo}</div>
            <div className="mayo-header__center">{nav}</div>
            <div className="mayo-header__right">{actions}</div>
        </header>
    );
}
