import type { PropsWithChildren, ReactNode } from "react";

export type MayoDialogSize = "sm" | "md" | "lg";

export type MayoDialogProps = PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    footer?: ReactNode;
    size?: MayoDialogSize;
    closeOnBackdrop?: boolean;
}>;
