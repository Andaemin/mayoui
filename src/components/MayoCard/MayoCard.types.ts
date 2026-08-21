import type { HTMLAttributes, ReactNode } from "react";

export type MayoCardVariant = "outlined" | "elevated" | "flat";
export type MayoCardPadding = "sm" | "md" | "lg";

export type MayoCardProps = HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
    footer?: ReactNode;
    image?: string;
    variant?: MayoCardVariant;
    padding?: MayoCardPadding;
};
