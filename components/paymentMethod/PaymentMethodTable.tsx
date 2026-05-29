
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { paymentMethodColumns } from "./PaymentMethodColumns";
import { usePaymentMethods } from "@/hook/usePaymentMethods";
import { ColumnPinningState } from "@tanstack/react-table";


export default function PaymentMethodTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { paymentMethods, total, isLoading } = usePaymentMethods(LIMIT, offset);

   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name_en"],
    right: ["actions"],
  });
  

  return (
    <div>
      <DataTable
        data={paymentMethods}
        columns={paymentMethodColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
        columnPinning={columnPinning}
        setColumnPinning={setColumnPinning}
      />
    </div>
  );
}