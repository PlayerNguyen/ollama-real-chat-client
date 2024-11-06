import { Paper } from "@mantine/core";
import PageHomeSidebarHeader from "./header";

export default function PageHomeSidebar() {
  return (
    <Paper
      w={240}
      radius={"xs"}
      withBorder
      shadow="md"
      mih={"100vh"}
      p={".6rem"}
    >
      <PageHomeSidebarHeader />
    </Paper>
  );
}
