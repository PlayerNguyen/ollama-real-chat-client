import ConversationBubble from "@/shared/components/ConversationBubble";
import useLockStreaming from "@/shared/hooks/store/useLockStreaming";
import type { RealChat } from "@/types";
import { Center, Flex, Text } from "@mantine/core";
import { IconRobotFace, IconUser } from "@tabler/icons-react";
import clsx from "clsx";
import htmlParser from "html-react-parser";
import { marked } from "marked";
import { useEffect, useRef, useState } from "react";

/**
 * In pixels, the global scroll offset from bottom
 * define the maximum size that user is scrolling from the
 * scrollTop to (scrollHeight - view offset).
 *
 */
const GLOBAL_SCROLL_OFFSET_FROM_BOTTOM = 130;

export type PageHomeConversationContentMessagesProps = {
  conversation?: RealChat.Conversation;
};

export default function PageHomeConversationContentMessages({
  conversation,
}: PageHomeConversationContentMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastConversation, setLastConversation] = useState<string | undefined>(
    undefined
  );
  const { currentMessageId } = useLockStreaming();
  const [isScrollLock, setScrollLock] = useState<boolean>(false);

  useEffect(() => {
    /**
     * This one register on the first jump, start at the bottom of the scroll
     */
    const containerElement = containerRef.current;
    if (
      containerElement !== null &&
      conversation &&
      lastConversation !== conversation.id
    ) {
      containerElement.scroll({
        behavior: "instant",
        top: containerElement.scrollHeight,
      });
      setLastConversation(conversation.id);
    }

    // If the last conversation is the same, scroll smoothly
    if (
      containerRef.current !== null &&
      conversation &&
      lastConversation === conversation.id &&
      isScrollLock
    ) {
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [containerRef, conversation, lastConversation, isScrollLock]);

  useEffect(() => {
    const containerElement = containerRef.current;
    const scrollListener = (ev: Event) => {
      const element = ev.target as HTMLDivElement;

      // if is down to the bottom, set locking state.
      setScrollLock(
        Math.abs(
          element.scrollTop - (element.scrollHeight - element.offsetHeight)
        ) <= GLOBAL_SCROLL_OFFSET_FROM_BOTTOM
      );
    };
    if (containerElement !== null) {
      containerElement.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (containerElement !== null) {
        containerElement.removeEventListener("scroll", scrollListener);
      }
    };
  }, [containerRef]);

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
                width="70%"
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
              key={message.id}
              content={
                <>
                  <div className={clsx(`prose`)}>
                    {htmlParser(
                      marked.parse(message.content, { async: false }),
                      {
                        // Modify each <p> element during parsing
                        replace: (domNode: any) => {
                          if (domNode.name === "p") {
                            return (
                              <p className="custom-class">
                                {domNode.children[0].data}
                              </p>
                            );
                          }
                        },
                      }
                    )}
                  </div>
                  {currentMessageId === message.id && (
                    <ConversationBubble.Cursor />
                  )}
                </>
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
