import type { ReactNode } from "react";

export type MayoTabsVariant = "line" | "pill";
export type MayoTabsColor = "blue" | "red" | "green" | "purple" | "gray";

export type MayoTabItem = {
    value: string;
    label: string;
    disabled?: boolean;
    children?: ReactNode;
};

export type MayoTabsProps = {
    tabs: MayoTabItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    variant?: MayoTabsVariant;
    color?: MayoTabsColor;
};
