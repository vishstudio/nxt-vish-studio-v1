import { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
}

const fieldClassName = "w-full rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 font-sans text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-vish-accent focus:bg-white/[0.045]";

export function FormField({ id, label, value, onChange, type = "text", placeholder, hint, required, multiline, autoComplete }: FormFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);

  return (
    <div>
      <label htmlFor={id} className="mb-3 block font-sans text-sm font-medium text-white">
        {label}{required ? <span className="ml-1 text-vish-accent">*</span> : null}
      </label>
      {hint ? <p className="mb-3 font-sans text-sm leading-relaxed text-gray-500">{hint}</p> : null}
      {multiline ? (
        <textarea id={id} value={value} onChange={handleChange} placeholder={placeholder} required={required} rows={5} className={`${fieldClassName} resize-y`} />
      ) : (
        <input id={id} value={value} onChange={handleChange} type={type} placeholder={placeholder} required={required} autoComplete={autoComplete} className={fieldClassName} />
      )}
    </div>
  );
}
