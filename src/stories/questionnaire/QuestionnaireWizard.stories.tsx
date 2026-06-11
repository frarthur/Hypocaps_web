import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QuestionnaireWizard } from "../../components/questionnaire/QuestionnaireWizard";

const meta: Meta<typeof QuestionnaireWizard> = {
  title: "Questionnaire/QuestionnaireWizard",
  component: QuestionnaireWizard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionnaireWizard>;

export const Français: Story = {
  args: {
    lang: "fr",
  },
};

export const English: Story = {
  args: {
    lang: "en",
  },
};
