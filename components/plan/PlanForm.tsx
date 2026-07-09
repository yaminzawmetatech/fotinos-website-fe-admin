"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useOurServices } from "@/hook/useOurServices";
import FormSelect from "../common/FormSelect";

type PlanFormValues = {
  service_id?: string | number;
  name_en?: string;
  name_mm?: string;
  price?: string | number;
  outline_en?: string;
  outline_mm?: string;
  description_en?: string;
  description_mm?: string;
};

type PlanFormProps = {
  form: UseFormReturn<PlanFormValues>;
  onSubmit: (data: PlanFormValues) => void | Promise<void>;
  editData?: PlanFormValues | null;
};

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<InstanceType<typeof ClassicEditor> | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const nextValue = value ?? "";
    const currentValue = editor.getData();

    if (currentValue !== nextValue) {
      editor.setData(nextValue);
    }
  }, [value]);

  const insertLink = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const url = window.prompt("Enter URL", "https://");
    if (!url) return;

    const currentData = editor.getData();
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${currentData || "link"}</a>`;
    editor.setData(linkHtml);
    editor.focus();
  };

  const insertTicketList = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const ticketListHtml = `
      <ul style="margin: 0.5rem 0; padding-left: 1.25rem; list-style: none;">
        <li>✔ Step one</li>
        <li>✔ Step two</li>
        <li>✔ Step three</li>
      </ul>
    `;

    const currentData = editor.getData();
    const nextData = currentData ? `${currentData}<p></p>${ticketListHtml}` : ticketListHtml;

    editor.setData(nextData);
    editor.focus();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-orange-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between border-b border-orange-100 bg-orange-50/70 px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">
          Editor
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={insertTicketList}
            className="rounded-md border border-orange-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 transition hover:border-orange-400 hover:text-orange-600"
          >
            Insert Ticket List
          </button>
          <button
            type="button"
            onClick={insertLink}
            className="rounded-md border border-orange-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 transition hover:border-orange-400 hover:text-orange-600"
          >
            Insert Link
          </button>
        </div>
      </div>

      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder,
          toolbar: ["bold", "italic", "underline", "bulletedList", "numberedList", "link"],
        }}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}

export default function PlanForm({ form, onSubmit, editData }: PlanFormProps) {
  const { register, handleSubmit, reset, control, setValue, watch } = form;

  const { ourServices } = useOurServices();
  const outlineEnValue = watch("outline_en") || "";
  const outlineMmValue = watch("outline_mm") || "";

  // Format array payload into simple standard options
  const serviceOptions = (ourServices || []).map((service: { id: string | number; name_en: string }) => ({
    id: service.id,
    name: service.name_en,
  }));

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  const submitHandler = async (data: PlanFormValues) => {
    const payload: PlanFormValues = {
      service_id: data.service_id,
      name_en: data.name_en,
      name_mm: data.name_mm,
      price: data.price,
      outline_en: data.outline_en,
      outline_mm: data.outline_mm,
      description_en: data.description_en,
      description_mm: data.description_mm,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* NAME EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (EN)</label>
        <Input {...register("name_en")} required />
      </div>

      {/* NAME MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Name (MM)</label>
        <Input {...register("name_mm")} required />
      </div>

      {/* SERVICE SELECT ELEMENT */}
      <FormSelect
        name="service_id"
        control={control}
        options={serviceOptions}
        label="Service"
        rules={{ required: "Service is required" }}
      />

      {/* DESCRIPTION EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Description (EN)</label>
        <Input
          {...register("description_en")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* DESCRIPTION MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Description (MM)</label>
        <Input
          {...register("description_mm")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* OUTLINE EN */}
      <div>
        <label className="text-sm font-medium block mb-1">Outline (EN)</label>
        <RichTextEditor
          value={outlineEnValue}
          onChange={(value) =>
            setValue("outline_en", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          placeholder="Write the plan outline in English"
        />
      </div>

      {/* OUTLINE MM */}
      <div>
        <label className="text-sm font-medium block mb-1">Outline (MM)</label>
        <RichTextEditor
          value={outlineMmValue}
          onChange={(value) =>
            setValue("outline_mm", value, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          placeholder="Write the plan outline in Myanmar"
        />
      </div>

      {/* PRICE */}
      <div>
        <label className="text-sm font-medium block mb-1">Price</label>
        <Input {...register("price")} required />
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Plan" : "Create Plan"}
      </Button>
    </form>
  );
}