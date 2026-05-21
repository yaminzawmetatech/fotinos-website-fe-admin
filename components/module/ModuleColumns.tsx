


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useModuleStore } from "@/store/useModuleStore";
import { useModules } from "@/hook/useModules";

export const moduleColumns: ColumnDef<any>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "module_name_en",
    header: "Name (EN)",
  },
  {
    accessorKey: "module_name_mm",
    header: "Name (MM)",
  },
  {
    accessorKey: "module_order",
    header: "Order",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useModuleStore();
      const { deleteModule } = useModules(); // TanStack Hook

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
                await deleteModule(item.uuid);
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