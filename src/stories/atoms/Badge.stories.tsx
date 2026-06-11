import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "../../components/atoms/Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: "Nouveau",
  },
};

export const Primary: Story = {
  args: {
    label: "Promo",
    color: "text-primary",
  },
};

export const Dark: Story = {
  args: {
    label: "Populaire",
    color: "text-dark",
  },
};
