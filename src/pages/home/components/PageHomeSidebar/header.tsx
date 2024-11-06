import { ActionIcon, Flex, Kbd, Title } from "@mantine/core";
import { IconBubblePlus } from "@tabler/icons-react";

export type PageHomeSidebarHeaderProps = {
  title?: string;
};

export default function PageHomeSidebarHeader({
  title,
}: PageHomeSidebarHeaderProps) {
  return (
    <Flex direction={"row"}>
      <Title order={4}>{title || "Conversation"}</Title>
      {/* Actions */}
      <Flex w={"100vw"} justify={"end"} gap={6}>
        <Kbd>N</Kbd>
        <ActionIcon size={"md"}>
          <IconBubblePlus size={16} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
