import { useEffect, useState } from "react";
import "./MayoDrawer.css";
import type { MayoDrawerProps } from "./MayoDrawer.types";

export function MayoDrawer({
    open,
    onClose,
    position = "right",
    size = 320,
    title,
    children,
    closeOnBackdrop = true,
}: MayoDrawerProps) {
    // position이 바뀌면 항상 동기화 (닫힌 상태에서 off-screen 전환은 어차피 안 보임)
    const [activePosition, setActivePosition] = useState(position);
    useEffect(() => {
        setActivePosition(position);
    }, [position]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const isHorizontal = activePosition === "left" || activePosition === "right";
    const sizeStyle = isHorizontal
        ? { width: typeof size === "number" ? `${size}px` : size }
        : { height: typeof size === "number" ? `${size}px` : size };

    return (
        <div className={`mayo-drawer-root${open ? " mayo-drawer-root--open" : ""}`}>
            <div
                className="mayo-drawer__backdrop"
                onClick={closeOnBackdrop ? onClose : undefined}
            />
            <div
                className={`mayo-drawer mayo-drawer--${activePosition}${open ? " mayo-drawer--open" : ""}`}
                style={sizeStyle}
                role="dialog"
                aria-modal="true"
            >
                <div className="mayo-drawer__header">
                    {title && <span className="mayo-drawer__title">{title}</span>}
                    <button className="mayo-drawer__close" onClick={onClose} aria-label="닫기">
                        ✕
                    </button>
                </div>
                <div className="mayo-drawer__body">{children}</div>
            </div>
        </div>
    );
}
