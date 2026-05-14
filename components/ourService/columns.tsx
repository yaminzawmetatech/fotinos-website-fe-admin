// components/our-services/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type OurService = {
  uuid: string;
  name_mm: string;
  name_en: string;
  description_en: string;
};

export const ourServiceColumns: ColumnDef<OurService>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name_mm",
    header: "Name (MM)",
  },
  {
    accessorKey: "name_en",
    header: "Name (EN)",
  },
  {
    accessorKey: "description_en",
    header: "Description (EN)",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      );
    },
  },
];