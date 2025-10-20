"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckMark } from "@/icons";

interface SelectInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectInput({
  label,
  options,
  name,
  placeholder,
  value,
  onChange,
  ...rest
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = value || "";

  function handleDropdownOpen() {
    setIsOpen(!isOpen);
  }

  function handleSelectReason(option: string) {
    if (onChange) onChange(option);
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-karla font-normal text-base text-gray-900">
        {label}
      </label>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected} className="shadow-xs" />

      {/* Input-like button */}
      <div className="flex">
        <button
          type="button"
          {...rest}
          className={`flex items-center justify-between appearance-none w-full bg-white h-11 border rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-3 border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300 shadow-xs
            ${selected ? "text-gray-900" : "text-gray-500"}`}
          onClick={handleDropdownOpen}
        >
          <div>{selected || placeholder}</div>
          <div>{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
        </button>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <ul className="bg-white border rounded-lg border-gray-100">
          {options?.map((opt) => (
            <li
              key={opt}
              className="flex items-center justify-between py-2.5 px-3.5"
              onClick={() => handleSelectReason(opt)}
            >
              {opt}
              {selected === opt && <CheckMark />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
