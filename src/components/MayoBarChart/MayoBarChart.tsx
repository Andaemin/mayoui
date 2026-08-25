import { useState } from "react";
import "../MayoChart/mayo-chart.css";
import "./MayoBarChart.css";
import { ChartTooltip } from "../MayoChart/ChartTooltip";
import { ChartLegend } from "../MayoChart/ChartLegend";
import { resolveColor, niceMax } from "../MayoChart/chartUtils";
import { useChartSize } from "../MayoChart/useChartSize";
import type { MayoBarChartProps } from "./MayoBarChart.types";

const P = { top: 20, right: 20, bottom: 40, left: 55 };
const TICKS = 5;

export function MayoBarChart({ data, series, height = 300, title, showGrid = true, showLegend = true }: MayoBarChartProps) {
    const { ref, width } = useChartSize();
    const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const chartW = Math.max(0, width - P.left - P.right);
    const chartH = Math.max(0, height - P.top - P.bottom);

    const allValues = data.flatMap((d) => series.map((s) => Number(d[s.key] ?? 0)));
    const maxVal = niceMax(Math.max(...allValues, 0));

    const groupW = data.length > 0 ? chartW / data.length : 0;
    const barGap = 2;
    const groupPad = groupW * 0.1;
    const totalBarW = groupW * 0.8;
    const barW = series.length > 0 ? (totalBarW - barGap * (series.length - 1)) / series.length : 0;

    return (
        <div
            className="mayo-chart"
            ref={ref}
            style={{ position: "relative" }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseLeave={() => { setMouse(null); setHoveredIdx(null); }}
        >
            {title && <p className="mayo-chart__title">{title}</p>}
            {width > 0 && (
                <svg width={width} height={height}>
                    {/* y축 + grid */}
                    {Array.from({ length: TICKS + 1 }).map((_, i) => {
                        const val = maxVal * (1 - i / TICKS);
                        const y = P.top + (chartH / TICKS) * i;
                        return (
                            <g key={i}>
                                {showGrid && (
                                    <line x1={P.left} x2={width - P.right} y1={y} y2={y} className="mayo-chart__grid" />
                                )}
                                <text x={P.left - 8} y={y + 4} className="mayo-chart__axis-label" textAnchor="end">
                                    {val.toLocaleString()}
                                </text>
                            </g>
                        );
                    })}

                    {/* 바 */}
                    {data.map((d, gi) => {
                        const gx = P.left + gi * groupW;
                        return (
                            <g key={gi} onMouseEnter={() => setHoveredIdx(gi)}>
                                {series.map((s, si) => {
                                    const val = Number(d[s.key] ?? 0);
                                    const barH = maxVal > 0 ? (val / maxVal) * chartH : 0;
                                    const x = gx + groupPad + si * (barW + barGap);
                                    const y = P.top + chartH - barH;
                                    return (
                                        <rect
                                            key={si}
                                            className="mayo-bar-chart__bar"
                                            x={x} y={y}
                                            width={Math.max(0, barW)} height={Math.max(0, barH)}
                                            fill={resolveColor(s.color)}
                                            rx={3}
                                            opacity={hoveredIdx !== null && hoveredIdx !== gi ? 0.45 : 1}
                                            style={{
                                                transition: "opacity 0.15s ease",
                                                animationDelay: `${gi * 40 + si * 20}ms`,
                                            }}
                                        />
                                    );
                                })}
                                {/* hover zone */}
                                <rect x={gx} y={P.top} width={groupW} height={chartH} fill="transparent" />
                                {/* x축 레이블 */}
                                <text
                                    x={gx + groupW / 2}
                                    y={height - P.bottom + 18}
                                    className="mayo-chart__axis-label"
                                    textAnchor="middle"
                                >
                                    {String(d.label ?? gi)}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            )}

            {mouse && hoveredIdx !== null && (
                <ChartTooltip
                    x={mouse.x}
                    y={mouse.y}
                    containerWidth={width}
                    title={String(data[hoveredIdx]?.label ?? "")}
                    data={series.map((s) => ({
                        label: s.label ?? s.key,
                        value: Number(data[hoveredIdx]?.[s.key] ?? 0),
                        color: resolveColor(s.color),
                    }))}
                />
            )}

            {showLegend && <ChartLegend series={series} />}
        </div>
    );
}
