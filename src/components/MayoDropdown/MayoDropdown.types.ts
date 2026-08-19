import type { ReactNode } from "react";

export type MayoDropdownItem = {
    label: string;
    icon?: string;
    disabled?: boolean;
    onClick?: () => void;
};

export type MayoDropdownProps = {
    trigger: ReactNode;
    items: MayoDropdownItem[];
    align?: "left" | "right";
};
