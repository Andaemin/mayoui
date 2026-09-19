export type MayoCalendarEvent = {
    date: string;
    label: string;
    color?: string;
};

export type MayoCalendarProps = {
    value?: string;
    onChange?: (date: string) => void;
    events?: MayoCalendarEvent[];
    minDate?: string;
    maxDate?: string;
};
