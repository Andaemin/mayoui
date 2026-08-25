import type { ReactNode } from "react";

export type MayoTooltipPosition = "top" | "bottom" | "left" | "right";

export type MayoTooltipProps = {
    content: string;
    children: ReactNode;
    position?: MayoTooltipPosition;
};
