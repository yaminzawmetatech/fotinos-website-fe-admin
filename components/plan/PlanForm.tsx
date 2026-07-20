"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useOurServices } from "@/hook/useOurServices";
import FormSelect from "../common/FormSelect";
import { toBase64 } from "@/lib/file";

type PlanFormValues = {
  service_id?: string | number;
  name_en?: string;
  name_mm?: string;
  price?: string | number;
  outline_en?: string;
  outline_mm?: string;
  description_en?: string;
  description_mm?: string;
  image_url? : string;
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
  const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
  
    const fileRef = useRef<HTMLInputElement>(null);
  
    // =========================
    // LOAD EDIT DATA
    // =========================
    useEffect(() => {
      if (editData) {
        reset(editData);
        setPreview(editData.image_url ?? null); // backend image URL
        setImage(null);
      } else {
        reset();
        setPreview(null);
        setImage(null);
      }
    }, [editData, reset]);
  
    // =========================
    // FILE SELECT
    // =========================
    const handleFile = (file: File) => {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // local preview
    };
  
    const handleFileChange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleFile(file);
    };
  // Format array payload into simple standard options
  const serviceOptions = (ourServices || []).map((service: { id: string | number; name_en: string }) => ({
    id: service.id,
    name: service.name_en,
  }));

  const submitHandler = async (data: PlanFormValues) => {
    let base64Image = null;
      
    if (image) {
      base64Image = await toBase64(image);
    }
    const payload: PlanFormValues = {
      service_id: data.service_id,
      name_en: data.name_en,
      name_mm: data.name_mm,
      price: data.price,
      outline_en: data.outline_en,
      outline_mm: data.outline_mm,
      description_en: data.description_en,
      description_mm: data.description_mm,
      image_url: base64Image, // base64 string
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

      {/* ================= IMAGE ================= */}
      <div>
        <label className="text-sm font-medium">Image</label>

        {/* DROP AREA */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className="mt-2 relative border-2 border-dashed border-orange-300 rounded-2xl p-6 cursor-pointer hover:bg-orange-50 transition flex flex-col items-center justify-center min-h-[180px]"
        >

          {/* EMPTY STATE */}
          {!preview && (
            <p className="text-sm text-gray-500">
              Drag & Drop or Click to upload image
            </p>
          )}

          {/* PREVIEW (IMPORTANT FIX HERE) */}
          {preview && (
            <div className="relative w-full h-40 flex items-center justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* FILE INPUT */}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" className="w-full">
        {editData ? "Update Plan" : "Create Plan"}
      </Button>
    </form>
  );
}