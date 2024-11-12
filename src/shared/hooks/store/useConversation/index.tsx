import type { RealChat } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseStoreConventionType = {
  /**
   * List of user's conversations.
   * @returns an array of object {@link RealChat.Conversation}
   */
  conversations: RealChat.Conversation[];

  addConversation: (conversation: RealChat.Conversation) => void;
  removeConversation: (index: number) => void;
  /**
   * @deprecated use updateConversation
   */
  replaceConversation: (
    index: number,
    conversation: RealChat.Conversation
  ) => void;
  clearConversation: () => void;
  searchConversation: (id: string) => RealChat.Conversation | undefined;

  addMessageToConversation: (
    conversationId: string,
    ...message: RealChat.Message[]
  ) => RealChat.Conversation;

  setModel: (conversationId: string, model: string) => void;
  getModel: (conversationId: string) => string | undefined;

  updateMessage: (
    conversationId: string,
    messageId: string,
    /**
     * The reducer which will replace the message by a new one.
     */
    reducer?: (message: RealChat.Message) => RealChat.Message
  ) => void;

  updateConversation: (
    conversationId: string,
    reducer?: (conversation: RealChat.Conversation) => RealChat.Conversation
  ) => void;
};

const useConversation = create<UseStoreConventionType>()(
  persist(
    (set, get) => ({
      conversations: [],

      addConversation(conversation) {
        console.log(`Adding the new conversation with id: ${conversation.id}`);
        set((c) => ({
          conversations: [conversation, ...c.conversations],
        }));
      },

      removeConversation(index) {
        set((c) => {
          return {
            conversations: get()
              .conversations.slice(0, index)
              .concat(get().conversations.slice(index + 1)),
          };
        });
      },

      clearConversation() {
        set((c) => ({ conversations: [] }));
      },

      searchConversation(id) {
        const conversations = get().conversations;

        return conversations.find((value) => value.id === id);
      },

      replaceConversation(index: number, conversation: RealChat.Conversation) {
        const currentConversations = get().conversations;

        const updatedConversations = [
          ...currentConversations.slice(0, index),
          conversation,
          ...currentConversations.slice(index + 1),
        ];

        // Update back the state
        set((cur) => ({ ...cur, conversations: updatedConversations }));
      },

      updateConversation(id: string, reducer) {
        const currentConversations = get().conversations;
        const index = currentConversations.findIndex(
          (conversation) => conversation.id === id
        );
        if (index === -1) return;

        const updatedConversations = reducer
          ? [
              ...currentConversations.slice(0, index),
              reducer(currentConversations[index]),
              ...currentConversations.slice(index + 1),
            ]
          : [
              ...currentConversations.slice(0, index),
              ...currentConversations.slice(index + 1),
            ];

        // Update back the state
        set((cur) => ({ ...cur, conversations: updatedConversations }));
      },

      addMessageToConversation(conversationId, ...message) {
        const conversationList: RealChat.Conversation[] = get().conversations;

        const curIndexOfConversation: number = conversationList.findIndex(
          (_conv) => _conv.id === conversationId
        );

        let cloneOfCurConversation: RealChat.Conversation = structuredClone(
          conversationList[curIndexOfConversation]
        );

        cloneOfCurConversation.messages.push(...message);

        get().replaceConversation(
          curIndexOfConversation,
          cloneOfCurConversation
        );

        return cloneOfCurConversation;
      },

      setModel(conversationId, model) {
        const conversationList: RealChat.Conversation[] = get().conversations;
        const curIndex: number = conversationList.findIndex(
          (conversation: RealChat.Conversation) =>
            conversation.id === conversationId
        );

        // If not found a conversation with index
        if (curIndex === -1) {
          throw new Error(
            `Cannot find a conversation with id: ${conversationId}`
          );
        }

        let conversation: RealChat.Conversation = structuredClone(
          conversationList[curIndex]
        );
        // Set the model
        conversation.model = model;

        // Replace back
        get().replaceConversation(curIndex, conversation);
      },

      getModel(conversationId) {
        const conversationList: RealChat.Conversation[] = get().conversations;
        const curIndex: number = conversationList.findIndex(
          (conversation: RealChat.Conversation) =>
            conversation.id === conversationId
        );

        // If not found a conversation with index
        if (curIndex === -1) {
          throw new Error(
            `Cannot find a conversation with id: ${conversationId}`
          );
        }

        return conversationList[curIndex].model;
      },

      updateMessage(conversationId, messageId, reducer) {
        // Find index
        const conversationList: RealChat.Conversation[] = get().conversations;
        const curConversationIndex: number = conversationList.findIndex(
          (conversation) => conversation.id === conversationId
        );

        if (curConversationIndex === -1) {
          throw new Error(`Cannot find the conversation id: ${conversationId}`);
        }

        const curConversation = structuredClone(
          conversationList[curConversationIndex]
        );

        // Search for a message
        const currentMessageIndex = curConversation.messages.findIndex(
          (message) => message.id === messageId
        );
        if (currentMessageIndex === -1) {
          throw new Error(
            `Cannot find the message ${messageId} inside the conversation: ${conversationId}`
          );
        }
        // Get current message
        const currentMessage = curConversation.messages[currentMessageIndex];

        // Find and replace index
        curConversation.messages =
          reducer !== undefined
            ? [
                ...curConversation.messages.slice(0, currentMessageIndex),
                reducer(currentMessage!),
                ...curConversation.messages.slice(currentMessageIndex + 1),
              ]
            : [
                ...curConversation.messages.slice(0, currentMessageIndex),
                ...curConversation.messages.slice(currentMessageIndex + 1),
              ];

        // Replace the conversation
        get().replaceConversation(curConversationIndex, curConversation);
      },
    }),
    {
      name: `real-chat-persist-conversations`,
      partialize(state) {
        return {
          conversations: state.conversations,
        };
      },
    }
  )
);

export { useConversation };
