export interface StreamHandlers {
  onChunk: (text: string) => void;
  onMessageId?: (id: string) => void;
  onDone?: () => void;
  onError?: (err: any) => void;
}

/**
 * Consumes the custom newline-delimited stream from the Medbotv2 chatsystem API.
 * Format:
 * - Each chunk is terminated by a newline (`\n`).
 * - Newline characters in the model response are replaced by `[NEWLINE]`.
 * - The end of the stream is marked by `[DONE]`.
 * - If precreate_uuids is enabled, the first line is the assistant message UUID.
 */
export async function consumeChatStream(
  response: Response,
  handlers: StreamHandlers
) {
  if (!response.body) {
    handlers.onError?.(new Error("No response body available"));
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let isFirstLine = true;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      // Decode the new bytes and append to the buffer
      buffer += decoder.decode(value, { stream: true });

      // Split buffer by newlines, keeping the last incomplete segment in the buffer
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim() && isFirstLine) {
          // Skip empty lines at the very start
          continue;
        }

        // Check if the line is a UUID (assistant_msg_id)
        // UUID regex: 8-4-4-4-12 hex chars
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (isFirstLine && uuidRegex.test(line.trim())) {
          handlers.onMessageId?.(line.trim());
          isFirstLine = false;
          continue;
        }

        isFirstLine = false;

        if (line === "[DONE]") {
          handlers.onDone?.();
          return;
        }

        if (line === "[NEWLINE]") {
          handlers.onChunk("\n");
        } else {
          handlers.onChunk(line);
        }
      }
    }

    // Process any remaining text in the buffer
    if (buffer) {
      if (buffer === "[DONE]") {
        handlers.onDone?.();
      } else if (buffer === "[NEWLINE]") {
        handlers.onChunk("\n");
      } else {
        handlers.onChunk(buffer);
      }
    }
    
    handlers.onDone?.();
  } catch (error) {
    handlers.onError?.(error);
  } finally {
    reader.releaseLock();
  }
}
