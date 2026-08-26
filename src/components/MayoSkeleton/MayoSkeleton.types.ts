export type MayoSkeletonVariant = "text" | "circle" | "rect";

export type MayoSkeletonProps = {
    variant?: MayoSkeletonVariant;
    width?: number | string;
    height?: number | string;
    rounded?: boolean;
    lines?: number;
};
