import ButtonModelSelect from "@/shared/components/ButtonSelectModel";
import { ActionIcon, Flex, Pill, ScrollArea, TextInput } from "@mantine/core";
import { IconCamera, IconSend2 } from "@tabler/icons-react";
import clsx from "clsx";

export default function PageHomeConversationAction() {
  return (
    <Flex
      gap={6}
      direction={"column"}
      className={clsx(`h-[20vh] overflow-hidden p-4`)}
      bg={"gray.1"}
    >
      <Flex>
        <ButtonModelSelect />
        {/* Scrollable */}
        <ScrollArea>
          <Pill>What is Newton's Law?</Pill>
        </ScrollArea>
      </Flex>
      <Flex gap={"md"}>
        <ActionIcon>
          <IconCamera size={16} />
        </ActionIcon>
        <>
          <TextInput className="flex-1" />
        </>
        <ActionIcon>
          <IconSend2 size={16} className="-rotate-45" />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
