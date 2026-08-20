import { useEffect, useRef, useState } from "react";
import "./MayoDropdown.css";
import type { MayoDropdownProps } from "./MayoDropdown.types";

export function MayoDropdown({ trigger, items, align = "left", defaultOpen = false, onOpenChange }: MayoDropdownProps) {
    const [open, setOpen] = useState(defaultOpen);
    const ref = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        const next = !open;
        setOpen(next);
        onOpenChange?.(next);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                onOpenChange?.(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onOpenChange]);

    return (
        <div className="mayo-dropdown" ref={ref}>
            <div className="mayo-dropdown__trigger" onClick={handleToggle}>
                {trigger}
            </div>
            {open && (
                <ul className={`mayo-dropdown__menu mayo-dropdown__menu--${align}`}>
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className={`mayo-dropdown__item ${item.disabled ? "mayo-dropdown__item--disabled" : ""}`}
                            onClick={() => {
                                if (item.disabled) return;
                                item.onClick?.();
                                setOpen(false);
                            }}
                        >
                            {item.icon && <span className={["mayo-dropdown__icon", item.iconClassName].filter(Boolean).join(" ")}>{item.icon}</span>}
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
