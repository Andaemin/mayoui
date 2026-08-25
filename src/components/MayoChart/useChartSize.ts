import { useEffect, useRef, useState } from "react";

export function useChartSize() {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        setWidth(el.offsetWidth);
        const ro = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return { ref, width };
}
