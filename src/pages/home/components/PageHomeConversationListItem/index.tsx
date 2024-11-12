import type { RealChat } from "@/types";
import {
  Flex,
  Text,
  UnstyledButton,
  type UnstyledButtonProps,
} from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";

export type PageHomeConversationListItemProps = UnstyledButtonProps & {
  isActive?: boolean;
  onClick: () => void;
  conversation?: RealChat.Conversation;
};

export default function PageHomeConversationListItem({
  isActive,
  conversation,
  ...props
}: PageHomeConversationListItemProps) {
  return (
    <UnstyledButton
      className={clsx(
        `border-0 border-b-2 border-[var(--mantine-color-gray-4)]`,
        `hover:bg-[var(--mantine-color-gray-1)] focus:bg-[var(--mantine-color-gray-1)]`,
        `focus:outline-[var(--mantine-color-black)]`,
        `rounded-xl`,
        { "bg-[var(--mantine-color-gray-2)]": isActive }
      )}
      p={"md"}
      {...props}
    >
      <Flex direction={`column`} gap={""}>
        <Text size="sm" fw={"500"} lineClamp={2}>
          {conversation ? conversation.summary : `Untitled conversation`}
        </Text>
        <Flex gap={"md"}>
          <Text size="xs" fw={"300"} c={"gray.5"}>
            {conversation && dayjs(conversation.createdAt).fromNow(true)}
          </Text>
          <Text size="xs" fw={"300"} c={"gray.5"}>
            Model
          </Text>
        </Flex>
      </Flex>
    </UnstyledButton>
  );
}
