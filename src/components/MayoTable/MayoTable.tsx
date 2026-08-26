import { useState } from "react";
import "./MayoTable.css";
import type { MayoTableProps, MayoTableSortDirection } from "./MayoTable.types";
import { MayoLoadingSpinner } from "../MayoLoadingSpinner";

export function MayoTable<T extends object>({
    columns,
    data,
    rowKey,
    striped = false,
    bordered = false,
    loading = false,
    selectable = false,
    onSelectionChange,
    emptyText = "데이터가 없습니다.",
}: MayoTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<MayoTableSortDirection>(null);
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const handleSort = (key: string) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDir("asc");
        } else if (sortDir === "asc") {
            setSortDir("desc");
        } else if (sortDir === "desc") {
            setSortKey(null);
            setSortDir(null);
        }
    };

    const sorted = [...data].sort((a, b) => {
        if (!sortKey || !sortDir) return 0;
        const av = a[sortKey as keyof T];
        const bv = b[sortKey as keyof T];
        if (av === bv) return 0;
        const gt = av > bv ? 1 : -1;
        return sortDir === "asc" ? gt : -gt;
    });

    const allKeys = sorted.map((row) => row[rowKey] as string | number);
    const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));
    const indeterminate = !allSelected && allKeys.some((k) => selected.has(k));

    const toggleAll = () => {
        const next = allSelected
            ? new Set<string | number>()
            : new Set<string | number>(allKeys);
        setSelected(next);
        onSelectionChange?.([...next]);
    };

    const toggleRow = (key: string | number) => {
        const next = new Set(selected);
        next.has(key) ? next.delete(key) : next.add(key);
        setSelected(next);
        onSelectionChange?.([...next]);
    };

    const cls = [
        "mayo-table-wrapper",
        bordered ? "mayo-table-wrapper--bordered" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={cls}>
            {loading && (
                <div className="mayo-table__loading">
                    <MayoLoadingSpinner size="md" />
                </div>
            )}
            <table className={`mayo-table${striped ? " mayo-table--striped" : ""}`}>
                <thead className="mayo-table__head">
                    <tr>
                        {selectable && (
                            <th className="mayo-table__th mayo-table__th--check">
                                <input
                                    type="checkbox"
                                    className="mayo-table__checkbox"
                                    checked={allSelected}
                                    ref={(el) => { if (el) el.indeterminate = indeterminate; }}
                                    onChange={toggleAll}
                                />
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`mayo-table__th${col.sortable ? " mayo-table__th--sortable" : ""}`}
                                style={{ width: col.width }}
                                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                            >
                                <span className="mayo-table__th-inner">
                                    {col.label}
                                    {col.sortable && (
                                        <span className="mayo-table__sort-icon">
                                            {sortKey === col.key && sortDir === "asc" && "↑"}
                                            {sortKey === col.key && sortDir === "desc" && "↓"}
                                            {(sortKey !== col.key || !sortDir) && "↕"}
                                        </span>
                                    )}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="mayo-table__body">
                    {sorted.length === 0 ? (
                        <tr>
                            <td
                                className="mayo-table__empty"
                                colSpan={selectable ? columns.length + 1 : columns.length}
                            >
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        sorted.map((row, i) => {
                            const key = row[rowKey] as string | number;
                            const isSelected = selected.has(key);
                            return (
                                <tr
                                    key={key}
                                    className={`mayo-table__row${isSelected ? " mayo-table__row--selected" : ""}${i % 2 === 1 && striped ? " mayo-table__row--stripe" : ""}`}
                                >
                                    {selectable && (
                                        <td className="mayo-table__td mayo-table__td--check">
                                            <input
                                                type="checkbox"
                                                className="mayo-table__checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleRow(key)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className="mayo-table__td">
                                            {col.render
                                                ? col.render(row[col.key as keyof T], row)
                                                : String(row[col.key as keyof T] ?? "")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
