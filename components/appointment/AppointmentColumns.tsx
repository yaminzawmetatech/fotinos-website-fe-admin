


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useAppointments } from "@/hook/useAppointments";

export const appointmentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 60,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    size: 150,
  },
  {
    accessorKey: "appointment_date",
    header: "Appointment Date",
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
  },
  {
    accessorKey: "note",
    header: "Note",
    size: 150,
  },
  {
    accessorKey: "service.name_en",
    header: "Service",
    size: 150,
  },
   {
    accessorKey: "meeting_link",
    header: "Meeting Link",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 230,
    cell: ({ row }) => {
      const item = row.original;
      const { setEditData, setCreateModalOpen } = useAppointmentStore();
      const { deleteAppointment } = useAppointments(); // TanStack Hook

      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditData(item);
              setCreateModalOpen(true);
            }}
            className="border-orange-300 text-orange-600 hover:bg-orange-100"
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              if (confirm("Are you sure?")) {
                await deleteAppointment(item.uuid);
              }
            }}
          >
            Delete
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setEditData(item);
              setCreateModalOpen(true);
            }}
            className="border-orange-300 text-orange-600 hover:bg-orange-100"
          >
            Send Email
          </Button>
        </div>
      );
    },
  },
];