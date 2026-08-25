import "./ChartLegend.css";
import type { MayoChartSeries } from "./chartUtils";
import { resolveColor } from "./chartUtils";

type ChartLegendProps = {
    series: MayoChartSeries[];
};

export function ChartLegend({ series }: ChartLegendProps) {
    return (
        <div className="mayo-chart-legend">
            {series.map((s, i) => (
                <div key={i} className="mayo-chart-legend__item">
                    <span className="mayo-chart-legend__dot" style={{ background: resolveColor(s.color) }} />
                    <span className="mayo-chart-legend__label">{s.label ?? s.key}</span>
                </div>
            ))}
        </div>
    );
}
