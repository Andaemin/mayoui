import type { ReactNode } from "react";

export type MayoToastType = "success" | "error" | "info" | "warning";
export type MayoToastPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";

export type MayoToastProps = {
    open: boolean;
    onClose: () => void;
    type?: MayoToastType;
    position?: MayoToastPosition;
    duration?: number;
    children: ReactNode;
};
