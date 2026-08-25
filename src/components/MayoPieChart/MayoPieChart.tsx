import { useState } from "react";
import "./MayoPieChart.css";
import "../MayoChart/mayo-chart.css";
import { ChartTooltip } from "../MayoChart/ChartTooltip";
import { ChartLegend } from "../MayoChart/ChartLegend";
import { CHART_COLORS } from "../MayoChart/chartUtils";
import type { MayoPieChartProps } from "./MayoPieChart.types";

const DEFAULT_COLORS = Object.values(CHART_COLORS);

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function slicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end   = polarToCartesian(cx, cy, r, startAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} Z`;
}

function donutPath(cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number): string {
    const os = polarToCartesian(cx, cy, outerR, endAngle);
    const oe = polarToCartesian(cx, cy, outerR, startAngle);
    const is = polarToCartesian(cx, cy, innerR, startAngle);
    const ie = polarToCartesian(cx, cy, innerR, endAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return [
        `M ${os.x} ${os.y}`,
        `A ${outerR} ${outerR} 0 ${large} 0 ${oe.x} ${oe.y}`,
        `L ${is.x} ${is.y}`,
        `A ${innerR} ${innerR} 0 ${large} 1 ${ie.x} ${ie.y}`,
        "Z",
    ].join(" ");
}

export function MayoPieChart({ data, size = 240, title, showLegend = true, donut = false }: MayoPieChartProps) {
    const [tooltip, setTooltip] = useState<{ x: number; y: number; idx: number } | null>(null);

    const total = data.reduce((s, d) => s + d.value, 0);
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size / 2 - 8;
    const innerR = donut ? outerR * 0.55 : 0;

    let cumAngle = 0;
    const slices = data.map((d, i) => {
        const angle = (d.value / total) * 360;
        const start = cumAngle;
        const end = cumAngle + angle;
        cumAngle = end;
        return {
            ...d,
            color: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
            start,
            end,
            angle,
        };
    });

    const series = slices.map((s) => ({ key: s.label, color: s.color, label: s.label }));

    return (
        <div className="mayo-pie-chart" style={{ position: "relative" }}>
            {title && <p className="mayo-pie-chart__title">{title}</p>}
            <svg
                width={size}
                height={size}
                onMouseLeave={() => setTooltip(null)}
            >
                <g className="mayo-pie-chart__animation">
                    {slices.map((s, i) => {
                        const path = donut
                            ? donutPath(cx, cy, outerR, innerR, s.start, s.end)
                            : slicePath(cx, cy, outerR, s.start, s.end);
                        return (
                            <path
                                key={i}
                                className="mayo-pie-chart__slice"
                                d={path}
                                fill={s.color}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.closest("svg")!.getBoundingClientRect();
                                    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, idx: i });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                style={{ animationDelay: `${i * 60}ms` }}
                            />
                        );
                    })}
                    {donut && (
                        <circle cx={cx} cy={cy} r={innerR} fill="var(--mayo-bg)" />
                    )}
                    {donut && total > 0 && (
                        <>
                            <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={700} fill="var(--mayo-text)">
                                {total.toLocaleString()}
                            </text>
                            <text x={cx} y={cy + 14} textAnchor="middle" fontSize={12} fill="var(--mayo-text-muted)">
                                합계
                            </text>
                        </>
                    )}
                </g>
            </svg>

            {tooltip && (
                <ChartTooltip
                    x={tooltip.x}
                    y={tooltip.y}
                    containerWidth={size}
                    title={slices[tooltip.idx].label}
                    data={[{
                        label: `${((slices[tooltip.idx].angle / 360) * 100).toFixed(1)}%`,
                        value: slices[tooltip.idx].value,
                        color: slices[tooltip.idx].color,
                    }]}
                />
            )}

            {showLegend && <ChartLegend series={series} />}
        </div>
    );
}
