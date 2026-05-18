
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { paymentMethodsColumns } from "./PaymentMethodColumns";
import { usePaymentMethods } from "@/hook/usePaymentMethods";

export default function PaymentMethodsTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { paymentMethods, total, isLoading } = usePaymentMethods(LIMIT, offset);
  

  return (
    <div className="p-6">
      <DataTable
        data={paymentMethods}
        columns={paymentMethodsColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
      />
    </div>
  );
}