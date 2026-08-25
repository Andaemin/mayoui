import type { MayoChartDataItem, MayoChartSeries } from "../MayoChart/chartUtils";

export type { MayoChartSeries, MayoChartDataItem };

export type MayoBarChartProps = {
    data: MayoChartDataItem[];
    series: MayoChartSeries[];
    height?: number;
    title?: string;
    showGrid?: boolean;
    showLegend?: boolean;
};
