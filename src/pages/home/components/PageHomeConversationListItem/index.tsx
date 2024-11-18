import type { RealChat } from "@/types";
import {
  ActionIcon,
  Flex,
  Text,
  UnstyledButton,
  type UnstyledButtonProps,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import dayjs from "dayjs";

export type PageHomeConversationListItemProps = UnstyledButtonProps & {
  isActive?: boolean;
  onClick: () => void;
  onRemove: () => void;
  conversation?: RealChat.Conversation;
};

export default function PageHomeConversationListItem({
  isActive,
  conversation,
  onRemove,
  ...props
}: PageHomeConversationListItemProps) {
  return (
    <UnstyledButton
      component="div"
      tabIndex={0}
      role="button"
      className={clsx(
        `border-0 border-b-2 border-[var(--mantine-color-gray-4)]`,
        `hover:bg-[var(--mantine-color-gray-1)] `,
        `focus:outline-[var(--mantine-color-black)]`,
        `rounded-xl transition-colors ease-in-out select-none`,
        { "bg-[var(--mantine-color-gray-2)]": isActive },
        `group`
      )}
      p={"md"}
      {...props}
    >
      <Flex align={`center`} gap={"xs"}>
        <Flex direction={`column`} gap={"xs"} className={clsx(`flex-1`)}>
          <Text
            size="md"
            fw={"500"}
            lineClamp={2}
            className={clsx(`leading-normal`)}
            c={conversation && conversation.summary ? "gray.8" : "gray.6"}
          >
            {(conversation && conversation.summary) || `Untitled conversation`}
          </Text>
          <div>
            <Text size="xs" fw={"400"} c={"gray.5"}>
              {conversation && dayjs(conversation.createdAt).fromNow(true)}
            </Text>
            <Text size="xs" fw={"400"} c={"gray.5"}>
              {(conversation && conversation.model) || "Unknown model"}
            </Text>
          </div>
        </Flex>
        <ActionIcon
          onClick={onRemove}
          variant="subtle"
          className={clsx(
            `text-transparent group-hover:text-[var(--mantine-color-gray-6)] hover:bg-[var(--mantine-color-gray-3)]`,
            `transition-colors ease-in-out duration-200`
          )}
        >
          <IconX />
        </ActionIcon>
      </Flex>
    </UnstyledButton>
  );
}
