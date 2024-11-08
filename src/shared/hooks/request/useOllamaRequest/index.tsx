import type { RealChat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAppSettings from "../../store/useAppSettings";

export default function useOllamaRequest() {
  const { ollamaBaseUrl } = useAppSettings();
  const keys = {
    getModels: "get-models",
  };

  function withBaseRequest(path: string) {
    return ollamaBaseUrl?.concat(path) as string;
  }

  async function createChatCompletion(
    conversation: RealChat.Conversation,
    abortSignal?: AbortSignal
  ) {
    // Parse the body first
    const body = JSON.stringify({
      messages: conversation.messages,
      model: conversation.model,
    });

    return await fetch(withBaseRequest(`/api/chat`), {
      body: body,
      method: "POST",
      signal: abortSignal,
    });
  }

  async function getModels(abortSignal?: AbortSignal) {
    const response = await fetch(withBaseRequest(`/api/tags`), {
      method: "GET",
      signal: abortSignal,
    });

    const obj = await response.json();
    return obj as { models: RealChat.Model[] };
  }

  function useModels(abortSignal?: AbortSignal) {
    return useQuery({
      queryKey: [keys.getModels],
      queryFn: async () => await getModels(abortSignal),
    });
  }

  return { createChatCompletion, useModels };
}
