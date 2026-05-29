
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { planVideoColumns } from "./PlanVideoColumns";
import { usePlanVideos } from "@/hook/usePlanVideos";
import { ColumnPinningState } from "@tanstack/react-table";

export default function PlanVideoTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { planVideos, total, isLoading } = usePlanVideos(LIMIT, offset);
  
  // dynamic column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name_en"],
    right: ["actions"],
  });

  return (
    <div>
      <DataTable
        data={planVideos}
        columns={planVideoColumns}
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