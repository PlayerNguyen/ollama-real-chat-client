export default class StreamUtil {
  /**
   * Constructs a function to pipe every
   * chunking moment from a stream.
   *
   * @param stream a stream to pipe into a chunk event
   * @param onChunk an event that will call every single tick
   */
  public static async addChunkingEvent(
    stream: ReadableStream<Uint8Array>,
    options?: {
      onChunk: (chunk: Uint8Array) => void;
      onFinish?: () => void;
      onInit?: () => void;
    }
  ): Promise<void> {
    options && options.onInit && options.onInit();
    const reader = stream.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) options && options.onChunk(value);
      }
      options && options.onFinish && options.onFinish();
    } catch (error) {
      console.error("Error reading stream:", error);
    } finally {
      reader.releaseLock();
    }
  }
}
