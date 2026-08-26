export type MayoStepStatus = "done" | "active" | "pending";
export type MayoStepsDirection = "horizontal" | "vertical";

export type MayoStepItem = {
    label: string;
    description?: string;
    icon?: React.ReactNode;
};

export type MayoStepsProps = {
    steps: MayoStepItem[];
    current: number;
    direction?: MayoStepsDirection;
    color?: "blue" | "green" | "purple" | "red";
};
