import { Flex, Paper } from "@mantine/core";
import PageHomeConversationList from "../PageHomeConversationList";
import PageHomeSidebarHeader from "./header";

export default function PageHomeSidebar() {
  return (
    <Paper
      w={240}
      radius={"xs"}
      withBorder
      shadow="md"
      mah={"100vh"}
      p={".2rem"}
      className="page-home-sidebar-wrapper"
    >
      <Flex direction={`column`} mah={"100vh"}>
        <PageHomeSidebarHeader />

        {/* Item list */}
        <PageHomeConversationList />
      </Flex>
    </Paper>
  );
}
