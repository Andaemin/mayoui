export type MayoSidebarChild = {
    label: string;
    href: string;
};

export type MayoSidebarItem = {
    label: string;
    icon?: string;
    href?: string;
    children?: MayoSidebarChild[];
};

export type MayoSidebarProps = {
    items: MayoSidebarItem[];
    activePath?: string;
};
