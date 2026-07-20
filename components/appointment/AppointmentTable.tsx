
"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { appointmentColumns } from "./AppointmentColumns";
import { useAppointments } from "@/hook/useAppointments";
import { ColumnPinningState } from "@tanstack/react-table";

export default function AppointmentTable() {
  const LIMIT = 10; // limit per page
  const [offset, setOffset] = useState(0);
  const { modules, total, isLoading } = useAppointments(LIMIT, offset);

  // dynamic column pinning state
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["no", "name"],
    right: ["actions"],
  });
  
  return (
    <div>
      <DataTable
        data={modules}
        columns={appointmentColumns}
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