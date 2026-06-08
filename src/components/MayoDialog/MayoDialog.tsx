import { useEffect, useRef } from "react";
import "./MayoDialog.css";
import type { MayoDialogProps } from "./MayoDialog.types";

export function MayoDialog({
    open,
    onClose,
    title,
    footer,
    children,
    size = "md",
    closeOnBackdrop = true,
}: MayoDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [open]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (closeOnBackdrop && e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={`mayo-dialog mayo-dialog--${size}`}
            onClick={handleBackdropClick}
            onCancel={onClose}
        >
            {title && (
                <div className="mayo-dialog__header">
                    <span className="mayo-dialog__title">{title}</span>
                    <button className="mayo-dialog__close" onClick={onClose} aria-label="닫기">
                        ✕
                    </button>
                </div>
            )}
            <div className="mayo-dialog__body">{children}</div>
            {footer && <div className="mayo-dialog__footer">{footer}</div>}
        </dialog>
    );
}
