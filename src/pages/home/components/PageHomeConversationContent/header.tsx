import type { RealChat } from "@/types";
import { Flex, Text, Title } from "@mantine/core";
import clsx from "clsx";

export type PageHomeConversationContentHeaderProps = {
  conversation?: RealChat.Conversation;
};

export default function PageHomeConversationContentHeader({
  conversation,
}: PageHomeConversationContentHeaderProps) {
  return (
    <Flex
      direction={"row"}
      w={"100%"}
      className={clsx(`bg-[var(--mantine-color-gray-0)]`, `p-4`)}
      align={"center"}
      gap={"md"}
      h={"64px"}
    >
      <Text size="xs" c={"gray.6"} fw={600}>
        {(conversation && conversation.id) || "undefined"}
      </Text>
      <Title
        order={5}
        className={clsx(`select-none`)}
        c={conversation && conversation.summary ? "gray.8" : "gray.4"}
      >
        {(conversation && conversation.summary) || "Untitled conversation"}
      </Title>
    </Flex>
  );
}
