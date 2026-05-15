"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];

  total: number;
  limit: number;
  offset: number;
  setOffset: (value: number | ((prev: number) => number)) => void;

  isLoading?: boolean;
};

export default function DataTable<T>({
  data,
  columns,
  total,
  limit,
  offset,
  setOffset,
  isLoading,
}: DataTableProps<T>) {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getPages = () => {
    const pages: (number | string)[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) pages.push(1, "...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
        <div className="h-10 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 shadow-md">

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-orange-100 border">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50/70 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 text-gray-700">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="p-3 flex items-center justify-between">

        {/* Prev */}
        <button
          onClick={() => setOffset((p) => p - limit)}
          disabled={offset === 0}
          className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
        >
          Previous
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2">
          {getPages().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setOffset((Number(page) - 1) * limit)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  page === currentPage
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => setOffset((p) => p + limit)}
          disabled={offset + limit >= total}
          className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
}