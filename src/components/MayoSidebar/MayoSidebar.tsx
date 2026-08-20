import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { MayoDropdown } from "../MayoDropdown";
import "./MayoSidebar.css";
import type { MayoSidebarProps } from "./MayoSidebar.types";

export function MayoSidebar({ items, activePath = window.location.pathname }: MayoSidebarProps) {
    const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
        const initial: Record<number, boolean> = {};
        items.forEach((item, i) => {
            if (item.children?.some((c) => activePath.startsWith(c.href))) {
                initial[i] = true;
            }
        });
        return initial;
    });

    return (
        <nav className="mayo-sidebar">
            <ul className="mayo-sidebar__list">
                {items.map((item, i) => {
                    const isActive = item.href
                        ? activePath === item.href
                        : item.children?.some((c) => activePath.startsWith(c.href)) ?? false;

                    const hasChildren = item.children && item.children.length > 0;
                    const isOpen = openMap[i] ?? false;

                    if (hasChildren) {
                        return (
                            <li key={i} className={`mayo-sidebar__item ${isActive ? "mayo-sidebar__item--active" : ""}`}>
                                <MayoDropdown
                                    defaultOpen={isActive}
                                    align="right"
                                    onOpenChange={(open) => setOpenMap((prev) => ({ ...prev, [i]: open }))}
                                    trigger={
                                        <div className="mayo-sidebar__trigger">
                                            {item.icon && <span className={["mayo-sidebar__icon", item.iconClassName].filter(Boolean).join(" ")}>{item.icon}</span>}
                                            <span>{item.label}</span>
                                            {isOpen ? <MdExpandLess className="mayo-sidebar__arrow" /> : <MdExpandMore className="mayo-sidebar__arrow" />}
                                        </div>
                                    }
                                    items={item.children!.map((child) => ({
                                        label: child.label,
                                        onClick: () => { window.location.href = child.href; },
                                    }))}
                                />
                            </li>
                        );
                    }

                    return (
                        <li key={i} className={`mayo-sidebar__item ${isActive ? "mayo-sidebar__item--active" : ""}`}>
                            <a className="mayo-sidebar__link" href={item.href}>
                                {item.icon && <span className={["mayo-sidebar__icon", item.iconClassName].filter(Boolean).join(" ")}>{item.icon}</span>}
                                <span>{item.label}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
