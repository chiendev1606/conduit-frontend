interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  extra?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

export function FormTextarea({
  label,
  name,
  placeholder,
  error,
  extra,
  onChange,
  value,
  ...rest
}: Readonly<FormTextareaProps>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {extra}
      </div>
      <textarea
        value={value}
        onChange={onChange}
        id={name}
        placeholder={placeholder}
        spellCheck={false}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        {...rest}
      />
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
}
