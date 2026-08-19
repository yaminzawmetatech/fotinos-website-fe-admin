"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import FormSelect from "../common/FormSelect";

export default function PolicyDocumentForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  const submitHandler = async (data: any) => {
    const payload = {
      document_type: data.document_type,
      title: data.title,
      content: data.content,
      is_view: data.is_view,
      is_downloadable : data.is_downloadable
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* NAME */}
      <div>
        <label className="text-sm font-medium block mb-1">Document Type</label>
        <Input {...register("document_type")} required />
      </div>

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium block mb-1">Title</label>
        <Input {...register("title")} required />
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium block mb-1">Content</label>
        <Input {...register("content")} required />
      </div>

      {/* COMPANY */}
      <div>
        <label className="text-sm font-medium block mb-1">IsView</label>
        <Input {...register("is_view")} />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="text-sm font-medium block mb-1">IsDownloadable</label>
        <Input {...register("is_downloadable")} />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Policy Document" : "Create Policy Document"}
      </Button>
    </form>
  );
}