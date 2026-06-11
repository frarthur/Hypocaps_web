import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Action from "../../components/atoms/Action";

const meta: Meta<typeof Action> = {
  title: "Atoms/Action",
  component: Action,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    style: { control: "select", options: ["primary", "secondary"] },
    iconPosition: { control: "select", options: ["left", "right"] },
    showIcon: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Action>;

export const ButtonPrimary: Story = {
  args: {
    label: "Commencer",
    url: "#",
    style: "primary",
    __metadata: { modelName: "Button" },
  },
};

export const ButtonSecondary: Story = {
  args: {
    label: "En savoir plus",
    url: "#",
    style: "secondary",
    __metadata: { modelName: "Button" },
  },
};

export const LinkPrimary: Story = {
  args: {
    label: "Voir les tarifs",
    url: "#",
    style: "primary",
    __metadata: { modelName: "Link" },
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "Télécharger",
    url: "#",
    icon: "arrow-down",
    showIcon: true,
    iconPosition: "left",
    __metadata: { modelName: "Button" },
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Suivant",
    url: "#",
    icon: "arrow-right",
    showIcon: true,
    __metadata: { modelName: "Button" },
  },
};

export const ExternalLink: Story = {
  args: {
    label: "Nous contacter",
    url: "mailto:contact@hypocaps.fr",
    __metadata: { modelName: "Link" },
  },
};
