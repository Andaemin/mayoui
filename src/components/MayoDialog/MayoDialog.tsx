import { useEffect, useRef } from "react";
import { MayoBtn } from "../MayoBtn";
import "./MayoDialog.css";
import type { MayoDialogProps } from "./MayoDialog.types";

export function MayoDialog({ open, onClose, title, footer, children, size = "md", closeOnBackdrop = true }: MayoDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const mayoDialog = dialogRef.current;
        if (!mayoDialog) return;
        if (open) {
            mayoDialog.showModal();
        } else {
            mayoDialog.close();
        }
    }, [open]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (closeOnBackdrop && e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog ref={dialogRef} className={`mayo-dialog mayo-dialog--${size}`} onClick={handleBackdropClick} onCancel={onClose}>
            {title && (
                <div className="mayo-dialog__header">
                    <span className="mayo-dialog__title">{title}</span>
                    <MayoBtn variant="ghost" size="sm" onClick={onClose} aria-label="닫기">
                        ✕
                    </MayoBtn>
                </div>
            )}
            <div className="mayo-dialog__body">{children}</div>
            {footer && <div className="mayo-dialog__footer">{footer}</div>}
        </dialog>
    );
}
