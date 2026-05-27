"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/store/usePlanStore";
import { usePlans } from "@/hook/usePlans";

export const orderColumns: ColumnDef<any>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: "plan_id",
    header: "Plan",
    size: 150,
  },
  {
    accessorKey: "user_id",
    header: "User",
    size: 150,
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
  },
  {
    accessorKey: "payment_method_id",
    header: "Payment Method",
    size: 150,
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