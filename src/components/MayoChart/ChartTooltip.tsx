import "./ChartTooltip.css";

type ChartTooltipProps = {
    x: number;
    y: number;
    title?: string;
    data: { label: string; value: number; color: string }[];
    containerWidth: number;
};

export function ChartTooltip({ x, y, title, data, containerWidth }: ChartTooltipProps) {
    const tooltipW = 140;
    const left = x + tooltipW > containerWidth ? x - tooltipW - 12 : x + 12;

    return (
        <div className="mayo-chart-tooltip" style={{ left, top: y - 10 }}>
            {title && <div className="mayo-chart-tooltip__title">{title}</div>}
            {data.map((d, i) => (
                <div key={i} className="mayo-chart-tooltip__item">
                    <span className="mayo-chart-tooltip__dot" style={{ background: d.color }} />
                    <span className="mayo-chart-tooltip__label">{d.label}</span>
                    <span className="mayo-chart-tooltip__value">{d.value.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
}
