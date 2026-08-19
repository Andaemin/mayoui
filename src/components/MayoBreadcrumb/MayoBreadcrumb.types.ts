import type { ReactNode } from "react";

export type MayoBreadcrumbItem = {
    label: string;
    href?: string;
};

export type MayoBreadcrumbProps = {
    items: MayoBreadcrumbItem[];
    separator?: ReactNode;
};
