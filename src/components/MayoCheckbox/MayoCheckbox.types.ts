export type MayoCheckboxSize = "sm" | "md" | "lg";
export type MayoCheckboxColor = "blue" | "red" | "green" | "purple" | "gray";

export type MayoCheckboxProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    size?: MayoCheckboxSize;
    color?: MayoCheckboxColor;
};
