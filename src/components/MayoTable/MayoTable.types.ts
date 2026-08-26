export type MayoTableSortDirection = "asc" | "desc" | null;

export type MayoTableColumn<T extends object> = {
    key: keyof T & string;
    label: string;
    width?: number | string;
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type MayoTableProps<T extends object> = {
    columns: MayoTableColumn<T>[];
    data: T[];
    rowKey: keyof T & string;
    striped?: boolean;
    bordered?: boolean;
    loading?: boolean;
    selectable?: boolean;
    onSelectionChange?: (selectedKeys: (string | number)[]) => void;
    emptyText?: string;
};
