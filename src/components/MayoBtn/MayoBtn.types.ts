import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type MayoBtnVariant = "primary" | "secondary" | "ghost";
export type MayoBtnSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type MayoBtnProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    variant?: MayoBtnVariant;
    size?: MayoBtnSize;
};
