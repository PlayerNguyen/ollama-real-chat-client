import ConversationBubble from "@/shared/components/ConversationBubble";
import type { RealChat } from "@/types";
import { Center, Flex, Text } from "@mantine/core";
import { IconRobotFace, IconUser } from "@tabler/icons-react";
import clsx from "clsx";
import { marked } from "marked";
import { useEffect, useRef } from "react";

export type PageHomeConversationContentMessagesProps = {
  conversation?: RealChat.Conversation;
};

export default function PageHomeConversationContentMessages({
  conversation,
}: PageHomeConversationContentMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Scroll to the bottom
     * if remain bottom
     */
    console.log(`scroll to bottom`);
    if (containerRef.current !== null) {
      /**
       * Scroll as init
       */
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation, containerRef]);

  return (
    <Flex
      ref={containerRef}
      direction={"column"}
      className={clsx(`flex-1 overflow-y-auto`)}
      bg={"gray.2"}
      p={"xl"}
      gap={"md"}
    >
      {/* TODO: add messages information */}
      {(conversation &&
        conversation.messages.length > 0 &&
        conversation.messages.map((message) => {
          if (message.role === "user") {
            return (
              <ConversationBubble
                title={`User`}
                icon={
                  <IconUser size={12} color="var(--mantine-color-gray-6)" />
                }
                direction="end"
                key={message.id}
                isLoading={false}
                content={<>{message.content}</>}
                width="200px"
              />
            );
          }

          return (
            <ConversationBubble
              title="Bot"
              icon={
                <IconRobotFace size={18} direction={"start"} key={message.id} />
              }
              isLoading={false}
              content={
                <div
                  className={clsx(`prose`)}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(message.content),
                  }}
                ></div>
              }
            />
          );
        })) || (
        <Center h={"100%"} c={"gray.6"}>
          <Text size={"xl"} fw={300}>
            Nothing was started
          </Text>
          {/* TODO: add suggestion pills */}
        </Center>
      )}
    </Flex>
  );
}
