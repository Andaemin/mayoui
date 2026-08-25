export const CHART_COLORS: Record<string, string> = {
    blue: "#3abff8",
    red: "#f87272",
    green: "#36d399",
    purple: "#a855f7",
    gray: "#6b7280",
    orange: "#fb923c",
    yellow: "#fbbf24",
    pink: "#f472b6",
    teal: "#2dd4bf",
    indigo: "#818cf8",
};

export function resolveColor(color?: string): string {
    if (!color) return CHART_COLORS.blue;
    return CHART_COLORS[color] ?? color;
}

export function niceMax(max: number): number {
    if (max <= 0) return 10;
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    const normalized = max / magnitude;
    if (normalized <= 1) return magnitude;
    if (normalized <= 2) return 2 * magnitude;
    if (normalized <= 5) return 5 * magnitude;
    return 10 * magnitude;
}

export type MayoChartSeries = {
    key: string;
    color?: string;
    label?: string;
};

export type MayoChartDataItem = Record<string, string | number>;
