


// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { usePlanStore } from "@/store/usePlanStore";
// import { usePlans } from "@/hook/usePlans";

// export const planColumns: ColumnDef<any>[] = [
//   {
//     header: "No",
//     cell: ({ row }) => row.index + 1,
//   },
//   {
//     accessorKey: "name_en",
//     header: "Name (EN)",
//   },
//   {
//     accessorKey: "name_mm",
//     header: "Name (MM)",
//   },
//   {
//     accessorKey: "description_en",
//     header: "Description (EN)",
//   },
//   {
//     accessorKey: "description_mm",
//     header: "Description (MM)",
//   },
//   {
//     accessorKey: "outline_en",
//     header: "Outline (EN)",
//   },
//   {
//     accessorKey: "outline_mm",
//     header: "Outline (MM)",
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//   },
//   {
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => {
//       const item = row.original;
//       const { setEditData, setCreateModalOpen } = usePlanStore();
//       const { deletePlan } = usePlans(); // TanStack Hook

//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               setEditData(item);
//               setCreateModalOpen(true);
//             }}
//             className="border-orange-300 text-orange-600 hover:bg-orange-100"
//           >
//             Edit
//           </Button>

//           <Button
//             size="sm"
//             variant="destructive"
//             onClick={async () => {
//               if (confirm("Are you sure?")) {
//                 await deletePlan(item.uuid);
//               }
//             }}
//           >
//             Delete
//           </Button>
//         </div>
//       );
//     },
//   },
// ];


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/usePlanStore";
import { usePlans } from "@/hook/usePlans";

export const planColumns: ColumnDef<any>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: "name_en",
    header: "Name (EN)",
    size: 150,
  },
  {
    accessorKey: "name_mm",
    header: "Name (MM)",
    size: 150,
  },
  {
    accessorKey: "description_en",
    header: "Description (EN)",
    size: 150,
  },
  {
    accessorKey: "description_mm",
    header: "Description (MM)",
    size: 150,
  },
  {
    accessorKey: "outline_en",
    header: "Outline (EN)",
    size: 150,
  },
  {
    accessorKey: "outline_mm",
    header: "Outline (MM)",
    size: 150,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 120,
  },
  {
    id: "actions",
    header: "Actions",
    size: 150,
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = usePlanStore();
      const { deletePlan } = usePlans();

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditData(item);
              setCreateModalOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              if (confirm("Are you sure?")) {
                await deletePlan(item.uuid);
              }
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];