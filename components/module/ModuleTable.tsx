
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { moduleColumns } from "./ModuleColumns";
import { useModules } from "@/hook/useModules";

export default function ModulesTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { modules, total, isLoading } = useModules(LIMIT, offset);
  

  return (
    <div className="p-6">
      <DataTable
        data={modules}
        columns={moduleColumns}
        total={total}
        limit={LIMIT}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
      />
    </div>
  );
}