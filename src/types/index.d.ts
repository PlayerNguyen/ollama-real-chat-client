export namespace RealChat {
  export type Role = "system" | "user" | "assistant" | "tool";

  export interface Message {
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
}
