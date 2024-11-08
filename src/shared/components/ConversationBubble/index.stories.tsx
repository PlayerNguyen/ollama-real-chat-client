import { Skeleton } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import { IconRobot } from "@tabler/icons-react";
import IndexElement from ".";

const meta = {
  title: "Conversation Bubble",
  component: IndexElement,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof IndexElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: "start",
    isLoading: false,
  },
};

export const EndPosition: Story = {
  args: {
    direction: "end",
    isLoading: false,
  },
};

export const Loading: Story = {
  name: "Loading",
  args: {
    direction: "start",
    isLoading: true,
  },
};

export const WithIcon: Story = {
  name: "With icon",
  args: {
    direction: "start",
    isLoading: false,
    title: "Bot",
    icon: <IconRobot />,
  },
};

export const BotResponding: Story = {
  name: "Bot Responding",
  args: {
    direction: "start",
    isLoading: false,
    title: "Bot",
    icon: <IconRobot />,
    content: (
      <Skeleton>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores rerum,
        modi eum minima reiciendis quod delectus harum et sint velit ea. Earum
        aliquid animi sunt temporibus voluptatibus et dolore cupiditate.
      </Skeleton>
    ),
  },
};
