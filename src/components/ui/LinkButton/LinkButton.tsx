import { ReactNode } from "react";

interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: "md";
  variant: "left" | "right";
  type: "button" | "submit" | "reset";
  state: "normal" | "hover" | "pressed";
  onClick?: () => void;
  ariaLabel?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const sizeClasses = {
  md: "px-4 py-2 text-md",
};

const variantClasses = {
  left: {
    normal: "text-primary-500",
    hover: "text-primary-700",
    pressed: "text-primary-900",
  },
  right: {
    normal: "text-primary-500",
    hover: "text-primary-700",
    pressed: "text-primary-900",
  },
};

export default function LinkButton({
  children,
  size = "md",
  variant = "left",
  type = "button",
  state = "normal",
  onClick,
  ariaLabel,
  iconLeft,
  iconRight,
  ...props
}: LinkButtonProps) {
  const baseClasses = `
        flex items-center gap-2 bg-white font-karla font-bold hover:cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant][state] || variantClasses[variant].normal}
    `;

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={baseClasses}
      {...props}
    >
      {iconLeft && <span data-testid="left-icon">{iconLeft}</span>}
      {children}
      {iconRight && <span data-testid="right-icon">{iconRight}</span>}
    </button>
  );
}
