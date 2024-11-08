import { Flex } from "@mantine/core";

export default function PageHomeEmpty() {
  return (
    <Flex
      bg={"gray.1"}
      className="w-full h-full justify-center items-center"
      c="gray.6"
    >
      You have not selected to any conversation.
    </Flex>
  );
}
