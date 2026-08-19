import "./MayoBreadcrumb.css";
import type { MayoBreadcrumbProps } from "./MayoBreadcrumb.types";

export function MayoBreadcrumb({ items, separator = "/" }: MayoBreadcrumbProps) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="mayo-breadcrumb">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={i} className="mayo-breadcrumb__item">
                            {item.href && !isLast ? (
                                <a className="mayo-breadcrumb__link" href={item.href}>
                                    {item.label}
                                </a>
                            ) : (
                                <span className={`mayo-breadcrumb__label ${isLast ? "mayo-breadcrumb__label--current" : ""}`}>
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className="mayo-breadcrumb__separator">{separator}</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
