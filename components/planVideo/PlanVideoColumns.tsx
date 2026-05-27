


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePlanVideoStore } from "@/store/usePlanVideoStore";
import { usePlanVideos } from "@/hook/usePlanVideos";
import { Badge } from "@/components/ui/badge";

export const planVideoColumns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
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
    accessorKey: "plan.name_en",
    header: "Plan Name (EN)",
    size: 150,
  },
  {
    accessorKey: "module.module_name_en",
    header: "Module Name (EN)",
    size: 150,
  },
  {
    accessorKey: "video_link",
    header: "Video Link",
    size: 300,
    cell: ({ getValue }) => {
      const link = getValue() as string;

      if (!link) return <span className="text-muted-foreground">-</span>;

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline max-w-[300px] block truncate"
          title={link}
        >
          {link}
        </a>
      );
    },
  },
  {
    accessorKey: "video_order",
    header: "Video Order",
    size: 60,
  },
  {
    accessorKey: "is_free",
    header: "Is Free",
    size: 100,
    // FIXED: Convert 1/0 or true/false to styled visual chips
    cell: ({ getValue }) => {
      const isFree = getValue();

      // Handles checking if your backend returns 1, "1", true, or "true"
      const truthy = isFree === 1 || isFree === "1" || isFree === true || String(isFree).toLowerCase() === "true";

      if (truthy) {
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full">
            Yes
          </Badge>
        );
      }

      return (
        <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 hover:bg-neutral-100 border-none shadow-none font-medium px-2.5 py-0.5 rounded-full">
          No
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 120,
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