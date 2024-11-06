import type { Meta, StoryObj } from "@storybook/react";
import PageHomeSidebarHeader from "./header.tsx";

const meta: Meta<typeof PageHomeSidebarHeader> = {
  title: "Home Sidebar Header",
  component: PageHomeSidebarHeader,
};

export default meta;
type Story = StoryObj<typeof PageHomeSidebarHeader>;

export const Primary: Story = {
  args: {},
};
