import type { MayoChartDataItem, MayoChartSeries } from "../MayoChart/chartUtils";

export type { MayoChartSeries, MayoChartDataItem };

export type MayoLineChartProps = {
    data: MayoChartDataItem[];
    series: MayoChartSeries[];
    height?: number;
    title?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showDots?: boolean;
};
