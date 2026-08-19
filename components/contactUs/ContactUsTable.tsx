
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { contactUsColumns } from "./ContactUsColumns";
import { useContactUs } from "@/hook/useContactUs";
import { ColumnPinningState } from "@tanstack/react-table";

export default function ContactUsTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { modules, total, isLoading } = useContactUs(LIMIT, offset);

  // dynamic column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name"],
    right: ["actions"],
  });
  
  return (
    <div>
      <DataTable
        data={modules}
        columns={contactUsColumns}
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