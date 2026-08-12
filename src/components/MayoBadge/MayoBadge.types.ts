import type { PropsWithChildren } from "react";

export type MayoBadgeColor = "gray" | "blue" | "red" | "green" | "purple";
export type MayoBadgeVariant = "solid" | "soft";
export type MayoBadgeSize = "sm" | "md" | "lg";

export type MayoBadgeProps = PropsWithChildren<{
    color?: MayoBadgeColor;
    variant?: MayoBadgeVariant;
    size?: MayoBadgeSize;
    icon?: string;
    iconClassName?: string;
}>;
