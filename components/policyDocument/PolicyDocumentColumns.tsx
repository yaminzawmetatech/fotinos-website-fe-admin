


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
import { usePolicyDocumentStore } from "@/store/usePolicyDocumentStore";
import { usePolicyDocuments } from "@/hook/usePolicyDocuments";
import { toast } from "@/lib/toast";

function PolicyDocumentActionCell({ item }: { item: any }) {
  const { setEditData, setCreateModalOpen } = usePolicyDocumentStore();
  const { deletePolicyDocument } = usePolicyDocuments();

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
              await deletePolicyDocument(item.uuid);
            }
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export const policyDocumentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: "document_type",
    header: "Document Type",
    size: 150,
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 150,
  },
  {
    accessorKey: "is_view",
    header: "IsView",
    size: 150,
  },
  {
    accessorKey: "is_downloadable",
    header: "isDownloadable",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 280,
    cell: ({ row }) => <PolicyDocumentActionCell item={row.original} />,
  },
];