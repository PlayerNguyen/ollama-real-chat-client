import { Flex, Paper, Skeleton } from "@mantine/core";

export default function AppLayoutSkeleton() {
  return (
    <Flex direction={"row"}>
      {/* Sidebar mock */}
      <Paper
        className="app-layout-sidebar-skeleton"
        // fixed the size
        mih={"100vh"}
        mah={"100vh"}
        withBorder
        radius={0}
        w={"64px"}
        p={".8rem"}
      >
        <Flex direction={`column`} gap={12}>
          {new Array(5).fill(1).map((_, idx) => {
            return <Skeleton h={32} key={idx} />;
          })}
        </Flex>
      </Paper>
      <Skeleton
        className="app-layout-content-skeleton"
        mih={"100vh"}
        mah={"100vh"}
      ></Skeleton>
    </Flex>
  );
}
