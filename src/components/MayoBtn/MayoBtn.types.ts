import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type MayoBtnVariant = "primary" | "secondary" | "ghost";
export type MayoBtnSize = "sm" | "md" | "lg";

export type MayoBtnProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    variant?: MayoBtnVariant;
    size?: MayoBtnSize;
};
