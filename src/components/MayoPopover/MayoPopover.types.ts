export type MayoPopoverPosition = "top" | "bottom" | "left" | "right";

export type MayoPopoverProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: MayoPopoverPosition;
    title?: string;
    closeOnContentClick?: boolean;
};
