import { ReactNode } from "react";
import { LoadingSpinner } from "@/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: "lg";
  variant: "primary" | "accent";
  type: "button" | "submit" | "reset";
  state: "normal" | "hover" | "pressed" | "disabled" | "loading";
  onClick?: () => void;
  ariaLabel?: string;
}

const sizeClasses = {
  md: "px-4 py-2 text-md",
  lg: "px-6 py-2 text-lg",
};

const variantClasses = {
  primary: {
    normal: "bg-primary-500 text-secondary-25",
    hover: "bg-primary-400 text-secondary-25",
    pressed: "bg-primary-600 text-secondary-25",
    disabled: "bg-gray-100 text-gray-300",
    loading: "bg-primary-500 text-secondary-25",
  },
  accent: {
    normal: "bg-accent-400 text-secondary-25",
    hover: "bg-accent-500 text-secondary-25",
    pressed: "bg-accent-600 text-secondary-25",
    disabled: "bg-gray-100 text-gray-300",
    loading: "bg-accent-400 text-secondary-25",
  },
};

export default function MainButton({
  children,
  size = "lg",
  variant = "primary",
  type = "button",
  state = "normal",
  onClick,
  ariaLabel,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = state === "disabled" || state === "loading" || disabled;
  const baseClasses = `
        flex items-center justify-center gap-2 rounded-lg font-karla font-bold hover:cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant][state] || variantClasses[variant].normal}
    `;

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
      className={baseClasses}
      {...props}
    >
      {children}
      {state === "loading" && (
        <LoadingSpinner
          className="animate-spin w-5 h-5"
          data-testid="spinner"
        />
      )}
    </button>
  );
}
