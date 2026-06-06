import type { PropsWithChildren, HTMLAttributes } from "react";

export type MayoDialogProps = PropsWithChildren<{
    open: boolean;
    onClose: () => void;
}>;

export type MayoDialogContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

// const DialogContext = createContext<DialogContextValue | null>(null);
