export type MayoToggleSize = "sm" | "md" | "lg";
export type MayoToggleColor = "blue" | "red" | "green" | "purple" | "gray";

export type MayoToggleProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    size?: MayoToggleSize;
    color?: MayoToggleColor;
};
