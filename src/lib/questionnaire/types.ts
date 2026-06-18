export type FieldType = "text" | "email" | "select" | "checkbox" | "textarea";

export type ShowIfFn = (_answers: Record<string, string | string[]>) => boolean;

export type ValidationRule =
  | { type: "required"; message: string }
  | { type: "email"; message: string }
  | { type: "minLength"; value: number; message: string };

export interface SelectOption {
  value: string;
  label: string;
}

export interface BaseField {
  id: string;
  label: string | ((_answers: Record<string, string | string[]>) => string);
  showIf?: ShowIfFn;
  validation?: ValidationRule[];
  inputMode?: "text" | "numeric" | "email" | "tel";
  pattern?: string;
}

export interface TextField extends BaseField {
  type: "text" | "email";
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options: SelectOption[] | ((_answers: Record<string, string | string[]>) => SelectOption[]);
  placeholder?: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options: SelectOption[];
}

export interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
}

export type Field = TextField | SelectField | CheckboxField | TextareaField;

export interface Step {
  id: string;
  title: string | ((_answers: Record<string, string | string[]>) => string);
  description?: string | ((_answers: Record<string, string | string[]>) => string);
  showIf?: ShowIfFn;
  fields: Field[];
}

export type Questionnaire = Step[];

export interface ValidationError {
  fieldId: string;
  message: string;
}
