"use client";

import { Button } from "@/components/ui/button";
import { usePaymentMethodStore } from "@/store/usePaymentMethodStore";
import PaymentMethodModal from "@/components/paymentMethod/PaymentMethodModal";
import PaymentMethodTable from "@/components/paymentMethod/PaymentMethodTable";

export default function PaymentMethodsPage() {
  const { setCreateModalOpen } = usePaymentMethodStore();

  return (
    <div className="p-2">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Payment Methods</h1>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-orange-100 backdrop-blur border border-orange-300 text-orange-600 hover:bg-orange-200 shadow-sm rounded-xl px-5 transition"
        >
          + Add Payment Method
        </Button>
      </div>

      <PaymentMethodTable />
      <PaymentMethodModal />
    </div>
  );
}