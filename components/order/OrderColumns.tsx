"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useOrders } from "@/hook/useOrders";
import { currencyFormat } from "@/lib/currencyFormat";

export const orderColumns: ColumnDef<any>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    id: "user_name",
    accessorKey: "user.name",
    header: "User",
    size: 150,
  },
  {
    accessorKey: "plan.name_en",
    header: "Plan",
    size: 150,
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    size: 150,
    cell: ({ getValue }) => currencyFormat(getValue<string | number>()),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
  },
  {
    accessorKey: "payment_method.name_en",
    header: "Payment Method",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 150,
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useOrderStore();
      const { deleteOrder } = useOrders();

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
                await deleteOrder(item.uuid);
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