import { create } from "zustand";

export type UseLockStreamingType = {
  isStreaming: boolean;

  startStreaming: () => void;
  stopStreaming: () => void;
};

const useLockStreaming = create<UseLockStreamingType>((set, get) => ({
  isStreaming: false,

  stopStreaming() {
    set((v) => ({ ...v, isStreaming: false }));
  },

  startStreaming() {
    set((v) => ({ ...v, isStreaming: true }));
  },
}));

export default useLockStreaming;
