
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { planColumns } from "./PlanColumns";
import { usePlans } from "@/hook/usePlans";
import { ColumnPinningState } from "@tanstack/react-table";

export default function PlansTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { plans, total, isLoading } = usePlans(LIMIT, offset);
  
   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name_en"],
    right: ["actions"],
  });


  return (
    <div className="p-6">
      <DataTable
        data={plans}
        columns={planColumns}
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