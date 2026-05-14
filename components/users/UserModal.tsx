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
import { useusers } from "@/hook/useUsers";
import UserForm from "./UserForm";

export default function UserModal() {
  const { createModalOpen, setCreateModalOpen, editData, reset } = useUserStore();
  const { createUser, updateUser } = useusers();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  // When editData changes -> set form values
  React.useEffect(() => {
    if (editData) {
      form.reset(editData);
    } else {
      form.reset({ name: "", email: "", role: "" });
    }
  }, [editData]);

  const onSubmit = (values: any) => {
    if (editData) {
      updateUser({ id: editData.id, data: values });
    } else {
      createUser(values);
    }
    reset();
    setCreateModalOpen(false);
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit User" : "Create User"}
          </DialogTitle>
        </DialogHeader>

        <UserForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}