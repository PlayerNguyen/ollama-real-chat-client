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
  clearConversation: () => void;
  searchConversation: (id: string) => RealChat.Conversation | undefined;
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
