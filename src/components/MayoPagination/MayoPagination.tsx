import "./MayoPagination.css";
import type { MayoPaginationProps } from "./MayoPagination.types";

function getPageRange(page: number, totalPages: number, siblings: number): (number | "...")[] {
    const delta = siblings + 2;
    const left = page - siblings;
    const right = page + siblings;

    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i <= right)) {
            pages.push(i);
        }
    }

    const result: (number | "...")[] = [];
    let prev: number | null = null;
    for (const p of pages) {
        if (prev !== null && p - prev > 1) {
            if (p - prev === 2) {
                result.push(prev + 1);
            } else {
                result.push("...");
            }
        }
        result.push(p);
        prev = p;
    }

    void delta;
    return result;
}

export function MayoPagination({
    page,
    totalPages,
    onChange,
    siblings = 1,
    showFirstLast = true,
    size = "md",
}: MayoPaginationProps) {
    const items = getPageRange(page, totalPages, siblings);

    const go = (p: number) => {
        if (p >= 1 && p <= totalPages && p !== page) onChange(p);
    };

    return (
        <nav className={`mayo-pagination mayo-pagination--${size}`} aria-label="pagination">
            {showFirstLast && (
                <button
                    className="mayo-pagination__btn"
                    onClick={() => go(1)}
                    disabled={page === 1}
                    aria-label="첫 페이지"
                >
                    «
                </button>
            )}
            <button
                className="mayo-pagination__btn"
                onClick={() => go(page - 1)}
                disabled={page === 1}
                aria-label="이전 페이지"
            >
                ‹
            </button>

            {items.map((item, i) =>
                item === "..." ? (
                    <span key={`ellipsis-${i}`} className="mayo-pagination__ellipsis">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        className={`mayo-pagination__btn${item === page ? " mayo-pagination__btn--active" : ""}`}
                        onClick={() => go(item)}
                        aria-current={item === page ? "page" : undefined}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                className="mayo-pagination__btn"
                onClick={() => go(page + 1)}
                disabled={page === totalPages}
                aria-label="다음 페이지"
            >
                ›
            </button>
            {showFirstLast && (
                <button
                    className="mayo-pagination__btn"
                    onClick={() => go(totalPages)}
                    disabled={page === totalPages}
                    aria-label="마지막 페이지"
                >
                    »
                </button>
            )}
        </nav>
    );
}
