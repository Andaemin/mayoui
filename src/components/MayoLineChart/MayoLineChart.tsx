import { useState } from "react";
import "../MayoChart/mayo-chart.css";
import "./MayoLineChart.css";
import { ChartTooltip } from "../MayoChart/ChartTooltip";
import { ChartLegend } from "../MayoChart/ChartLegend";
import { resolveColor, niceMax } from "../MayoChart/chartUtils";
import { useChartSize } from "../MayoChart/useChartSize";
import type { MayoLineChartProps } from "./MayoLineChart.types";

const P = { top: 20, right: 20, bottom: 40, left: 55 };
const TICKS = 5;

export function MayoLineChart({ data, series, height = 300, title, showGrid = true, showLegend = true, showDots = true }: MayoLineChartProps) {
    const { ref, width } = useChartSize();
    const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const chartW = Math.max(0, width - P.left - P.right);
    const chartH = Math.max(0, height - P.top - P.bottom);

    const allValues = data.flatMap((d) => series.map((s) => Number(d[s.key] ?? 0)));
    const maxVal = niceMax(Math.max(...allValues, 0));

    const xStep = data.length > 1 ? chartW / (data.length - 1) : 0;
    const getX = (i: number) => P.left + (data.length === 1 ? chartW / 2 : i * xStep);
    const getY = (val: number) => P.top + chartH - (maxVal > 0 ? (val / maxVal) * chartH : 0);

    const buildPath = (s: typeof series[number]) =>
        data.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(Number(d[s.key] ?? 0))}`).join(" ");

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

                    {/* x축 레이블 */}
                    {data.map((d, i) => (
                        <text key={i} x={getX(i)} y={height - P.bottom + 18} className="mayo-chart__axis-label" textAnchor="middle">
                            {String(d.label ?? i)}
                        </text>
                    ))}

                    {/* 라인 */}
                    {series.map((s, si) => (
                        <path
                            key={si}
                            className="mayo-line-chart__line"
                            d={buildPath(s)}
                            fill="none"
                            stroke={resolveColor(s.color)}
                            strokeWidth={2.5}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            style={{ animationDelay: `${si * 80}ms` }}
                        />
                    ))}

                    {/* 닷 */}
                    {showDots && series.map((s, si) =>
                        data.map((d, i) => (
                            <circle
                                key={`${si}-${i}`}
                                className="mayo-line-chart__dot"
                                cx={getX(i)}
                                cy={getY(Number(d[s.key] ?? 0))}
                                r={hoveredIdx === i ? 6 : 4}
                                fill={resolveColor(s.color)}
                                stroke="#fff"
                                strokeWidth={2}
                                style={{
                                    transition: "r 0.15s ease",
                                    animationDelay: `${si * 80 + i * 30}ms`,
                                }}
                            />
                        ))
                    )}

                    {/* crosshair */}
                    {hoveredIdx !== null && (
                        <line
                            x1={getX(hoveredIdx)} x2={getX(hoveredIdx)}
                            y1={P.top} y2={P.top + chartH}
                            className="mayo-line-chart__crosshair"
                        />
                    )}

                    {/* hover zone */}
                    {data.map((_d, i) => {
                        const zoneW = data.length > 1 ? xStep : chartW;
                        return (
                            <rect
                                key={i}
                                x={getX(i) - zoneW / 2}
                                y={P.top}
                                width={zoneW}
                                height={chartH}
                                fill="transparent"
                                onMouseEnter={() => setHoveredIdx(i)}
                            />
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
