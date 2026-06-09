"use client";

import { Field, ValidationError } from "../../lib/questionnaire/types";

interface FieldRendererProps {
  field: Field;
  value: string | string[];
  error: ValidationError | null;
  onChange: (id: string, value: string | string[]) => void;
}

export function FieldRenderer({ field, value, error, onChange }: FieldRendererProps) {
  const baseClass =
    "w-full rounded-lg border bg-white px-4 py-3 text-dark placeholder-dark/50 transition focus:outline-none focus:ring-2 focus:ring-primary/50";
  const errorClass = error ? "border-red-500 ring-1 ring-red-500" : "border-neutralAlt";

  switch (field.type) {
    case "text":
    case "email":
      return (
        <div>
          <label
            htmlFor={field.id}
            className="mb-1.5 block font-medium text-dark"
          >
            {field.label}
          </label>
          <input
            id={field.id}
            type={field.type}
            value={(value as string) || ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${baseClass} ${errorClass}`}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div>
          <label
            htmlFor={field.id}
            className="mb-1.5 block font-medium text-dark"
          >
            {field.label}
          </label>
          <select
            id={field.id}
            value={(value as string) || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${baseClass} ${errorClass}`}
          >
            <option value="" disabled>
              {field.placeholder || "Sélectionnez..."}
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      );

    case "checkbox": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <fieldset>
          <legend className="mb-1.5 block font-medium text-dark">
            {field.label}
          </legend>
          <div className="space-y-2">
            {field.options.map((opt) => {
              const checked = selected.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutralAlt px-4 py-3 transition hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? selected.filter((s) => s !== opt)
                        : [...selected, opt];
                      onChange(field.id, next);
                    }}
                    className="h-4 w-4 rounded border-neutralAlt text-primary focus:ring-primary"
                  />
                  <span className="text-dark">{opt}</span>
                </label>
              );
            })}
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </fieldset>
      );
    }

    case "textarea":
      return (
        <div>
          <label
            htmlFor={field.id}
            className="mb-1.5 block font-medium text-dark"
          >
            {field.label}
          </label>
          <textarea
            id={field.id}
            value={(value as string) || ""}
            placeholder={field.placeholder}
            rows={4}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${baseClass} ${errorClass} resize-y`}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      );

    default:
      return null;
  }
}
