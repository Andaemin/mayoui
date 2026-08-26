export type MayoPaginationSize = "sm" | "md" | "lg";

export type MayoPaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
    siblings?: number;
    showFirstLast?: boolean;
    size?: MayoPaginationSize;
};
