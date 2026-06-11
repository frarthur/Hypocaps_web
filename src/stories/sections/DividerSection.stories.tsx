import type { Meta, StoryObj } from "@storybook/react";
import DividerSection from "../../components/sections/DividerSection";

const meta: Meta<typeof DividerSection> = {
  title: "Sections/DividerSection",
  component: DividerSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DividerSection>;

export const Default: Story = {
  args: {},
};
