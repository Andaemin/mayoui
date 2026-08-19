export type MayoDividerOrientation = "horizontal" | "vertical";
export type MayoDividerVariant = "solid" | "dashed" | "dotted";

export type MayoDividerProps = {
    orientation?: MayoDividerOrientation;
    variant?: MayoDividerVariant;
    label?: string;
    color?: string;
    thickness?: number;
};
