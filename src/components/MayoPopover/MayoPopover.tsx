import { useState, useRef, useEffect } from "react";
import "./MayoPopover.css";
import type { MayoPopoverProps } from "./MayoPopover.types";

export function MayoPopover({
    trigger,
    content,
    position = "bottom",
    title,
    closeOnContentClick = false,
}: MayoPopoverProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    return (
        <div className="mayo-popover-wrapper" ref={wrapperRef}>
            <div className="mayo-popover__trigger" onClick={() => setOpen(o => !o)}>
                {trigger}
            </div>

            {open && (
                <div
                    className={`mayo-popover mayo-popover--${position}`}
                    onClick={closeOnContentClick ? () => setOpen(false) : undefined}
                >
                    <div className={`mayo-popover__arrow mayo-popover__arrow--${position}`} />
                    {title && <div className="mayo-popover__title">{title}</div>}
                    <div className="mayo-popover__content">{content}</div>
                </div>
            )}
        </div>
    );
}
