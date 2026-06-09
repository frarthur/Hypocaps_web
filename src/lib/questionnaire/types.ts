export type FieldType = "text" | "email" | "select" | "checkbox" | "textarea";

export type ShowIfFn = (answers: Record<string, string | string[]>) => boolean;

export type ValidationRule =
  | { type: "required"; message: string }
  | { type: "email"; message: string }
  | { type: "minLength"; value: number; message: string };

export interface BaseField {
  id: string;
  label: string;
  showIf?: ShowIfFn;
  validation?: ValidationRule[];
}

export interface TextField extends BaseField {
  type: "text" | "email";
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options: string[];
  placeholder?: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options: string[];
}

export interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
}

export type Field = TextField | SelectField | CheckboxField | TextareaField;

export interface Step {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

export type Questionnaire = Step[];

export interface ValidationError {
  fieldId: string;
  message: string;
}
