import type { Meta, StoryObj } from "@storybook/react";
import ImageBlock from "../../components/blocks/ImageBlock";

const meta: Meta<typeof ImageBlock> = {
  title: "Blocks/ImageBlock",
  component: ImageBlock,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageBlock>;

export const Default: Story = {
  args: {
    url: "https://placehold.co/800x400/EEE/31343C?text=Hypocaps",
    altText: "Placeholder image",
  },
};

export const Rounded: Story = {
  args: {
    url: "https://placehold.co/200x200/EEE/31343C?text=Avatar",
    altText: "Avatar",
    styles: {
      self: {
        borderRadius: "full",
      },
    },
  },
};
