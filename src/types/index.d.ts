export namespace RealChat {
  export type Role = "system" | "user" | "assistant" | "tool";

  export interface Message {
    /**
     * Unique message key.
     */
    id: string;
    role: Role;
    content: string;
    /**
     * The list of images.
     *
     * The sending images must encoded to base64 before submit.
     */
    images?: string[];
  }

  export interface Conversation {
    id: string;
    messages: Message[];
    summary?: string;
    model?: string;
    createdAt: Date;
  }

  export interface Model {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details: {
      format: string;
      family: string;
      families: any;
      parameter_size: string;
      quantization_level: string;
    };
  }
  export interface OllamaResponse {
    created_at: string;
    done: boolean;
    message: {
      content: string;
      role: Role;
    };
    model: string;
  }
}
