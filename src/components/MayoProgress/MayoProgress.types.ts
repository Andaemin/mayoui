export type MayoProgressSize = "sm" | "md" | "lg";
export type MayoProgressColor = "blue" | "red" | "green" | "purple" | "gray";

export type MayoProgressProps = {
    value: number;
    max?: number;
    size?: MayoProgressSize;
    color?: MayoProgressColor;
    label?: string;
    showValue?: boolean;
};
