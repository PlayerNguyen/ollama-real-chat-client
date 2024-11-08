import type { Meta, StoryObj } from "@storybook/react";
import PageHomeConversationListItem from ".";

const meta: Meta<typeof PageHomeConversationListItem> = {
  title: "Home Coversation List Item",
  component: PageHomeConversationListItem,
};

export default meta;
type Story = StoryObj<typeof PageHomeConversationListItem>;

export const NotActive: Story = {
  name: "Not Active",
  args: {
    isActive: false,
  },
};

export const Active: Story = {
  name: "Active",
  args: {
    isActive: true,
  },
};
