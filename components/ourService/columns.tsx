// // components/our-services/columns.tsx
// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";

// export type OurService = {
//   uuid: string;
//   name_mm: string;
//   name_en: string;
//   description_en: string;
// };

// export const ourServiceColumns: ColumnDef<OurService>[] = [
//   {
//     header: "No",
//     cell: ({ row }) => row.index + 1,
//   },
//   {
//     accessorKey: "name_mm",
//     header: "Name (MM)",
//   },
//   {
//     accessorKey: "name_en",
//     header: "Name (EN)",
//   },
//   {
//     accessorKey: "description_en",
//     header: "Description (EN)",
//   },
//   {
//     header: "Actions",
//     cell: ({ row }) => {
//       const data = row.original;
//       return (
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm">
//             Edit
//           </Button>
//           <Button variant="destructive" size="sm">
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
import { useOurServiceStore } from "@/store/useOurServiceStore";
import { useOurServices } from "@/hook/useOurServices";

export const ourServiceColumns: ColumnDef<any>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name_en",
    header: "Name (EN)",
  },
  {
    accessorKey: "name_mm",
    header: "Name (MM)",
  },
  {
    accessorKey: "description_en",
    header: "Description (EN)",
  },
  {
    accessorKey: "description_mm",
    header: "Description (MN)",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useOurServiceStore();
      const { deleteOurService } = useOurServices(); // TanStack Hook

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditData(item);
              setCreateModalOpen(true);
            }}
            className="border-orange-300 text-orange-600 hover:bg-orange-100"
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              if (confirm("Are you sure?")) {
                await deleteOurService(item.uuid);
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