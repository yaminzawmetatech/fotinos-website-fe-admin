// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRef, useState } from "react";
// import Image from "next/image";

// export default function OurServiceForm({ form, onSubmit }: any) {
//   const { register, handleSubmit } = form;

//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const fileRef = useRef<HTMLInputElement>(null);

//   const submitHandler = (data: any) => {
//     const formData = new FormData();

//     formData.append("name_en", data.name_en);
//     formData.append("name_mm", data.name_mm);
//     formData.append("description_en", data.description_en);
//     formData.append("description_mm", data.description_mm);
//     formData.append("type", data.type);

//     if (image) {
//       formData.append("image", image);
//     }

//     onSubmit(formData);
//   };

//   // handle file select
//   const handleFile = (file: File) => {
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   return (
//     <form onSubmit={handleSubmit(submitHandler)} className="p-1 space-y-4">

//       {/* NAME EN */}
//       <div>
//         <label className="text-sm font-medium">Name (EN)</label>
//         <Input {...register("name_en")} required />
//       </div>

//       {/* NAME MM */}
//       <div>
//         <label className="text-sm font-medium">Name (MM)</label>
//         <Input {...register("name_mm")} required />
//       </div>

//       {/* DESC EN */}
//       <div>
//         <label className="text-sm font-medium">Description (EN)</label>
//         <Input
//           {...register("description_en")}
//           className="h-24 items-start !py-3"
//         />
//       </div>

//       {/* DESC MM */}
//       <div>
//         <label className="text-sm font-medium">Description (MM)</label>
//         <Input
//           {...register("description_en")}
//           className="h-24 items-start !py-3"
//         />
//       </div>

//       {/* TYPE */}
//       <div>
//         <label className="text-sm font-medium">Type</label>
//         <Input {...register("type")} required />
//       </div>

//       <div>
//         <label className="text-sm font-medium">Image</label>

//         <div
//           onClick={() => fileRef.current?.click()}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => {
//             e.preventDefault();
//             const file = e.dataTransfer.files?.[0];
//             if (file) handleFile(file);
//           }}
//           className="mt-2 relative border-2 border-dashed border-orange-300 rounded-2xl p-6 cursor-pointer hover:bg-orange-50 transition flex flex-col items-center justify-center min-h-[180px]"
//         >
//           {/* EMPTY STATE */}
//           {!preview && (
//             <>
//               <p className="text-sm text-gray-500">
//                 Drag & Drop or Click to upload image
//               </p>
//             </>
//           )}

//           {/* PREVIEW INSIDE BOX */}
//           {preview && (
//             <div className="relative w-full h-40">
//               <Image
//                 src={preview}
//                 alt="preview"
//                 fill
//                 className="rounded-xl object-cover"
//               />

//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setImage(null);
//                   setPreview(null);
//                 }}
//                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
//               >
//                 ✕
//               </button>
//             </div>
//           )}

//           <Input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) handleFile(file);
//             }}
//           />
//         </div>
//       </div>

//       {/* SUBMIT */}
//       <Button
//         type="submit"
//         className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
//       >
//         Save
//       </Button>
//     </form>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export default function OurServiceForm({
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
      setPreview(editData.image); // 👈 Laravel image URL
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
    setPreview(URL.createObjectURL(file)); // 👈 local preview
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  // =========================
  // SUBMIT
  // =========================
  const submitHandler = (data: any) => {
    const formData = new FormData();

    formData.append("name_en", data.name_en);
    formData.append("name_mm", data.name_mm);
    formData.append("description_en", data.description_en);
    formData.append("description_mm", data.description_mm);
    formData.append("type", data.type);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 p-1">

      {/* NAME EN */}
      <div>
        <label className="text-sm font-medium">Name (EN)</label>
        <Input {...register("name_en")}  />
      </div>

      {/* NAME MM */}
      <div>
        <label className="text-sm font-medium">Name (MM)</label>
        <Input {...register("name_mm")} required />
      </div>

      {/* DESCRIPTION EN */}
      <div>
        <label className="text-sm font-medium">Description (EN)</label>
        <Input
          {...register("description_en")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* DESCRIPTION MM */}
      <div>
        <label className="text-sm font-medium">Description (MM)</label>
        <Input
          {...register("description_mm")}
          className="h-24 !items-start !py-3"
        />
      </div>

      {/* TYPE */}
      <div>
        <label className="text-sm font-medium">Type</label>
        <Input {...register("type")} required />
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