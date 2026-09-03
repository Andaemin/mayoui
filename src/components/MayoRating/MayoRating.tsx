import { useState } from "react";
import "./MayoRating.css";
import type { MayoRatingProps } from "./MayoRating.types";

function Star({ filled, half, size, color }: { filled: boolean; half: boolean; size: number; color: string }) {
    const id = `half-${Math.random().toString(36).slice(2)}`;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24">
            {half && (
                <defs>
                    <linearGradient id={id}>
                        <stop offset="50%" stopColor={color} />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            )}
            <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={half ? `url(#${id})` : filled ? color : "transparent"}
                stroke={filled || half ? color : "currentColor"}
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="mayo-rating__star-shape"
            />
        </svg>
    );
}

export function MayoRating({
    value = 0,
    onChange,
    max = 5,
    size = "md",
    readonly = false,
    allowHalf = false,
    color = "#fbbf24",
}: MayoRatingProps) {
    const [hover, setHover] = useState<number | null>(null);

    const sizeMap = { sm: 16, md: 22, lg: 30 };
    const starSize = sizeMap[size];

    const current = hover ?? value;

    const getStarState = (i: number) => {
        const full = i + 1;
        const half = i + 0.5;
        if (current >= full) return { filled: true, half: false };
        if (allowHalf && current >= half) return { filled: false, half: true };
        return { filled: false, half: false };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        if (readonly) return;
        if (allowHalf) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHover(x < rect.width / 2 ? i + 0.5 : i + 1);
        } else {
            setHover(i + 1);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        if (readonly) return;
        let next: number;
        if (allowHalf) {
            const rect = e.currentTarget.getBoundingClientRect();
            next = e.clientX - rect.left < rect.width / 2 ? i + 0.5 : i + 1;
        } else {
            next = i + 1;
        }
        onChange?.(next === value ? 0 : next);
    };

    return (
        <div
            className={`mayo-rating mayo-rating--${size}${readonly ? " mayo-rating--readonly" : ""}`}
            onMouseLeave={() => setHover(null)}
        >
            {Array.from({ length: max }, (_, i) => {
                const { filled, half } = getStarState(i);
                return (
                    <button
                        key={i}
                        type="button"
                        className="mayo-rating__star"
                        onMouseMove={(e) => handleMouseMove(e, i)}
                        onClick={(e) => handleClick(e, i)}
                        disabled={readonly}
                        aria-label={`${i + 1}점`}
                    >
                        <Star filled={filled} half={half} size={starSize} color={color} />
                    </button>
                );
            })}
        </div>
    );
}
