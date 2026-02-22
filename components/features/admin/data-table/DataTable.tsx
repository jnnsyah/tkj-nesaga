"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  idKey?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onBulkDelete?: (ids: any[]) => void;
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  selectedIds?: any[];
  onSelectIds?: (ids: any[]) => void;
  reorderable?: boolean;
  onReorder?: (event: any) => void;
}

interface SortableRowProps<T> {
  item: T;
  id: any;
  idx: number;
  columns: Column<T>[];
  idKey: string;
  onSelectIds?: (ids: any[]) => void;
  selectedIds: any[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  reorderable?: boolean;
}

function SortableRow<T extends Record<string, any>>({
  item,
  id,
  idx,
  columns,
  idKey,
  onSelectIds,
  selectedIds,
  onEdit,
  onDelete,
  reorderable,
}: SortableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  const isSelected = (selectedIds as any[]).includes(id);

  const handleSelectRow = (id: any, checked: boolean) => {
    if (!onSelectIds) return;
    if (checked) {
      onSelectIds([...selectedIds, id]);
    } else {
      onSelectIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "group border-b border-slate-50 last:border-0 transition-colors",
        isSelected ? "bg-[#ffd900]/5" : "hover:bg-slate-50/80",
        isDragging && "shadow-xl relative bg-white ring-1 ring-slate-200"
      )}
    >
      {reorderable && (
        <td className="py-3 px-4 w-10">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-slate-300 hover:text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
          </button>
        </td>
      )}
      {onSelectIds && (
        <td className="py-3 px-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleSelectRow(id, e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]"
          />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className="py-3 px-4 text-slate-700 font-medium">
          {col.render ? col.render(item) : String(item[col.key] ?? "—")}
        </td>
      ))}
      {(onEdit || onDelete) && (
        <td className="py-3 px-4 text-right">
          <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  idKey = "id",
  onEdit,
  onDelete,
  onBulkDelete,
  isLoading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  selectedIds = [],
  onSelectIds,
  reorderable = false,
  onReorder,
}: DataTableProps<T>) {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectIds) return;
    if (e.target.checked) {
      onSelectIds(data.map((item) => item[idKey]));
    } else {
      onSelectIds([]);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
        <div className="flex items-center gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="w-5 h-5 bg-slate-200 rounded"></div>
          {columns.map((col) => (
            <div key={col.key} className="h-4 bg-slate-200 rounded flex-1"></div>
          ))}
        </div>
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 border-b border-slate-50"
          >
            <div className="w-5 h-5 bg-slate-100 rounded"></div>
            {columns.map((col) => (
              <div key={col.key} className="h-4 bg-slate-100 rounded flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState text="Belum ada data yang bisa ditampilkan." />;
  }

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  const content = (
    <table className="w-full min-w-[600px] text-left border-collapse">
      <thead>
        <tr className="border-b border-slate-100 bg-slate-50/80">
          {reorderable && <th className="py-3 px-4 w-10"></th>}
          {onSelectIds && (
            <th className="py-3 px-4 w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]"
              />
            </th>
          )}
          {columns.map((col) => (
            <th
              key={col.key}
              className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
            >
              {col.label}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right w-24">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="text-sm">
        {reorderable ? (
          <SortableContext
            items={data.map((item) => item[idKey])}
            strategy={verticalListSortingStrategy}
          >
            {data.map((item, idx) => (
              <SortableRow
                key={item[idKey]}
                id={item[idKey]}
                item={item}
                idx={idx}
                columns={columns}
                idKey={idKey}
                onSelectIds={onSelectIds}
                selectedIds={selectedIds}
                onEdit={onEdit}
                onDelete={onDelete}
                reorderable={reorderable}
              />
            ))}
          </SortableContext>
        ) : (
          data.map((item, idx) => {
            const id = item[idKey];
            const isSelected = (selectedIds as any[]).includes(id);

            const handleSelectRow = (id: any, checked: boolean) => {
              if (!onSelectIds) return;
              if (checked) {
                onSelectIds([...selectedIds, id]);
              } else {
                onSelectIds(selectedIds.filter((selectedId) => selectedId !== id));
              }
            };

            return (
              <tr
                key={id || idx}
                className={cn(
                  "group border-b border-slate-50 last:border-0 transition-colors",
                  isSelected ? "bg-[#ffd900]/5" : "hover:bg-slate-50/80"
                )}
              >
                {onSelectIds && (
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(id, e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-slate-700 font-medium">
                    {col.render ? col.render(item) : String(item[col.key] ?? "—")}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">{content}</div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-500 font-medium">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                // Simple pagination truncation for many pages (just example)
                if (
                  totalPages > 7 &&
                  p !== 1 &&
                  p !== totalPages &&
                  Math.abs(p - page) > 1
                ) {
                  if (p === 2 || p === totalPages - 1)
                    return (
                      <span key={p} className="text-slate-400 text-xs px-1">
                        ...
                      </span>
                    );
                  return null;
                }

                return (
                  <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={cn(
                      "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-colors",
                      p === page
                        ? "bg-[#ffd900] text-[#301934] shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
