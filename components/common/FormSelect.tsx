"use client";

import Select from "react-select";
import { Controller, Control } from "react-hook-form";

type OptionType = {
  id: string | number;
  name: string;
};

type Props = {
  name: string;
  control: Control<any>;
  options: OptionType[];
  label?: string;
  rules?: any;
  getOptionLabel?: (o: OptionType) => string;
  getOptionValue?: (o: OptionType) => string | number;
};

export default function FormSelect({
  name,
  control,
  options,
  label,
  rules,
  getOptionLabel = (o) => o.name,
  getOptionValue = (o) => o.id,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select
              options={options}
              getOptionLabel={(o) => o.name}
              getOptionValue={(o) => String(o.id)}
              value={
                options.find((o) => String(o.id) === String(field.value)) ||
                null
              }
              onChange={(selected) =>
                field.onChange(selected ? String(selected.id) : null)
              }

              // ShadCN-like styling
              className="react-select-container"
              classNamePrefix="react-select"

              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  borderColor: fieldState.error 
                    ? "rgb(239 68 68)" // destructive red border
                    : state.isFocused 
                    ? "rgb(226 232 240)" 
                    : "rgb(226 232 240)", // border-input
                  boxShadow: state.isFocused
                  ? "0 0 0 2px rgb(255 255 255), 0 0 0 4px rgb(203 213 225)"
                  : "none",
                  transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                  "&:hover": {
                    borderColor: fieldState.error ? "rgb(239 68 68)" : "rgb(203 213 225)",
                  },
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "0 12px",
                  fontSize: "14px", // text-sm
                }),

                singleValue: (base) => ({
                  ...base,
                  color: "rgb(15 23 42)", // text-foreground
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "rgb(148 163 184)", // text-muted-foreground
                  fontSize: "14px",
                }),

                dropdownIndicator: (base, state) => ({
                  ...base,
                  color: "rgb(148 163 184)",
                  padding: "0 8px",
                  transition: "transform 0.2s ease",
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
                  "&:hover": {
                    color: "rgb(15 23 42)",
                  },
                }),

                indicatorSeparator: () => ({
                  display: "none",
                }),

                menuPortal: (base) => ({
                  ...base, 
                  zIndex: 9999 
                }),

                menu: (base) => ({
                  ...base,
                  borderRadius: "6px",
                  border: "1px solid rgb(226 232 240)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // shadow-md
                  backgroundColor: "white",
                  overflow: "hidden",
                  padding: "4px",
                }),

                option: (base, state) => ({
                  ...base,
                  borderRadius: "4px",
                  fontSize: "14px",
                  padding: "8px 12px",
                  margin: "2px 0",
                  backgroundColor: state.isSelected
                    ? "rgb(241 245 249)" // bg-accent/slate-100
                    : state.isFocused
                    ? "rgb(248 250 252)" // subtle hover accent
                    : "transparent",
                  color: "rgb(15 23 42)", // text-foreground
                  cursor: "pointer",
                  "&:active": {
                    backgroundColor: "rgb(241 245 249)",
                  },
                }),
              }}
            />

            {fieldState.error && (
              <p className="text-red-500 text-xs">
                {fieldState.error.message || "This field is required"}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}




// "use client";

// import Select from "react-select";
// import { Controller, Control } from "react-hook-form";

// type OptionType = {
//   id: string | number;
//   name: string;
// };

// type Props = {
//   name: string;
//   control: Control<any>;
//   options: OptionType[];
//   label?: string;
//   rules?: any;
// };

// export default function FormSelect({
//   name,
//   control,
//   options,
//   label,
//   rules,
// }: Props) {
//   return (
//     <div className="flex flex-col gap-2">
//       {label && (
//         <label className="text-sm font-medium text-foreground">
//           {label}
//         </label>
//       )}

//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field, fieldState }) => (
//           <>
//             <Select
//               options={options}
//               getOptionLabel={(o) => o.name}
//               getOptionValue={(o) => String(o.id)}
//               value={
//                 options.find((o) => String(o.id) === String(field.value)) ||
//                 null
//               }
//               onChange={(selected) =>
//                 field.onChange(selected ? String(selected.id) : null)
//               }

//               // ✅ IMPORTANT: ShadCN-like styling
//               className="react-select-container"
//               classNamePrefix="react-select"

//               styles={{
//                 control: (base, state) => ({
//                   ...base,
//                   minHeight: "40px",
//                   borderRadius: "8px",
//                   borderColor: state.isFocused ? "#000" : "#e2e8f0",
//                   boxShadow: state.isFocused ? "0 0 0 1px black" : "none",
//                   "&:hover": {
//                     borderColor: "#cbd5e1",
//                   },
//                 }),

//                 valueContainer: (base) => ({
//                   ...base,
//                   padding: "0 12px",
//                 }),

//                 placeholder: (base) => ({
//                   ...base,
//                   color: "#94a3b8",
//                 }),

//                 dropdownIndicator: (base) => ({
//                   ...base,
//                   padding: "0 10px",
//                 }),

//                 indicatorSeparator: () => ({
//                   display: "none",
//                 }),

//                 menu: (base) => ({
//                   ...base,
//                   borderRadius: "8px",
//                   overflow: "hidden",
//                 }),

//                 option: (base, state) => ({
//                   ...base,
//                   backgroundColor: state.isSelected
//                     ? "#0f172a"
//                     : state.isFocused
//                     ? "#f1f5f9"
//                     : "white",
//                   color: state.isSelected ? "white" : "black",
//                   cursor: "pointer",
//                 }),
//               }}
//             />

//             {fieldState.error && (
//               <p className="text-red-500 text-xs">
//                 {fieldState.error.message || "This field is required"}
//               </p>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );
// }