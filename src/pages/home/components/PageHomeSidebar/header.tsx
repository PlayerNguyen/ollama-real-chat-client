import RouterPaths from "@/router-paths";
import useAppSettings from "@/shared/hooks/store/useAppSettings";
import { useConversation } from "@/shared/hooks/store/useConversation";
import { generateRandomText } from "@/shared/util/TextUtil";
import type { RealChat } from "@/types";
import { ActionIcon, Flex, Title } from "@mantine/core";
import { IconBubblePlus } from "@tabler/icons-react";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";

export type PageHomeSidebarHeaderProps = {
  title?: string;
};

export default function PageHomeSidebarHeader({
  title,
}: PageHomeSidebarHeaderProps) {
  const { addConversation } = useConversation();
  const { previousModel } = useAppSettings();
  const navigate = useNavigate();

  function handleCreateConversationClick() {
    const conversationObject: RealChat.Conversation = {
      createdAt: new Date(),
      id: generateRandomText(),
      messages: [],
      model: previousModel,
    };

    addConversation(conversationObject);

    // Navigate to the new conversation
    startTransition(() => {
      navigate(
        RouterPaths.Conversations.View.replace(`:id`, conversationObject.id)
      );
    });
  }

  return (
    <Flex direction={"row"} p={"md"}>
      <Title order={4}>{title || "Conversation"}</Title>
      {/* Actions */}
      <Flex w={"100vw"} justify={"end"} gap={6}>
        {/* <Kbd>N</Kbd> */}
        <ActionIcon size={"md"}>
          <IconBubblePlus size={16} onClick={handleCreateConversationClick} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
