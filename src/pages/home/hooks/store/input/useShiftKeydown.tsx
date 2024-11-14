import { useEffect, useRef } from "react";

export default function useShiftKeyDown({
  keyValue,
  callback,
}: {
  keyValue: "Enter" | string;
  callback: (evt: KeyboardEvent) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function listener(evt: KeyboardEvent) {
    if (evt.key === keyValue && evt.shiftKey) {
      if (evt.type == "keydown") {
        callback(evt);
      }
      evt.preventDefault();
    }
  }

  useEffect(() => {
    const currentElement = ref.current as HTMLTextAreaElement | null;

    if (currentElement !== null) {
      currentElement.addEventListener("keydown", listener);
      currentElement.addEventListener("keypress", listener);
    }

    return () => {
      if (currentElement !== null) {
        currentElement.removeEventListener("keydown", listener);
        currentElement.removeEventListener("keypress", listener);
      }
    };
  }, [ref]);

  return { ref };
}
