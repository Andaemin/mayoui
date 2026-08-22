import "./MayoAlert.css";
import type { MayoAlertProps, MayoAlertType } from "./MayoAlert.types";

const ICONS: Record<MayoAlertType, string> = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
};

export function MayoAlert({ type = "info", title, children, onClose, iconClassName }: MayoAlertProps) {
    return (
        <div className={`mayo-alert mayo-alert--${type}`} role="alert">
            <span className={`mayo-alert__icon${iconClassName ? ` ${iconClassName}` : ""}`}>{ICONS[type]}</span>
            <div className="mayo-alert__body">
                {title && <span className="mayo-alert__title">{title}</span>}
                <span className="mayo-alert__message">{children}</span>
            </div>
            {onClose && (
                <button className="mayo-alert__close" onClick={onClose} aria-label="닫기">
                    ✕
                </button>
            )}
        </div>
    );
}
