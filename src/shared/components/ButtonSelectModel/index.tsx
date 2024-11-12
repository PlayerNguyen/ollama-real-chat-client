import useOllamaRequest from "@/shared/hooks/request/useOllamaRequest";
import { Select, type SelectProps } from "@mantine/core";
import { IconRobotFace } from "@tabler/icons-react";
import clsx from "clsx";

export type ButtonModelSelectProps = SelectProps & {};

export default function ButtonModelSelect({
  ...props
}: ButtonModelSelectProps) {
  const { data } = useOllamaRequest().useModels();

  const formattedData = data
    ? data.models.map((model) => {
        return {
          value: model.name,
          label: model.name,
        };
      })
    : [];

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
      data={[{ group: "Ollama", items: [...formattedData] }]}
      w={180}
      allowDeselect={false}
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
      {...props}
    />
  );
}
