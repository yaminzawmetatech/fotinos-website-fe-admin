"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useOurServices } from "@/hook/useOurServices";
import FormSelect from "../common/FormSelect";
import { toBase64 } from "@/lib/file";
import { usePlans } from "@/hook/usePlans";
import { useUsers } from "@/hook/useUsers";
import { usePaymentMethods } from "@/hook/usePaymentMethods";

const ORDER_STATUS_OPTIONS = [
  { id: "PENDING", name: "PENDING" },
  { id: "SUBMIT", name: "SUBMIT" },
  { id: "CANCELLED", name: "CANCELLED" },
  { id: "CONFIRMED", name: "CONFIRMED" },
];


export default function OrderForm({ form, onSubmit, editData }: any) {
  const { register, handleSubmit, reset, control } = form;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const { paymentMethods, isLoading } = usePaymentMethods();
  const { plans, isLoading: planLoading } = usePlans();
  const { users, isLoading: userLoading } = useUsers();

  // Format array payload into simple standard options
  const planOptions = (plans || []).map((plan: any) => ({
    id: plan.id,
    name: plan.name_en,
  }));

  const userOptions = (users || []).map((user: any) => ({
    id: user.id,
    name: user.name,
  }));

  // Format array payload into simple standard options
  const paymentMethodOptions = (paymentMethods || []).map((payment_method: any) => ({
    id: payment_method.id,
    name: payment_method.name_en,
  }));

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset();
    }
  }, [editData, reset]);

  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file)); // local preview
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const submitHandler = async (data: any) => {

    let base64Image = null;

    if (image) {
      base64Image = await toBase64(image);
    }

    const payload = {
      plan_id: data.plan_id,
      user_id: data.user_id, //data.user_id
      total_amount: data.total_amount,
      status: data.status,
      payment_method_id: data.payment_method_id,
      screenshot_image_url: base64Image,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">
      {/* Plan Selection */}
      <FormSelect
        name="plan_id"
        control={control}
        options={planOptions}
        label="Plan"
        rules={{ required: "Plan is required" }}
      />

      {/* User Selection */}
      <FormSelect
        name="user_id"
        control={control}
        options={userOptions}
        label="User"
        rules={{ required: "User is required" }}
      />

      {/* Total Amount */}
      <div>
        <label className="text-sm font-medium block mb-1">Total Amount</label>
        <Input {...register("total_amount")} required />
      </div>

      {/* Status Selection */}
      <FormSelect
        name="status"
        control={control}
        options={ORDER_STATUS_OPTIONS}
        label="Stauts"
        rules={{ required: "Status is required" }}
      />


      {/* User Selection */}
      <FormSelect
        name="payment_method_id"
        control={control}
        options={paymentMethodOptions}
        label="Payment Method"
        rules={{ required: "Payment Method is required" }}
      />

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
        {editData ? "Update Order" : "Create Order"}
      </Button>
    </form>
  );
}