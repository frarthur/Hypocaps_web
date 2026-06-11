import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WikiTooltip from "../../components/atoms/WikiTooltip";

const meta: Meta<typeof WikiTooltip> = {
  title: "Atoms/WikiTooltip",
  component: WikiTooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WikiTooltip>;

export const Default: Story = {
  args: {
    children: "diabète de type 1",
    title: "Diabète de type 1",
    description:
      "Le diabète de type 1 est une maladie auto-immune où le pancréas ne produit plus d'insuline. Il représente environ 10% des cas de diabète.",
    url: "https://fr.wikipedia.org/wiki/Diab%C3%A8te_de_type_1",
  },
};

export const English: Story = {
  args: {
    children: "LADA diabetes",
    title: "LADA (Latent Autoimmune Diabetes in Adults)",
    description:
      "LADA is a form of diabetes that shares features of both type 1 and type 2 diabetes. It progresses more slowly than classic type 1.",
    url: "https://en.wikipedia.org/wiki/Latent_autoimmune_diabetes_in_adults",
  },
};
