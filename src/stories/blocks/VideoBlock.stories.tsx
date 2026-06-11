import type { Meta, StoryObj } from "@storybook/react";
import VideoBlock from "../../components/blocks/VideoBlock";

const meta: Meta<typeof VideoBlock> = {
  title: "Blocks/VideoBlock",
  component: VideoBlock,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VideoBlock>;

export const YouTube: Story = {
  args: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    aspectRatio: "16:9",
    controls: true,
  },
};

export const Vimeo: Story = {
  args: {
    url: "https://vimeo.com/76979871",
    aspectRatio: "16:9",
  },
};
