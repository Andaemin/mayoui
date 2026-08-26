export type MayoTagColor = "blue" | "red" | "green" | "purple" | "gray" | "orange";
export type MayoTagVariant = "solid" | "soft" | "outline";
export type MayoTagSize = "sm" | "md" | "lg";

export type MayoTagProps = {
    children: React.ReactNode;
    color?: MayoTagColor;
    variant?: MayoTagVariant;
    size?: MayoTagSize;
    icon?: React.ReactNode;
    iconClassName?: string;
    onClose?: () => void;
};
