import type { Meta, StoryObj } from "@storybook/react";
import TitleBlock from "../../components/blocks/TitleBlock";

const meta: Meta<typeof TitleBlock> = {
  title: "Blocks/TitleBlock",
  component: TitleBlock,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TitleBlock>;

export const Default: Story = {
  args: {
    text: "Section Title",
  },
};

export const Colored: Story = {
  args: {
    text: "Primary Color Title",
    color: "text-primary",
  },
};
