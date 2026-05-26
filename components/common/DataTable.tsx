// "use client";

// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   ColumnPinningState,
// } from "@tanstack/react-table";
// import { useState } from "react";

// type DataTableProps<T> = {
//   data: T[];
//   columns: ColumnDef<T, any>[];

//   total: number;
//   limit: number;
//   offset: number;
//   setOffset: (value: number | ((prev: number) => number)) => void;

//   isLoading?: boolean;
// };

// export default function DataTable<T>({
//   data,
//   columns,
//   total,
//   limit,
//   offset,
//   setOffset,
//   isLoading,
// }: DataTableProps<T>) {
//   const currentPage = offset / limit + 1;
//   const totalPages = Math.ceil(total / limit);

//   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
//     left: [],
//     right: [],
//   });

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       columnPinning,
//     },
//     onColumnPinningChange: setColumnPinning,
//   });

//   const getPages = () => {
//     const pages: (number | string)[] = [];

//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     if (start > 1) pages.push(1, "...");

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     if (end < totalPages) pages.push("...", totalPages);

//     return pages;
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-3">
//         <div className="h-10 bg-gray-100 rounded animate-pulse" />
//         <div className="h-10 bg-gray-100 rounded animate-pulse" />
//         <div className="h-10 bg-gray-100 rounded animate-pulse" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white border border-gray-100 shadow-md">

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           <thead className="sticky top-0 z-10">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id} className="bg-orange-100 border">
//                 {hg.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="border-b border-gray-100 hover:bg-gray-50/70 transition"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="p-4 text-gray-700">
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="p-3 flex items-center justify-between">

//         {/* Prev */}
//         <button
//           onClick={() => setOffset((p) => p - limit)}
//           disabled={offset === 0}
//           className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
//         >
//           Previous
//         </button>

//         {/* Pages */}
//         <div className="flex items-center gap-2">
//           {getPages().map((page, idx) =>
//             page === "..." ? (
//               <span key={idx} className="px-2 text-gray-400">
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={idx}
//                 onClick={() => setOffset((Number(page) - 1) * limit)}
//                 className={`px-3 py-1 rounded-lg text-sm transition ${
//                   page === currentPage
//                     ? "bg-gray-900 text-white"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {page}
//               </button>
//             )
//           )}
//         </div>

//         {/* Next */}
//         <button
//           onClick={() => setOffset((p) => p + limit)}
//           disabled={offset + limit >= total}
//           className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
//         >
//           Next
//         </button>

//       </div>
//     </div>
//   );
// }

// "use client";

// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   ColumnPinningState,
// } from "@tanstack/react-table";
// import { useState } from "react";

// type DataTableProps<T> = {
//   data: T[];
//   columns: ColumnDef<T, any>[];

//   total: number;
//   limit: number;
//   offset: number;
//   setOffset: (value: number | ((prev: number) => number)) => void;

//   isLoading?: boolean;
// };

// export default function DataTable<T>({
//   data,
//   columns,
//   total,
//   limit,
//   offset,
//   setOffset,
//   isLoading,
// }: DataTableProps<T>) {
//   const currentPage = offset / limit + 1;
//   const totalPages = Math.ceil(total / limit);

//   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
//     left: ["no", "name_en"],
//     right: ["actions"],
//   });

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: { columnPinning },
//     onColumnPinningChange: setColumnPinning,
//   });

//   const getPages = () => {
//     const pages: (number | string)[] = [];
//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     if (start > 1) pages.push(1, "...");
//     for (let i = start; i <= end; i++) pages.push(i);
//     if (end < totalPages) pages.push("...", totalPages);
//     return pages;
//   };

//   return (
//     <div className="space-y-4">

//       {/* TABLE WRAPPER */}
//       <div className="w-full overflow-x-auto">
//       <div className="relative w-full overflow-auto">
//         {/* <table className="min-w-[1000px] max-w-[1200px] border-collapse"> */}
//         <table className="min-w-[500px] md:min-w-[650px] max-w-[1200px] border-collapse">
//           {/* HEADER */}
//           <thead className="bg-gray-100 sticky top-0 z-10">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id}>
//                 {hg.headers.map((header) => {
//                   const isPinned = header.column.getIsPinned();

//                   return (
//                     <th
//                       key={header.id}
//                       className={`px-3 py-2 text-left text-sm font-semibold border-b bg-orange-100
//                         ${
//                           isPinned === "left"
//                             ? "sticky left-0 z-10 shadow"
//                             : ""
//                         }
//                         ${
//                           isPinned === "right"
//                             ? "sticky left-0 z-10 shadow"
//                             : ""
//                         }
//                       `}
//                       style={{ width: header.getSize() }}
//                     >
//                       <div className="flex items-center justify-between group">
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </div>
//                     </th>
//                   );
//                 })}
//               </tr>
//             ))}
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={columns.length} className="p-4 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="border-b hover:bg-gray-50">
//                   {row.getVisibleCells().map((cell) => {
//                     const isPinned = cell.column.getIsPinned();

//                     return (
//                       <td
//                         key={cell.id}
//                         className={`border px-3 py-2 text-sm
//                           ${
//                             isPinned === "left"
//                               ? "sticky left-0 bg-white z-10 shadow"
//                               : ""
//                           }
//                           ${
//                             isPinned === "right"
//                               ? "sticky right-0 bg-white z-10 shadow"
//                               : ""
//                           }
//                         `}
//                         style={{ width: cell.column.getSize() }}
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center justify-center gap-2">
//         <button
//           disabled={offset === 0}
//           onClick={() => setOffset((o) => o - limit)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Prev
//         </button>

//         {getPages().map((p, i) =>
//           typeof p === "number" ? (
//             <button
//               key={i}
//               onClick={() => setOffset((p - 1) * limit)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === p ? "bg-black text-white" : ""
//               }`}
//             >
//               {p}
//             </button>
//           ) : (
//             <span key={i}>...</span>
//           )
//         )}

//         <button
//           disabled={offset + limit >= total}
//           onClick={() => setOffset((o) => o + limit)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>

//     </div>
//   );
// }



// "use client";

// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   ColumnPinningState,
// } from "@tanstack/react-table";
// import { useState } from "react";

// type DataTableProps<T> = {
//   data: T[];
//   columns: ColumnDef<T, any>[];
//   total: number;
//   limit: number;
//   offset: number;
//   setOffset: (value: number | ((prev: number) => number)) => void;
//   isLoading?: boolean;
// };

// export default function DataTable<T>({
//   data,
//   columns,
//   total,
//   limit,
//   offset,
//   setOffset,
//   isLoading,
// }: DataTableProps<T>) {
//   const currentPage = offset / limit + 1;
//   const totalPages = Math.ceil(total / limit);

//   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
//     left: ["no", "name_en"],
//     right: ["actions"],
//   });

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: { columnPinning },
//     onColumnPinningChange: setColumnPinning,
//   });

//   const getPages = () => {
//     const pages: (number | string)[] = [];
//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     if (start > 1) pages.push(1, "...");
//     for (let i = start; i <= end; i++) pages.push(i);
//     if (end < totalPages) pages.push("...", totalPages);
//     return pages;
//   };

//   return (
//     <div className="space-y-4 w-full min-w-0">

//       {/* THE ISOLATED SCROLL CONTAINER */}
//       <div className="w-full rounded-md border border-gray-200 bg-white overflow-x-auto relative block shadow-sm">
//         <table 
//           className="w-full min-w-full table-fixed border-collapse divide-y divide-gray-200 text-left text-sm"
//           style={{ width: Math.max(table.getTotalSize(), 800) }} 
//           // Ensures table is at least 800px if it has many columns, but scales elegantly
//         >

//           {/* HEADER */}
//           <thead className="bg-gray-50 sticky top-0 z-20">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id}>
//                 {hg.headers.map((header) => {
//                   const isPinned = header.column.getIsPinned();
                  
//                   // Precision TanStack Sticky Offsets
//                   const pinnedStyles: React.CSSProperties = {
//                     width: header.getSize(),
//                     position: isPinned ? "sticky" : undefined,
//                     left: isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
//                     right: isPinned === "right" ? `${header.column.getAfter("right")}px` : undefined,
//                   };

//                   return (
//                     <th
//                       key={header.id}
//                       style={pinnedStyles}
//                       className={`px-4 py-3 font-semibold text-gray-700 bg-gray-50 border-b border-gray-200
//                         ${isPinned === "left" ? "z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]" : ""}
//                         ${isPinned === "right" ? "z-30 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.08)]" : ""}
//                       `}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </th>
//                   );
//                 })}
//               </tr>
//             ))}
//           </thead>

//           {/* BODY */}
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {isLoading ? (
//               <tr>
//                 <td colSpan={columns.length} className="p-4 text-center text-gray-500">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
//                   {row.getVisibleCells().map((cell) => {
//                     const isPinned = cell.column.getIsPinned();

//                     const pinnedStyles: React.CSSProperties = {
//                       width: cell.column.getSize(),
//                       position: isPinned ? "sticky" : undefined,
//                       left: isPinned === "left" ? `${cell.column.getStart("left")}px` : undefined,
//                       right: isPinned === "right" ? `${cell.column.getAfter("right")}px` : undefined,
//                     };

//                     return (
//                       <td
//                         key={cell.id}
//                         style={pinnedStyles}
//                         className={`px-4 py-3 text-gray-600 bg-white border-b border-gray-100
//                           ${isPinned === "left" ? "z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]" : ""}
//                           ${isPinned === "right" ? "z-10 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.08)]" : ""}
//                         `}
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center justify-center gap-2 pt-2">
//         <button
//           disabled={offset === 0}
//           onClick={() => setOffset((o) => o - limit)}
//           className="px-3 py-1.5 text-xs font-medium border rounded-md disabled:opacity-40 hover:bg-gray-50 transition"
//         >
//           Prev
//         </button>

//         {getPages().map((p, i) =>
//           typeof p === "number" ? (
//             <button
//               key={i}
//               onClick={() => setOffset((p - 1) * limit)}
//               className={`px-3 py-1.5 text-xs font-medium border rounded-md transition ${
//                 currentPage === p ? "bg-black text-white border-black" : "hover:bg-gray-50"
//               }`}
//             >
//               {p}
//             </button>
//           ) : (
//             <span key={i} className="px-1 text-gray-400 text-xs">...</span>
//           )
//         )}

//         <button
//           disabled={offset + limit >= total}
//           onClick={() => setOffset((o) => o + limit)}
//           className="px-3 py-1.5 text-xs font-medium border rounded-md disabled:opacity-40 hover:bg-gray-50 transition"
//         >
//           Next
//         </button>
//       </div>

//     </div>
//   );
// }

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