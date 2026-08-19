


"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContactUsStore } from "@/store/useContactUsStore";
import { useContactUs } from "@/hook/useContactUs";
import { toast } from "@/lib/toast";

function ContactUsActionCell({ item }: { item: any }) {
  const { setEditData, setCreateModalOpen } = useContactUsStore();
  const { deleteContactUs } = useContactUs();

  return (
    <>
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
              await deleteContactUs(item.uuid);
            }
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export const contactUsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
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
    accessorKey: "phone",
    header: "Phone",
    size: 150,
  },
  {
    accessorKey: "company",
    header: "Company",
    size: 150,
  },
  {
    accessorKey: "message",
    header: "Message",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 280,
    cell: ({ row }) => <ContactUsActionCell item={row.original} />,
  },
];