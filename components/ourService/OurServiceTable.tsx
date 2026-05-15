// "use client";

// import { useOurServices } from "@/hook/useOurServices";
// import { Button } from "@/components/ui/button";
// import { useOurServiceStore } from "@/store/useOurServiceStore";

// export default function OurServicesTable() {
//   const { ourServices, isLoading, deleteOurService } = useOurServices();
//   const { setEditData, setCreateModalOpen } = useOurServiceStore();

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
//       <thead className="bg-orange-50">
//         <tr>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">No</th>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">Name (MM)</th>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">Name (EN)</th>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">Description (EN)</th>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">Description (MM)</th>
//           <th className="p-3 text-left text-sm font-semibold text-orange-700">Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {ourServices.map((item: any) => (
//           <tr key={item.id}>
//             <td className="border p-2">{}</td>
//             <td className="border p-2">{item.name_en}</td>
//             <td className="border p-2">{item.name_mm}</td>
//             <td className="border p-2">{item.description_en}</td>
//             <td className="border p-2">{item.description_mm}</td>
//             <td className="border p-2 space-x-2">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setEditData(item);
//                 setCreateModalOpen(true);
//               }}
//               className="border-orange-300 text-orange-600 hover:bg-orange-100"
//             >
//               Edit
//             </Button>

//             <Button
//               onClick={() => deleteOurService(item.uuid)}
//               className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
//             >
//               Delete
//             </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


// components/our-services/OurServicesTable.tsx
// "use client";

// import { useState } from "react";
// import { useOurServices } from "@/hook/useOurServices";
// import { ourServiceColumns } from "./columns";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";

// export default function OurServicesTable() {
//   const LIMIT = 2;
//   const [offset, setOffset] = useState(0);

//   const { ourServices, total, isLoading } = useOurServices(LIMIT, offset);

//   const currentPage = offset / LIMIT + 1;
//   const totalPages = Math.ceil(total / LIMIT);

//   const table = useReactTable({
//     data: ourServices,
//     columns: ourServiceColumns,
//     getCoreRowModel: getCoreRowModel(),
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
//     <div className="p-0 bg-white border border-gray-100 shadow-md hover:shadow-md transition">

//       {/* <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-md transition"> */}
//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           <thead className="sticky top-0 z-10">
//             {table.getHeaderGroups().map((hg) => (
//               // <tr
//               // key={hg.id}
//               // className="bg-gray-200 border-b border-gray-200 backdrop-blur"
//               // >

//               <tr
//                 key={hg.id}
//                 className="bg-orange-100 backdrop-blur border "
//               >
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
//       <div className="p-3 flex items-center justify-between mt-6">

//         {/* Prev */}
//         <button
//           onClick={() => setOffset((p) => p - LIMIT)}
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
//                 onClick={() =>
//                   setOffset((Number(page) - 1) * LIMIT)
//                 }
//                 className={`px-3 py-1 rounded-lg text-sm transition ${page === currentPage
//                   ? "bg-gray-900 text-white"
//                   : "hover:bg-gray-100 text-gray-700"
//                   }`}
//               >
//                 {page}
//               </button>
//             )
//           )}
//         </div>

//         {/* Next */}
//         <button
//           onClick={() => setOffset((p) => p + LIMIT)}
//           disabled={offset + LIMIT >= total}
//           className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
//         >
//           Next
//         </button>

//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useOurServices } from "@/hook/useOurServices";
import { ourServiceColumns } from "./columns";
import DataTable from "@/components/common/DataTable";

export default function OurServicesTable() {
  const LIMIT = 2; // limit per page
  const [offset, setOffset] = useState(0);
  const { ourServices, total, isLoading } = useOurServices(LIMIT, offset);
  

  return (
    <div className="p-6">
      <DataTable
        data={ourServices}
        columns={ourServiceColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
      />
    </div>
  );
}