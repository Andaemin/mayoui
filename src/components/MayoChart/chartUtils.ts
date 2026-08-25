export const CHART_COLORS: Record<string, string> = {
    blue: "#5b8dee",
    red: "#e05c6a",
    green: "#3dab7a",
    purple: "#8b6cd8",
    gray: "#7c8b9e",
    orange: "#d97b4a",
    yellow: "#c9a227",
    pink: "#c2608e",
    teal: "#3a9fa8",
    indigo: "#6670c4",
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
