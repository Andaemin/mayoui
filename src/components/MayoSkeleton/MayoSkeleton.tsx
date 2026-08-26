import "./MayoSkeleton.css";
import type { MayoSkeletonProps } from "./MayoSkeleton.types";

export function MayoSkeleton({
    variant = "text",
    width,
    height,
    rounded = false,
    lines = 1,
}: MayoSkeletonProps) {
    if (variant === "text" && lines > 1) {
        return (
            <div className="mayo-skeleton-lines">
                {Array.from({ length: lines }).map((_, i) => (
                    <span
                        key={i}
                        className="mayo-skeleton mayo-skeleton--text"
                        style={{
                            width: i === lines - 1 ? "65%" : (width ?? "100%"),
                            height: height ?? undefined,
                        }}
                    />
                ))}
            </div>
        );
    }

    const cls = [
        "mayo-skeleton",
        `mayo-skeleton--${variant}`,
        rounded ? "mayo-skeleton--rounded" : "",
    ].filter(Boolean).join(" ");

    return (
        <span
            className={cls}
            style={{
                width: width ?? undefined,
                height: height ?? undefined,
            }}
        />
    );
}
