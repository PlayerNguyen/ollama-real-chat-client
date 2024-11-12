import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseAppSettingsType = {
  lastPath?: string;
  ollamaBaseUrl?: string;
  previousModel: string | undefined;

  setLastPath: (lastPath: string) => void;
  setOllamaBaseUrl: (baseUrl: string) => void;
  setPreviousModel: (previousModel: string) => void;
};

const useAppSettings = create<UseAppSettingsType>()(
  persist(
    (set, get) => ({
      lastPath: "/conversations",
      ollamaBaseUrl: "http://localhost:11434",
      previousModel: undefined,

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

      setPreviousModel(previousModel) {
        console.log(`Set the previous model to: ${previousModel}`);

        set((c) => ({
          ...c,
          previousModel: previousModel,
        }));
      },
    }),
    {
      name: "real-chat-app-settings",
    }
  )
);

export default useAppSettings;
