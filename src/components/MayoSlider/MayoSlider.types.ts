export type MayoSliderColor = "blue" | "green" | "purple" | "red" | "gray";

export type MayoSliderProps = {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    color?: MayoSliderColor;
    disabled?: boolean;
    showValue?: boolean;
    label?: string;
};
