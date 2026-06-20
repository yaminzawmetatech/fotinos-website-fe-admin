


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useCaseStudyStore } from "@/store/useCaseStudyStore";
import { useCaseStudies } from "@/hook/useCaseStudies";

export const caseStudyColumns: ColumnDef<any>[] = [
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
    id: "actions",
    header: "Actions",
    size: 120,
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useCaseStudyStore();
      const { deleteCaseStudy } = useCaseStudies(); // TanStack Hook

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
                await deleteCaseStudy(item.uuid);
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