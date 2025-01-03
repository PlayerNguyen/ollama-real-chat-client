import {
  Divider,
  Flex,
  Paper,
  Skeleton,
  Text,
  type PaperProps,
} from "@mantine/core";
import clsx from "clsx";

export type ConversationBubbleProps = PaperProps & {
  direction?: "start" | "end";
  width?: string;
  isLoading?: boolean;
  title?: string;
  content?: React.ReactElement;
  icon?: React.ReactElement;
};

export default function ConversationBubble({
  direction,
  width,
  isLoading,
  title,
  content,
  icon,
  ...props
}: ConversationBubbleProps) {
  return (
    <Flex w={"100%"} justify={direction || "start"}>
      <Paper
        withBorder
        shadow="sm"
        w={width === undefined || width === "" ? "100%" : width}
        py="md"
        px={"xl"}
        radius={"xl"}
        {...props}
      >
        <Flex direction={`column`} align={direction || "start"}>
          {/* Header */}
          <Flex
            align={"center"}
            gap={"md"}
            bg={"gray.1"}
            px={16}
            py={4}
            className={clsx("rounded-xl")}
          >
            {icon && icon}
            <Skeleton visible={isLoading}>
              <Text fw={600} lineClamp={2} size="xs" c={"gray.7"}>
                {title || "Conversation Bubble"}
              </Text>
            </Skeleton>
          </Flex>
          {/* Divider */}
          <Divider my={"sm"} w={"100%"} />
          {/* Content */}
          <Skeleton visible={isLoading}>
            {content ||
              `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              vel, neque dolores natus beatae ex illum repellendus magni
              corporis consequatur dolorem doloribus at nihil corrupti quos
              sequi autem quaerat incidunt.`}
          </Skeleton>
        </Flex>
      </Paper>
    </Flex>
  );
}

ConversationBubble.Cursor = () => {
  return (
    <div
      className={clsx(
        `w-[12px] h-[12px] bg-[var(--mantine-color-gray-5)] inline-block animate-blink`,
        `rounded-full my-4`
      )}
    ></div>
  );
};
