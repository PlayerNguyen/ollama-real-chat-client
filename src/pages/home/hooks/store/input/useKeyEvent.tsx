import { useEffect, useRef } from "react";

export default function useKeyEvent<T extends HTMLElement>(
  event: "keydown" | "keyup" | "keypress" = "keydown",
  targetKey: string,
  callback: (ev: KeyboardEvent) => void,
  externalRef?: React.RefObject<T> // Accept an optional external ref
) {
  const internalRef = useRef<T>(null);
  const ref = externalRef || internalRef; // Use external ref if available

  useEffect(() => {
    // Define the event listener function
    function listener(ev: KeyboardEvent) {
      if (ev.key === targetKey) {
        callback(ev); // Trigger callback only for the target key
      }
    }

    // Add event listener to the element referenced by ref
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener(event, listener);
    }

    // Cleanup by removing the event listener
    return () => {
      if (currentRef) {
        currentRef.removeEventListener(event, listener);
      }
    };
  }, [event, targetKey, callback, ref]); // Re-run effect on event, targetKey, callback, or ref change

  return ref; // Return the ref for further use
}
