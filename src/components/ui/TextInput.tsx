"use client";
import { useState } from "react";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  touched?: boolean;
  showIconButton?: boolean;
  onIconButtonClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function TextInput({
  label,
  error,
  touched,
  helperText,
  showIconButton = false,
  onIconButtonClick,
  icon,
  type = "text",
  onFocus,
  onBlur,
  ...rest
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const showHelper = isFocused && helperText && !error;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-karla font-normal text-base text-gray-900">
        {label}
        {/* {required && <span className="ml-1 text-error-500">*</span>} */}
      </label>
      <div className="relative">
        <input
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full h-11 rounded-lg border px-4 py-3 bg-white placeholder-gray-500 text-gray-900 font-medium focus:outline-none focus:ring-3
            ${
              touched && error
                ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
            }
          `}
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
      {error && !isFocused && (
        <p className="mt-1 font-karla text-sm text-error-500">{error}</p>
      )}

      {showHelper && (
        <p className="mt-1 font-karla text-sm text-gray-500 max-w-lg">
          {helperText}
        </p>
      )}
    </div>
  );
}
