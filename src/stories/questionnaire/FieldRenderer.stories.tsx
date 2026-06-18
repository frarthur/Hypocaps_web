import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldRenderer } from "../../components/questionnaire/FieldRenderer";
import type { Field } from "../../lib/questionnaire/types";

const meta: Meta<typeof FieldRenderer> = {
  title: "Questionnaire/FieldRenderer",
  component: FieldRenderer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FieldRenderer>;

const noop = () => {};

export const TextField: Story = {
  args: {
    field: {
      id: "first_name",
      type: "text",
      label: "Prénom",
      placeholder: "Votre prénom",
    } as Field,
    value: "",
    error: null,
    onChange: noop,
  },
};

export const TextFieldFilled: Story = {
  args: {
    field: {
      id: "first_name",
      type: "text",
      label: "Prénom",
      placeholder: "Votre prénom",
    } as Field,
    value: "Marie",
    error: null,
    onChange: noop,
  },
};

export const EmailField: Story = {
  args: {
    field: {
      id: "email",
      type: "email",
      label: "Email",
      placeholder: "vous@exemple.fr",
    } as Field,
    value: "",
    error: null,
    onChange: noop,
  },
};

export const SelectField: Story = {
  args: {
    field: {
      id: "concern_diabetes",
      type: "select",
      label: "Êtes-vous concerné par le diabète ?",
      options: [
        { value: "yes", label: "Oui" },
        { value: "no", label: "Non" },
        { value: "relative", label: "Un proche" },
      ],
    } as Field,
    value: "",
    error: null,
    onChange: noop,
  },
};

export const CheckboxField: Story = {
  args: {
    field: {
      id: "resucrage_problems",
      type: "checkbox",
      label: "Quels types de problèmes rencontrez-vous ?",
      options: [
        { value: "packaging", label: "Usure de l'emballage" },
        { value: "transport", label: "Transport compliqué" },
        { value: "forget", label: "Oubli" },
        { value: "mess", label: "Salissures" },
      ],
    } as Field,
    value: ["transport", "mess"],
    error: null,
    onChange: noop,
  },
};

export const TextareaField: Story = {
  args: {
    field: {
      id: "comment",
      type: "textarea",
      label: "Commentaire",
      placeholder: "Votre message...",
    } as Field,
    value: "",
    error: null,
    onChange: noop,
  },
};

export const WithError: Story = {
  args: {
    field: {
      id: "age",
      type: "text",
      label: "Âge",
      placeholder: "Votre âge",
      inputMode: "numeric",
    } as Field,
    value: "",
    error: { fieldId: "age", message: "Veuillez indiquer votre âge" },
    onChange: noop,
  },
};
