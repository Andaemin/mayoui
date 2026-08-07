import type { InputHTMLAttributes } from "react";

export type MayoInputSize = "sm" | "md" | "lg";

export type MayoInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: string;
    error?: string;
    hint?: string;
    size?: MayoInputSize;
};
