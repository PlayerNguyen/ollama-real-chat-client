import type { Meta, StoryObj } from "@storybook/react";
import PageHomeSidebar from ".";

const meta: Meta<typeof PageHomeSidebar> = {
  title: "Home Sidebar",
  component: PageHomeSidebar,
};

export default meta;
type Story = StoryObj<typeof PageHomeSidebar>;

export const Primary: Story = {
  args: {},
};
