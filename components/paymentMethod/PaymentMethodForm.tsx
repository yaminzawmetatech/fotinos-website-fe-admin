"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toBase64 } from "@/lib/file";
import { useEffect, useRef, useState } from "react";

export default function PaymentMethodForm({
  form,
  onSubmit,
  editData,
}: any) {
  const { register, handleSubmit, reset } = form;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // =========================
  // LOAD EDIT DATA
  // =========================
  useEffect(() => {
    if (editData) {
      reset(editData);
      setPreview(editData.image_url); // backend image URL
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

  // =========================
  // SUBMIT
  // =========================
  const submitHandler = async (data: any) => {
    let base64Image = null;
  
    if (image) {
      base64Image = await toBase64(image);
    }
  
    const payload = {
      name_en: data.name_en,
      name_mm: data.name_mm,
      account_name: data.account_name,
      account_number: data.account_number,
      image_url: base64Image, // base64 string
    };
  
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">

      {/* NAME EN */}
      <div>
        <label className="text-sm font-medium">Name (EN)</label>
        <Input {...register("name_en")} required  />
      </div>

      {/* NAME MM */}
      <div>
        <label className="text-sm font-medium">Name (MM)</label>
        <Input {...register("name_mm")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Account Name</label>
        <Input {...register("account_name")} required />
      </div>

      <div>
        <label className="text-sm font-medium">Account No</label>
        <Input {...register("account_number")} required />
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

      {/* SUBMIT */}
      <Button type="submit" className="w-full">
        {editData ? "Update" : "Create"}
      </Button>
    </form>
  );
}