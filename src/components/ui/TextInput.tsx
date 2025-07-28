"use client";
import { useState } from "react";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
  helperText?: string;
  touched?: boolean;
  showIconButton?: boolean;
  onIconButtonClick?: () => void;
}

export default function TextInput({
  label,
  error,
  touched,
  helperText,
  showIconButton = false,
  onIconButtonClick,
  icon,
  className = "",
  type = "text",
  ...rest
}: TextInputProps) {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-karla font-normal text-base text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          className={`w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-3
            ${
              touched && error
                ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
            }
          `}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />
        {showIconButton && (
          <button
            type="button"
            onClick={onIconButtonClick}
            className="absolute right-4 top-4 text-gray-500"
          >
            {icon}
          </button>
        )}
      </div>
      {helperText && isFocused && (
        <p className="mt-1 font-karla text-sm text-gray-500 max-w-lg">{helperText}</p>
      )}
      {touched && error && !isFocused && (
        <p className="text-sm font-karla text-error-500 mt-1">{error}</p>
      )}
    </div>
  );
}
