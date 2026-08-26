export type MayoAccordionItem = {
    value: string;
    label: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
};

export type MayoAccordionProps = {
    items: MayoAccordionItem[];
    multiple?: boolean;
    defaultValue?: string | string[];
    bordered?: boolean;
};
