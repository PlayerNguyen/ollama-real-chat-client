import RouterPaths from "@/router-paths";
import { useConversation } from "@/shared/hooks/store/useConversation";
import { Flex } from "@mantine/core";
import { startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHomeConversationListItem from "../PageHomeConversationListItem";

export default function PageHomeConversationList() {
  const { conversations } = useConversation();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleItemClick(id: string) {
    startTransition(() => {
      navigate(RouterPaths.Conversations.View.replace(`:id`, `${id}`));
    });
  }

  return (
    <Flex
      className="conversation-list-outer overflow-y-auto p-4 flex-1"
      direction={`column`}
      gap={"xs"}
    >
      {conversations.map((conversation, index) => {
        return (
          <PageHomeConversationListItem
            key={conversation.id}
            isActive={conversation.id === id}
            onClick={() => handleItemClick(conversation.id)}
            conversation={conversation}
          />
        );
      })}
    </Flex>
  );
}
