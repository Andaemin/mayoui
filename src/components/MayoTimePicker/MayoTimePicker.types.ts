export type MayoTimePickerProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    minuteStep?: number;
    minTime?: string;
    maxTime?: string;
};
