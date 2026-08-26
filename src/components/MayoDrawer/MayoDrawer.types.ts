export type MayoDrawerPosition = "left" | "right" | "top" | "bottom";

export type MayoDrawerProps = {
    open: boolean;
    onClose: () => void;
    position?: MayoDrawerPosition;
    size?: number | string;
    title?: React.ReactNode;
    children?: React.ReactNode;
    closeOnBackdrop?: boolean;
};
