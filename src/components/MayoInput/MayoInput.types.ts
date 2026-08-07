import type { InputHTMLAttributes } from "react";

export type MayoInputSize = "sm" | "md" | "lg";
export type MayoInputLabelAlign = "left" | "center" | "right";

export type MayoInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: string;
    labelAlign?: MayoInputLabelAlign;
    error?: string;
    hint?: string;
    size?: MayoInputSize;
};
