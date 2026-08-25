export type MayoPieChartItem = {
    label: string;
    value: number;
    color?: string;
};

export type MayoPieChartProps = {
    data: MayoPieChartItem[];
    size?: number;
    title?: string;
    showLegend?: boolean;
    donut?: boolean;
};
