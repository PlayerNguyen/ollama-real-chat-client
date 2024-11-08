import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseAppSettingsType = {
  lastPath?: string;
  ollamaBaseUrl?: string;

  setLastPath: (lastPath: string) => void;
  setOllamaBaseUrl: (baseUrl: string) => void;
};

const useAppSettings = create<UseAppSettingsType>()(
  persist(
    (set, get) => ({
      lastPath: "/conversations",
      ollamaBaseUrl: "http://localhost:11434",

      setLastPath(lastPath) {
        set((c) => ({
          ...c,
          lastPath: lastPath,
        }));
      },

      setOllamaBaseUrl(baseUrl) {
        set((c) => ({
          ...c,
          ollamaBaseUrl: baseUrl,
        }));
      },
    }),
    {
      name: "real-chat-app-settings",
    }
  )
);

export default useAppSettings;
