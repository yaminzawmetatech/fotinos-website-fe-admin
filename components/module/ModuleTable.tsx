
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { moduleColumns } from "./ModuleColumns";
import { useModules } from "@/hook/useModules";
import { ColumnPinningState } from "@tanstack/react-table";

export default function ModulesTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { modules, total, isLoading } = useModules(LIMIT, offset);

  // dynamic column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "module_name_en"],
    right: ["actions"],
  });
  
  return (
    <div>
      <DataTable
        data={modules}
        columns={moduleColumns}
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