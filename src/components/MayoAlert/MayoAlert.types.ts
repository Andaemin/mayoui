import type { ReactNode } from "react";

export type MayoAlertType = "info" | "success" | "warning" | "error";

export type MayoAlertProps = {
    type?: MayoAlertType;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    iconClassName?: string;
};
