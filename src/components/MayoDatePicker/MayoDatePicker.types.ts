export type MayoDatePickerProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
    format?: string;
};
