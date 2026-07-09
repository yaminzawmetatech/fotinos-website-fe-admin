"use client";

import { useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useOrders } from "@/hook/useOrders";
import { currencyFormat } from "@/lib/currencyFormat";

type OrderItem = {
  uuid?: string;
  screenshot_image_url?: string | null;
  user?: { name?: string };
  plan?: { name_en?: string };
  payment_method?: { name_en?: string };
  total_amount?: string | number;
  status?: string;
};

function OrderScreenshotCell({ screenshot }: { screenshot?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!screenshot) {
    return <span className="text-sm text-slate-500">No image</span>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-md border border-slate-200 p-1 transition hover:border-orange-400 hover:shadow-sm"
      >
        <Image
          src={screenshot}
          alt="Order screenshot"
          width={80}
          height={56}
          unoptimized
          className="h-14 w-20 rounded-md object-cover"
        />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-sm text-white"
            >
              ✕
            </button>
            <div className="relative h-[75vh] w-full">
              <Image
                src={screenshot}
                alt="Order screenshot preview"
                fill
                unoptimized
                className="rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function OrderActionsCell({ item }: { item: OrderItem }) {
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
            await deleteOrder(item.uuid ?? "");
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export const orderColumns: ColumnDef<OrderItem>[] = [
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
    id: "screenshot",
    header: "Screenshot",
    size: 140,
    cell: ({ row }) => <OrderScreenshotCell screenshot={row.original?.screenshot_image_url} />,
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
    cell: ({ row }) => <OrderActionsCell item={row.original} />,
  },
];