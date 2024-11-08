import type { RealChat } from "@/types";
import { Flex, Skeleton, Text, Title } from "@mantine/core";
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
      <Title order={5}>
        {(conversation && conversation.summary) || <Skeleton h={20} w={128} />}
      </Title>
    </Flex>
  );
}
