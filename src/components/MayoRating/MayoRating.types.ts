export type MayoRatingSize = "sm" | "md" | "lg";

export type MayoRatingProps = {
    value?: number;
    onChange?: (value: number) => void;
    max?: number;
    size?: MayoRatingSize;
    readonly?: boolean;
    allowHalf?: boolean;
    color?: string;
};
