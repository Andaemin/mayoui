import type { TextareaHTMLAttributes } from "react";

export type MayoTextareaSize = "sm" | "md" | "lg";
export type MayoTextareaLabelAlign = "left" | "center" | "right";
export type MayoTextareaHintPosition = "top" | "bottom";

export type MayoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    labelAlign?: MayoTextareaLabelAlign;
    error?: string;
    hint?: string;
    hintPosition?: MayoTextareaHintPosition;
    size?: MayoTextareaSize;
};
