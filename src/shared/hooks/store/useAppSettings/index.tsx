import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseAppSettingsType = {
  lastPath?: string;

  setLastPath: (lastPath: string) => void;
};

const useAppSettings = create<UseAppSettingsType>()(
  persist(
    (set, get) => ({
      lastPath: "/conversations",

      setLastPath(lastPath) {
        set((c) => ({
          ...c,
          lastPath: lastPath,
        }));
      },
    }),
    {
      name: "real-chat-app-settings",
    }
  )
);

export default useAppSettings;
