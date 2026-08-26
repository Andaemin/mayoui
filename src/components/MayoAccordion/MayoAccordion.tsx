import { useState } from "react";
import "./MayoAccordion.css";
import type { MayoAccordionProps } from "./MayoAccordion.types";

export function MayoAccordion({
    items,
    multiple = false,
    defaultValue,
    bordered = true,
}: MayoAccordionProps) {
    const initOpen = (): Set<string> => {
        if (!defaultValue) return new Set();
        return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    };

    const [open, setOpen] = useState<Set<string>>(initOpen);

    const toggle = (value: string) => {
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(value)) {
                next.delete(value);
            } else {
                if (!multiple) next.clear();
                next.add(value);
            }
            return next;
        });
    };

    return (
        <div className={`mayo-accordion${bordered ? " mayo-accordion--bordered" : ""}`}>
            {items.map((item, i) => {
                const isOpen = open.has(item.value);
                const isLast = i === items.length - 1;
                return (
                    <div
                        key={item.value}
                        className={`mayo-accordion__item${isLast ? " mayo-accordion__item--last" : ""}${item.disabled ? " mayo-accordion__item--disabled" : ""}`}
                    >
                        <button
                            className={`mayo-accordion__trigger${isOpen ? " mayo-accordion__trigger--open" : ""}`}
                            onClick={() => !item.disabled && toggle(item.value)}
                            aria-expanded={isOpen}
                            disabled={item.disabled}
                        >
                            <span className="mayo-accordion__label">{item.label}</span>
                            <span className={`mayo-accordion__icon${isOpen ? " mayo-accordion__icon--open" : ""}`}>
                                ›
                            </span>
                        </button>
                        <div
                            className={`mayo-accordion__panel${isOpen ? " mayo-accordion__panel--open" : ""}`}
                        >
                            <div className="mayo-accordion__content">{item.children}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
