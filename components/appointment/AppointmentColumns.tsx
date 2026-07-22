


"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useAppointments } from "@/hook/useAppointments";
import { toast } from "@/lib/toast";

function AppointmentActionCell({ item }: { item: any }) {
  const { setEditData, setCreateModalOpen } = useAppointmentStore();
  const { deleteAppointment, confirmAppointment } = useAppointments();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState(item.meeting_link ?? "");

  const handleConfirmAppointment = async () => {
    try {
      await confirmAppointment({
        uuid: item.uuid,
        meeting_link: meetingLink,
        status: "confirmed",
      });

      toast.success("Appointment confirmed successfully");
      setIsConfirmDialogOpen(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await confirmAppointment({
        uuid: item.uuid,
        status: "canceled",
      });

      toast.success("Appointment canceled successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setIsConfirmDialogOpen(true)}
          className="border-orange-300 text-orange-600 hover:bg-orange-100"
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            if (confirm("Are you sure you want to cancel this appointment?")) {
              await handleCancelAppointment();
            }
          }}
          className="border-red-300 text-red-600 hover:bg-red-100"
        >
          Cancel
        </Button>
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
      </div>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Confirm Appointment</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <label className="text-sm font-medium block">Meeting Link</label>
            <Input
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/abc-xyz"
            />
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Close
            </Button>
            <Button onClick={handleConfirmAppointment}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
    size: 280,
    cell: ({ row }) => <AppointmentActionCell item={row.original} />,
  },
];