import { useState } from "react";
import "./MayoTabs.css";
import type { MayoTabsProps } from "./MayoTabs.types";

export function MayoTabs({ tabs, value, defaultValue, onChange, variant = "line", color = "blue" }: MayoTabsProps) {
    const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.value ?? "");
    const active = value ?? internal;

    const handleClick = (v: string) => {
        if (value === undefined) setInternal(v);
        onChange?.(v);
    };

    const activeTab = tabs.find((t) => t.value === active);

    return (
        <div className={`mayo-tabs mayo-tabs--${variant}`}>
            <div className="mayo-tabs__list" role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        role="tab"
                        className={`mayo-tabs__tab mayo-tabs--${color} ${active === tab.value ? "mayo-tabs__tab--active" : ""}`}
                        disabled={tab.disabled}
                        onClick={() => !tab.disabled && handleClick(tab.value)}
                        aria-selected={active === tab.value}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab?.children && (
                <div className="mayo-tabs__content" role="tabpanel">
                    {activeTab.children}
                </div>
            )}
        </div>
    );
}
