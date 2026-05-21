
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { planVideoColumns } from "./PlanVideoColumns";
import { usePlanVideos } from "@/hook/usePlanVideos";

export default function PlanVideosTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { planVideos, total, isLoading } = usePlanVideos(LIMIT, offset);
  

  return (
    <div className="p-6">
      <DataTable
        data={planVideos}
        columns={planVideoColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
      />
    </div>
  );
}