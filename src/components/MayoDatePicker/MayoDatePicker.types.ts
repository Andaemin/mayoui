export type MayoDatePickerMode = "date" | "month" | "year";

export type MayoDatePickerProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
    mode?: MayoDatePickerMode;
};
