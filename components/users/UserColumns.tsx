"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useUsers } from "@/hook/useUsers";

export const userColumns: ColumnDef<any>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150,
  },
  {
    accessorKey: "ph_no",
    header: "Ph No",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 150,
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useUserStore();
      const { deleteUser } = useUsers();

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
                await deleteUser(item.uuid);
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