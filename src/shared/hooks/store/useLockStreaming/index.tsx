import { create } from "zustand";

export type UseLockStreamingType = {
  isStreaming: boolean;
  currentMessageId: string | undefined;

  startStreaming: () => void;
  stopStreaming: () => void;

  setCurrentMessageId: (messageId: string | undefined) => void;
};

const useLockStreaming = create<UseLockStreamingType>((set, get) => ({
  isStreaming: false,
  currentMessageId: undefined,

  stopStreaming() {
    set((v) => ({ ...v, isStreaming: false }));
  },

  startStreaming() {
    set((v) => ({ ...v, isStreaming: true }));
  },

  setCurrentMessageId(messageId) {
    set((v) => ({ ...v, currentMessageId: messageId }));
  },
}));

export default useLockStreaming;
