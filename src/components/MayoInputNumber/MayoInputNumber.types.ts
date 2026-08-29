export type MayoInputNumberSize = "sm" | "md" | "lg";

export type MayoInputNumberProps = {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    size?: MayoInputNumberSize;
    disabled?: boolean;
    label?: string;
    hint?: string;
    error?: string;
    placeholder?: string;
};
