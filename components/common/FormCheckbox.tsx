"use client";

import { Controller, Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;             // Basic single-line text label
  title?: string;             // Bolded main header title
  description?: string;       // Subtext helper description under the title
  rules?: any;
  disabled?: boolean;
};

export default function FormCheckbox({
  name,
  control,
  label,
  title,
  description,
  rules,
  disabled = false,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        // Handle value conversion safely for checkboxes (defaults to boolean false)
        const isChecked = !!field.value;

        return (
          <div className="flex flex-col gap-1 w-full">
            <Field 
              orientation="horizontal" 
              data-disabled={disabled ? "" : undefined}
              className="items-start gap-3 space-y-0"
            >
              <Checkbox
                id={name}
                name={name}
                checked={isChecked}
                onCheckedChange={(checked) => {
                  // Passes true or false back to react-hook-form
                  field.onChange(!!checked);
                }}
                disabled={disabled}
                onBlur={field.onBlur}
                ref={field.ref}
              />

              <FieldContent className="grid gap-1.5 leading-none">
                {/* 1. Render style if it's a bold header layout with subtext descriptions */}
                {title && (
                  <FieldTitle className="text-sm font-medium text-neutral-900">
                    {title}
                  </FieldTitle>
                )}

                {/* 2. Render standard fallback label style */}
                {label && !title && (
                  <FieldLabel htmlFor={name} className="text-sm font-medium text-neutral-900 cursor-pointer">
                    {label}
                  </FieldLabel>
                )}

                {/* Dynamic subtext description helper */}
                {description && (
                  <FieldDescription className="text-sm text-neutral-500">
                    {description}
                  </FieldDescription>
                )}
              </FieldContent>
            </Field>

            {/* Validation error display */}
            {fieldState.error && (
              <p className="text-red-500 text-xs font-medium ml-7">
                {fieldState.error.message || "You must agree to proceed."}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}