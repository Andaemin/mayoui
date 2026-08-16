import type { SelectHTMLAttributes } from "react";

export type MayoSelectSize = "sm" | "md" | "lg";
export type MayoSelectLabelAlign = "left" | "center" | "right";

export type MayoSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type MayoSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    options: MayoSelectOption[];
    label?: string;
    labelAlign?: MayoSelectLabelAlign;
    error?: string;
    hint?: string;
    placeholder?: string;
    size?: MayoSelectSize;
};
