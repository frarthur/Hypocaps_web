import { Field, ValidationError } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field: Field, value: string | string[]): ValidationError | null {
  if (!field.validation) return null;

  for (const rule of field.validation) {
    switch (rule.type) {
      case "required":
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return { fieldId: field.id, message: rule.message };
        }
        break;
      case "email":
        if (typeof value === "string" && value && !EMAIL_RE.test(value)) {
          return { fieldId: field.id, message: rule.message };
        }
        break;
      case "minLength":
        if (typeof value === "string" && value.length < rule.value) {
          return { fieldId: field.id, message: rule.message };
        }
        break;
    }
  }

  return null;
}

export function validateStep(
  fields: Field[],
  answers: Record<string, string | string[]>
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    if (field.showIf && !field.showIf(answers)) continue;
    const value = answers[field.id];
    const error = validateField(field, value);
    if (error) errors.push(error);
  }

  return errors;
}
