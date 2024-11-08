import { useConversation } from "@/shared/hooks/store/useConversation";
import { Flex } from "@mantine/core";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import PageHomeConversationAction from "./action";
import PageHomeConversationContentHeader from "./header";
import PageHomeConversationContentMessages from "./messages";

export default function PageHomeConversationContent() {
  const { id } = useParams();
  const { searchConversation } = useConversation();

  const conversation = searchConversation(id!);

  return (
    <Flex direction={"column"} className={clsx(`min-h-[100vh] w-full`)}>
      {/* Header */}
      <PageHomeConversationContentHeader conversation={conversation} />

      {/* Conversation messages */}
      <PageHomeConversationContentMessages />

      {/* Conversation footer (action) */}
      <PageHomeConversationAction />
    </Flex>
  );
}
