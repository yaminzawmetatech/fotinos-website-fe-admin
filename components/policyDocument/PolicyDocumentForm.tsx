"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

export type PolicyDocumentFormValues = {
  document_type?: string;
  title?: string;
  content?: string;
  is_view?: boolean;
  is_downloadable?: boolean;
};

type CKEditorInstance = {
  getData: () => string;
  setData: (value: string) => void;
};

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<CKEditorInstance | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-orange-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="border-b border-orange-100 bg-orange-50/70 px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">
          Editor
        </span>
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={value ?? ""}
        config={{
          placeholder,
          toolbar: ["bold", "italic", "underline", "bulletedList", "numberedList", "link"],
        }}
        onReady={(editor) => {
          editorRef.current = editor;
          editor.setData(value ?? "");
        }}
        onChange={(_event, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
}

type PolicyDocumentFormProps = {
  form: UseFormReturn<PolicyDocumentFormValues>;
  onSubmit: (data: PolicyDocumentFormValues) => void | Promise<void>;
  editData?: PolicyDocumentFormValues | null;
};

const toBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    return ["true", "1", "yes", "on"].includes(value.toLowerCase());
  }

  return false;
};

export default function PolicyDocumentForm({
  form,
  onSubmit,
  editData,
}: PolicyDocumentFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = form;
  const contentValue = watch("content") || "";

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        is_view: toBoolean(editData.is_view),
        is_downloadable: toBoolean(editData.is_downloadable),
      });
    } else {
      reset({
        document_type: "",
        title: "",
        content: "",
        is_view: false,
        is_downloadable: false,
      });
    }
  }, [editData, reset]);

  const submitHandler = async (data: PolicyDocumentFormValues) => {
    const payload = {
      document_type: data.document_type,
      title: data.title,
      content: data.content,
      is_view: data.is_view,
      is_downloadable: data.is_downloadable,
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

      {/* CONTENT */}
      <div>
        <label className="text-sm font-medium block mb-1">Content</label>
        <RichTextEditor
          value={contentValue}
          onChange={(value) =>
            setValue("content", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          placeholder="Write the policy content here"
        />
      </div>

      {/* IS VIEW */}
      <Controller
        control={form.control}
        name="is_view"
        render={({ field }) => (
          <label className="flex items-center gap-3 rounded-xl border border-orange-200/80 bg-white px-4 py-3">
            <Checkbox
              checked={!!field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            <span className="text-sm font-medium">Is View</span>
          </label>
        )}
      />

      {/* IS DOWNLOADABLE */}
      <Controller
        control={form.control}
        name="is_downloadable"
        render={({ field }) => (
          <label className="flex items-center gap-3 rounded-xl border border-orange-200/80 bg-white px-4 py-3">
            <Checkbox
              checked={!!field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            <span className="text-sm font-medium">Is Downloadable</span>
          </label>
        )}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Policy Document" : "Create Policy Document"}
      </Button>
    </form>
  );
}
