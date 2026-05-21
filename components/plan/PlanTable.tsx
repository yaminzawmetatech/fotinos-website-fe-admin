
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { planColumns } from "./PlanColumns";
import { usePlans } from "@/hook/usePlans";

export default function PlansTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { plans, total, isLoading } = usePlans(LIMIT, offset);
  

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
      />
    </div>
  );
}