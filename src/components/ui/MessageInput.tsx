interface MessageInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id?: string;
  value: string;
  icon?: React.ReactNode;
  name?: string;
  error?: string;
  touched?: boolean;
  onIconButtonClick?: () => void;
}

export default function MessageInput({
  label,
  id,
  value,
  icon,
  error,
  touched,
  name = "text",
  onIconButtonClick,
  ...rest
}: MessageInputProps) {
  return (
    <div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="flex items-center gap-1.5">
          {label} {icon && <span className="cursor-pointer">{icon}</span>}
        </label>
        <textarea
          id={id}
          name={name}
          value={value}
          className={`w-full rounded-lg border px-4 py-3 bg-white placeholder-gray-500 text-gray-900 font-medium focus:outline-none focus:ring-3 shadow-xs
            ${
              touched && error
                ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
            }
          `}
          {...rest}
        />
      </div>
    </div>
  );
}
