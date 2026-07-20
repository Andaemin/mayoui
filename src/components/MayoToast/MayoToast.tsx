import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./MayoToast.css";
import type { MayoToastProps } from "./MayoToast.types";

const ICONS: Record<string, string> = {
    success: "✅",
    error: "❌",
    info: "💡",
    warning: "⚠️",
};

export function MayoToast({ open, onClose, type = "info", position = "top-right", duration = 3000, children }: MayoToastProps) {
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    return createPortal(
        <div className={`mayo-toast mayo-toast--${type} mayo-toast--${position} ${open ? "mayo-toast--open" : ""}`} role="alert" aria-live="polite">
            <span className="mayo-toast__icon">{ICONS[type]}</span>
            <span className="mayo-toast__message">{children}</span>
            <button className="mayo-toast__close" onClick={onClose} aria-label="닫기">
                ✕
            </button>
        </div>,
        document.body,
    );
}
