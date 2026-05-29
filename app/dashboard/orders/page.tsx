"use client";

import { Button } from "@/components/ui/button";
import OrderTable from "@/components/order/OrderTable";
import OrderModal from "@/components/order/OrderModal";
import { useOrderStore } from "@/store/useOrderStore";

export default function OrdersPage() {
  const { setCreateModalOpen } = useOrderStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Order
        </Button>
      </div>

      <OrderTable />
      <OrderModal />
    </div>
  );
}