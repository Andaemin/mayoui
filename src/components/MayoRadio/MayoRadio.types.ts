export type MayoRadioSize = "sm" | "md" | "lg";
export type MayoRadioColor = "blue" | "red" | "green" | "purple" | "gray";

export type MayoRadioProps = {
    name: string;
    value: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (value: string) => void;
    disabled?: boolean;
    label?: string;
    size?: MayoRadioSize;
    color?: MayoRadioColor;
};
