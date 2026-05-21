


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePlanVideoStore } from "@/store/usePlanVideoStore";
import { usePlanVideos } from "@/hook/usePlanVideos";

export const planVideoColumns: ColumnDef<any>[] = [
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
    accessorKey: "video_link",
    header: "Video Link",
  },
  {
    accessorKey: "video_order",
    header: "Video Order",
  },
  {
    accessorKey: "is_free",
    header: "Is Free",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = usePlanVideoStore();
      const { deletePlanVideo } = usePlanVideos(); // TanStack Hook

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
                await deletePlanVideo(item.uuid);
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