import { Select } from "@mantine/core";
import { IconRobotFace } from "@tabler/icons-react";
import clsx from "clsx";

export default function ButtonModelSelect() {
  return (
    <Select
      leftSection={
        <>
          <IconRobotFace
            className={clsx(`text-[var(--mantine-color-gray-5)]`)}
            size={16}
          />
        </>
      }
      fw={400}
      variant="filled"
      data={[{ group: "Ollama", items: ["Llama 3.2:1b", "b"] }]}
      w={120}
      searchable
      radius={"xl"}
      size="xs"
      comboboxProps={{
        withArrow: false,
        position: "top-start",
        width: 160,
        shadow: "xs",
        transitionProps: {
          transition: "fade-up",
        },
      }}
    />
  );
}
