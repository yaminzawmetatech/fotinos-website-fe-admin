
"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  ColumnPinningState,
} from "@tanstack/react-table";
import { useState } from "react";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  total: number;
  limit: number;
  offset: number;
  setOffset: (value: number | ((prev: number) => number)) => void;
  isLoading?: boolean;
  columnPinning: ColumnPinningState;
  setColumnPinning: React.Dispatch<React.SetStateAction<ColumnPinningState>>;
};

export default function DataTable<T>({
  data,
  columns,
  total,
  limit,
  offset,
  setOffset,
  isLoading,
  columnPinning,
  setColumnPinning
}: DataTableProps<T>) {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnPinning },
    onColumnPinningChange: setColumnPinning,
  });

  const getPages = () => {
    const pages: (number | string)[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) pages.push(1, "...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...", totalPages);
    return pages;
  };

  return (
    <div className="space-y-4 w-full min-w-0">

      <div className="w-full rounded-lg border border-orange-100 bg-white overflow-x-auto relative block shadow-sm">
        <table 
          className="w-full min-w-full table-fixed border-collapse divide-y divide-orange-100 text-left text-sm"
          style={{ width: Math.max(table.getTotalSize(), 800) }} 
        >

          {/* HEADER */}
          <thead className="bg-orange-100 sticky top-0 z-20">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();
                  
                  const pinnedStyles: React.CSSProperties = {
                    width: header.getSize(),
                    position: isPinned ? "sticky" : undefined,
                    left: isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
                    right: isPinned === "right" ? `${header.column.getAfter("right")}px` : undefined,
                  };

                  return (
                    <th
                      key={header.id}
                      style={pinnedStyles}
                      className={`px-4 py-3.5 font-semibold text-orange-950 bg-orange-100 border-b border-orange-200/80 sticky top-0
                        ${isPinned === "left" ? "z-40 shadow-[2px_0_5px_-2px_rgba(249,115,22,0.12)]" : "z-20"}
                        ${isPinned === "right" ? "z-40 shadow-[-2px_0_5px_-2px_rgba(249,115,22,0.12)]" : ""}
                      `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-orange-50 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-orange-50/20 transition-colors">
                  {row.getVisibleCells().map((cell) => {
                    const isPinned = cell.column.getIsPinned();

                    const pinnedStyles: React.CSSProperties = {
                      width: cell.column.getSize(),
                      position: isPinned ? "sticky" : undefined,
                      left: isPinned === "left" ? `${cell.column.getStart("left")}px` : undefined,
                      right: isPinned === "right" ? `${cell.column.getAfter("right")}px` : undefined,
                    };

                    return (
                      <td
                        key={cell.id}
                        style={pinnedStyles}
                        className={`px-4 py-3 text-gray-700 bg-white border-b border-orange-50/30
                          ${isPinned === "left" ? "z-10 shadow-[2px_0_5px_-2px_rgba(249,115,22,0.08)]" : ""}
                          ${isPinned === "right" ? "z-10 shadow-[-2px_0_5px_-2px_rgba(249,115,22,0.08)]" : ""}
                        `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <button
          disabled={offset === 0}
          onClick={() => setOffset((o) => o - limit)}
          className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md disabled:opacity-40 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
        >
          Prev
        </button>

        {getPages().map((p, i) =>
          typeof p === "number" ? (
            <button
              key={i}
              onClick={() => setOffset((p - 1) * limit)}
              className={`px-3 py-1.5 text-xs font-medium border rounded-md transition ${
                currentPage === p 
                  ? "bg-orange-500 text-white border-orange-500 font-semibold shadow-sm" 
                  : "border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={i} className="px-1 text-gray-400 text-xs">...</span>
          )
        )}

        <button
          disabled={offset + limit >= total}
          onClick={() => setOffset((o) => o + limit)}
          className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md disabled:opacity-40 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
        >
          Next
        </button>
      </div>

    </div>
  );
}