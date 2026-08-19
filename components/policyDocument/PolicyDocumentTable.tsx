
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { policyDocumentColumns } from "./PolicyDocumentColumns";
import { usePolicyDocuments } from "@/hook/usePolicyDocuments";
import { ColumnPinningState } from "@tanstack/react-table";

export default function ContactUsTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { modules, total, isLoading } = usePolicyDocuments(LIMIT, offset);

  // dynamic column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name"],
    right: ["actions"],
  });
  
  return (
    <div>
      <DataTable
        data={modules}
        columns={policyDocumentColumns}
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