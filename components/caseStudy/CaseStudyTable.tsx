
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { caseStudyColumns } from "./CaseStudyColumns";
import { useCaseStudies } from "@/hook/useCaseStudies";
import { ColumnPinningState } from "@tanstack/react-table";


export default function CaseStudyTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { caseStudies, total, isLoading } = useCaseStudies(LIMIT, offset);

   // dynamic column pinning state
   const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name_en"],
    right: ["actions"],
  });
  

  return (
    <div>
      <DataTable
        data={caseStudies}
        columns={caseStudyColumns}
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