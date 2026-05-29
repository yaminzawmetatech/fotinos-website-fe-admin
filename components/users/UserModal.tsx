"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store/useUserStore";
import UserForm from "./UserForm";
import { useUsers } from "@/hook/useUsers";
import { toast } from "@/lib/toast";


export default function UserModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useUserStore();
  const { createUser, updateUser } = useUsers();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      ph_no: "",
      password: ""
    },
  });

  const handleClose = (open: boolean) => {
    setCreateModalOpen(open);

    if (!open) {
      form.reset({
        name: "",
        email: "",
        ph_no: "",
        password: ""
      },);
      reset(); // Clears editData from Zustand
    }
  };

  const onSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateUser({
          uuid: editData.uuid,
          data: values,
        });

        toast.success("User updated successfully");
      } else {
        await createUser(values);

        toast.success("User created successfully");
      }

      handleClose(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (

    <Dialog open={createModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[calc(100%-20px)] max-h-[90vh] overflow-y-auto overflow-x-visible rounded-2xl p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-center text-orange-600 text-lg font-semibold">
            {editData ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <UserForm editData={editData} form={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}