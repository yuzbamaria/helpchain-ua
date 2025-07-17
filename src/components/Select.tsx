import React, { useState, useRef, useEffect } from "react";
// import TooltipIcon from "./TooltipIcon";
import DownArrowIcon from "@/icons/DownArrow";
import UpArrowIcon from "@/icons/UpArrow";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  name: string;
  label?: string;
  labelTooltip?: React.ReactNode;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

/**
 * Universal Select (dropdown) component.
 *
 * This component supports:
 * - Custom label text (`label`)
 * - Tooltip next to the label (`labelTooltip`)
 * - Customizable dropdown options (`options`)
 * - Built-in toggle icons (Down/Up arrow)
 *
 * 🧠 Use cases:
 * - Gender, category, or role selection in forms.
 * - When a tooltip explanation is needed alongside the label.
 *
 * @example
 * <Select
 *   name="gender"
 *   label="Gender"
 *   value="female"
 *   onChange={handleChange}
 *   labelTooltip={<TooltipIcon message="Used for inclusive hiring." />}
 *   options={[
 *     { label: "Select gender", value: "" },
 *     { label: "Male", value: "male" },
 *     { label: "Female", value: "female" },
 *     { label: "Other", value: "other" },
 *   ]}
 * />
 *
 * @param {string} name - Name of the field.
 * @param {string} value - Selected value.
 * @param {function} onChange - Change handler.
 * @param {Array<{ label: string, value: string }>} options - Array of dropdown options.
 * @param {string} [label] - Optional label text above the select.
 * @param {ReactNode} [labelTooltip] - Optional tooltip next to the label.
 * @param {string} [placeholder] - Optional placeholder shown as first disabled option.
 * @param {string} [className] - Optional class for the select element.
 *
 * @returns {JSX.Element} A styled select dropdown with label and optional tooltip.
 */

const Select: React.FC<SelectProps> = ({
  name,
  label,
  labelTooltip,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div className="w-full" ref={selectRef}>
      {label && (
        <div className="flex items-center gap-2 mb-1">
          <label htmlFor={name} className="text-base font-bold text-gray-900">
            {label}
          </label>
          {labelTooltip}
        </div>
      )}

      <div
        className="relative border rounded-md bg-white border-gray-300 px-4 py-2 cursor-pointer focus-within:ring-2 focus-within:ring-gray-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`text-base ${value ? "text-gray-900" : "text-gray-500"}`}
        >
          {selectedLabel || placeholder}
        </span>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {open ? <UpArrowIcon /> : <DownArrowIcon />}
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md border border-gray-200 rounded-md mt-1 z-10">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  const fakeEvent = {
                    target: { name, value: option.value },
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onChange(fakeEvent);
                  setOpen(false);
                }}
                className={`px-4 py-2 hover:bg-primary-100 text-base cursor-pointer ${
                  value === option.value
                    ? "bg-primary-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
