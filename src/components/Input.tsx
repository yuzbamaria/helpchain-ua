import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelTooltip?: React.ReactNode;
  inputIcon?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Universal Input component for text-based form fields.
 *
 * This component supports:
 * - Optional label text (`label`)
 * - Tooltip icon next to the label (`labelTooltip`)
 * - Custom icon inside the input field on the right (`inputIcon`)
 * - Full customization via native input props (`...rest`)
 *
 * 🧠 Use cases:
 * - `label` only — regular input
 * - `label` + `labelTooltip` — when extra explanation is needed in label
 * - `inputIcon` — when an icon or help tooltip is needed inside the input itself
 *
 * @example
 * <Input
 *   label="First Name"
 *   placeholder="Enter your first name"
 *   name="firstName"
 *   value={form.firstName}
 *   onChange={handleChange}
 * />
 *
 * @example With Tooltip:
 * <Input
 *   label="Age"
 *   placeholder="Enter your age"
 *   name="age"
 *   type="number"
 *   value={form.age}
 *   onChange={handleChange}
 *   labelTooltip={
 *     <TooltipIcon message="Used to recommend opportunities and training relevant for you." />
 *   }
 * />
 *
 * @example With icon inside input:
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   name="email"
 *   type="email"
 *   value={form.email}
 *   onChange={handleChange}
 *   inputIcon={<MailIcon />}
 * />
 * @param {string} [label] - The label text shown above the input.
 * @param {ReactNode} [labelTooltip] - An optional tooltip displayed next to the label.
 * @param {ReactNode} [inputIcon] - An optional icon rendered inside the input on the right side.
 * @param {string} [containerClassName] - Optional custom class for the container.
 * @param {string} [className] - Optional custom class for the input element itself.
 * @param {...InputHTMLAttributes<HTMLInputElement>} rest - All native input props like `name`, `value`, `onChange`, etc.
 *
 * @returns {JSX.Element} A styled input element with optional label and icons.
 */

const Input: React.FC<InputProps> = ({
  label,
  labelTooltip,
  inputIcon,
  containerClassName = "",
  className = "",
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <div className="flex items-center gap-2 mb-1">
          <label
            htmlFor={rest.name}
            className="text-base font-bold text-gray-900"
          >
            {label}
          </label>
          {labelTooltip}
        </div>
      )}
      <div className="relative w-full">
        <input
          {...rest}
          className={`w-full rounded-md border bg-white border-gray-300 px-4 py-2 ${
            inputIcon ? "pr-10" : ""
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
        />
        {inputIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto">
            {inputIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
