import type { ReactNode } from "react";

export type MayoCardVariant = "outlined" | "elevated" | "flat";
export type MayoCardPadding = "sm" | "md" | "lg";

export type MayoCardProps = {
    title?: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    image?: string;
    variant?: MayoCardVariant;
    padding?: MayoCardPadding;
};
