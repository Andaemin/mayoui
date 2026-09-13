import { useState } from "react";
import "./MayoHistogram.css";
import "../MayoChart/mayo-chart.css";
import { useChartSize } from "../MayoChart/useChartSize";
import { ChartTooltip } from "../MayoChart/ChartTooltip";
import { CHART_COLORS } from "../MayoChart/chartUtils";
import type { MayoHistogramProps } from "./MayoHistogram.types";

function buildBins(data: number[], binCount: number) {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = range / binCount;

    const bins = Array.from({ length: binCount }, (_, i) => ({
        start: min + i * step,
        end: min + (i + 1) * step,
        count: 0,
    }));

    for (const val of data) {
        const idx = Math.min(Math.floor((val - min) / step), binCount - 1);
        bins[idx].count++;
    }

    return bins;
}

export function MayoHistogram({
    data,
    bins: binCount = 10,
    height = 260,
    color = CHART_COLORS.blue,
    title,
    showValues = false,
    xLabel,
    yLabel,
}: MayoHistogramProps) {
    const { ref, width } = useChartSize();
    const [tooltip, setTooltip] = useState<{ x: number; y: number; binIdx: number } | null>(null);

    const bins = buildBins(data, binCount);
    const maxCount = Math.max(...bins.map(b => b.count), 1);

    const paddingL = yLabel ? 52 : 40;
    const paddingR = 16;
    const paddingT = 16;
    const paddingB = xLabel ? 44 : 32;

    const chartW = width - paddingL - paddingR;
    const chartH = height - paddingT - paddingB;
    const barW = chartW / binCount;

    const yTicks = 5;

    return (
        <div className="mayo-histogram">
            {title && <p className="mayo-chart-title">{title}</p>}
            <div ref={ref} style={{ position: "relative" }}>
                {width > 0 && (
                    <svg width={width} height={height} onMouseLeave={() => setTooltip(null)}>
                        {/* y gridlines */}
                        {Array.from({ length: yTicks + 1 }, (_, i) => {
                            const val = Math.round((maxCount / yTicks) * (yTicks - i));
                            const y = paddingT + (chartH / yTicks) * i;
                            return (
                                <g key={i}>
                                    <line x1={paddingL} x2={paddingL + chartW} y1={y} y2={y} stroke="var(--mayo-border)" strokeWidth={1} strokeDasharray="4 3" />
                                    <text x={paddingL - 6} y={y + 4} textAnchor="end" fontSize={11} fill="var(--mayo-text-muted)">{val}</text>
                                </g>
                            );
                        })}

                        {/* bars */}
                        {bins.map((bin, i) => {
                            const barH = (bin.count / maxCount) * chartH;
                            const x = paddingL + i * barW;
                            const y = paddingT + chartH - barH;
                            const isHovered = tooltip?.binIdx === i;
                            return (
                                <g key={i}>
                                    <rect
                                        x={x + 1}
                                        y={y}
                                        width={barW - 2}
                                        height={barH}
                                        fill={color}
                                        opacity={isHovered ? 1 : 0.82}
                                        rx={2}
                                        className="mayo-histogram__bar"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.closest("svg")!.getBoundingClientRect();
                                            setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, binIdx: i });
                                        }}
                                    />
                                    {showValues && bin.count > 0 && (
                                        <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={10} fill="var(--mayo-text-muted)">{bin.count}</text>
                                    )}
                                </g>
                            );
                        })}

                        {/* x axis labels */}
                        {bins.map((bin, i) => (
                            i % Math.ceil(binCount / 8) === 0 && (
                                <text
                                    key={i}
                                    x={paddingL + i * barW}
                                    y={paddingT + chartH + 16}
                                    fontSize={10}
                                    fill="var(--mayo-text-muted)"
                                >
                                    {bin.start % 1 === 0 ? bin.start : bin.start.toFixed(1)}
                                </text>
                            )
                        ))}

                        {/* x axis labels — last */}
                        <text x={paddingL + chartW} y={paddingT + chartH + 16} fontSize={10} fill="var(--mayo-text-muted)" textAnchor="end">
                            {bins.at(-1) ? (bins.at(-1)!.end % 1 === 0 ? bins.at(-1)!.end : bins.at(-1)!.end.toFixed(1)) : ""}
                        </text>

                        {/* axis line */}
                        <line x1={paddingL} x2={paddingL + chartW} y1={paddingT + chartH} y2={paddingT + chartH} stroke="var(--mayo-border-strong)" strokeWidth={1} />
                        <line x1={paddingL} x2={paddingL} y1={paddingT} y2={paddingT + chartH} stroke="var(--mayo-border-strong)" strokeWidth={1} />

                        {/* labels */}
                        {xLabel && (
                            <text x={paddingL + chartW / 2} y={height - 4} textAnchor="middle" fontSize={11} fill="var(--mayo-text-muted)">{xLabel}</text>
                        )}
                        {yLabel && (
                            <text x={12} y={paddingT + chartH / 2} textAnchor="middle" fontSize={11} fill="var(--mayo-text-muted)" transform={`rotate(-90, 12, ${paddingT + chartH / 2})`}>{yLabel}</text>
                        )}
                    </svg>
                )}

                {tooltip && bins[tooltip.binIdx] && (
                    <ChartTooltip
                        x={tooltip.x}
                        y={tooltip.y}
                        containerWidth={width}
                        title={`${bins[tooltip.binIdx].start.toFixed(1)} ~ ${bins[tooltip.binIdx].end.toFixed(1)}`}
                        data={[{ label: "빈도", value: bins[tooltip.binIdx].count, color }]}
                    />
                )}
            </div>
        </div>
    );
}
