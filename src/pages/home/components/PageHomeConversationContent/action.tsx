import ButtonModelSelect from "@/shared/components/ButtonSelectModel";
import useOllamaRequest from "@/shared/hooks/request/useOllamaRequest";
import useResolver from "@/shared/hooks/resolver/useResolver";
import useAppSettings from "@/shared/hooks/store/useAppSettings";
import { useConversation } from "@/shared/hooks/store/useConversation";
import useLockStreaming from "@/shared/hooks/store/useLockStreaming";
import StreamUtil from "@/shared/util/StreamUtil";
import { generateRandomText } from "@/shared/util/TextUtil";
import type { RealChat } from "@/types";
import { ActionIcon, Flex, Pill, ScrollArea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCamera, IconSend2 } from "@tabler/icons-react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export type PageHomeConversationActionFormProps = {
  promptMessage: string;
  model: string;
};

export default function PageHomeConversationAction() {
  const { id: conversationId } = useParams();
  const {
    addMessageToConversation,
    setModel,
    getModel,
    updateMessage,
    searchConversation,
    updateConversation,
  } = useConversation();
  const { createChatCompletion } = useOllamaRequest();
  const { tick } = useResolver<RealChat.OllamaResponse>();
  const { isStreaming, stopStreaming, startStreaming } = useLockStreaming();
  const { setPreviousModel } = useAppSettings();

  const form = useForm<PageHomeConversationActionFormProps>({
    initialValues: {
      promptMessage: "",
      model: "",
    },
  });

  const handleChangeModel = (model: string | null) => {
    console.log(
      `Changing the model of the conversation ${conversationId} to ${model}`
    );

    setModel(conversationId!, model!);
    setPreviousModel(model!);
  };

  async function handleSubmitMessage(
    values: PageHomeConversationActionFormProps
  ) {
    if (!conversationId) {
      throw new Error(
        `Unable to submit message while conversation id is undefined.`
      );
    }

    // Search from database
    let conversation = searchConversation(conversationId);
    if (!conversation) {
      throw new Error(`Cannot found a conversation with id: ${conversationId}`);
    }

    // Reset fields
    form.reset();

    // add user's message into the current conversation
    const message: RealChat.Message = {
      content: values.promptMessage,
      id: generateRandomText(16),
      role: "user",
    };
    conversation = addMessageToConversation(conversationId, message);
    // update title
    updateConversation(conversationId, (conversation) => ({
      ...conversation,
      summary: message.content,
    }));

    // generate an assistant's chat connection and
    try {
      const chat = await createChatCompletion(conversation);
      const botMessageId = generateRandomText(16);

      if (chat.status !== 200)
        throw new Error(
          `Unable to send request to server. Message: ${chat.statusText}.`
        );

      conversation = addMessageToConversation(conversationId!, {
        content: "",
        id: botMessageId,
        role: "assistant",
      });

      StreamUtil.addChunkingEvent(chat.body!, {
        /**
         * Chunking function
         * @param chunk a single body as uint8array
         */
        onChunk: async (chunk) => {
          const streamResponseObject = await tick(chunk!);
          const message = streamResponseObject.message;

          if (message === undefined) {
            throw new Error(`Cannot read the message`);
          }
          const messageContentFromResponse = message.content;

          updateMessage(conversationId, botMessageId, (message) => ({
            ...message,
            content: message.content + messageContentFromResponse,
          }));
        },
        onFinish: () => stopStreaming(),
        onInit: () => {
          // Signal that the application is streaming
          startStreaming();
        },
      });
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(`Error while create stream: ${err.message}`);
        // remove the message
        updateMessage(conversationId, message.id, undefined);
      }
    }
  }

  const currentModelOfThisConversation: string | undefined = getModel(
    conversationId!
  );

  console.log(currentModelOfThisConversation);

  return (
    <form onSubmit={form.onSubmit(handleSubmitMessage)}>
      <Flex
        gap={6}
        direction={"column"}
        className={clsx(`h-[20vh] overflow-hidden p-4`)}
        bg={"gray.1"}
      >
        <Flex>
          <ButtonModelSelect
            name="model"
            value={currentModelOfThisConversation}
            onChange={handleChangeModel}
          />
          {/* Scrollable */}
          <ScrollArea>
            <Pill variant="contrast">What is Newton's Law?</Pill>
          </ScrollArea>
        </Flex>
        <Flex gap={"md"}>
          <ActionIcon>
            <IconCamera size={16} />
          </ActionIcon>
          <>
            <TextInput
              multiple={true}
              className="flex-1"
              {...form.getInputProps("promptMessage")}
            />
          </>
          <ActionIcon type="submit" disabled={isStreaming}>
            <IconSend2 size={16} className="-rotate-45" />
          </ActionIcon>
        </Flex>
      </Flex>
    </form>
  );
}
