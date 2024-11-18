import RouterPaths from "@/router-paths";
import { useConversation } from "@/shared/hooks/store/useConversation";
import { Flex } from "@mantine/core";
import { startTransition, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHomeConversationListItem from "../PageHomeConversationListItem";

export default function PageHomeConversationList() {
  const { conversations, updateConversation } = useConversation();
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);

  function handleOpenConversation(id: string) {
    startTransition(() => {
      navigate(RouterPaths.Conversations.View.replace(`:id`, `${id}`));
    });
  }

  function handleRemoveConversation() {
    console.log(`Removing conversation...`);
    // Search top conversation and open it
    if (conversations.length === 0) {
      startTransition(() => {
        navigate(RouterPaths.Conversations.Index);
      });
      return;
    }

    // Delete the conversation (if the reducer parameter has not passed)
    updateConversation(id!);

    let destinationId =
      conversations[0].id === id ? conversations[1].id : conversations[0].id;

    // Otherwise
    startTransition(() => {
      navigate(RouterPaths.Conversations.View.replace(`:id`, destinationId));
      ref.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  return (
    <Flex
      className="conversation-list-outer overflow-y-auto p-4 flex-1"
      direction={`column`}
      gap={"xs"}
      ref={ref}
    >
      {conversations.map((conversation, index) => {
        return (
          <PageHomeConversationListItem
            key={`message-home-conversation-item-${conversation.id}`}
            isActive={conversation.id === id}
            onClick={() => handleOpenConversation(conversation.id)}
            conversation={conversation}
            onRemove={() => {
              handleRemoveConversation();
            }}
          />
        );
      })}
    </Flex>
  );
}
