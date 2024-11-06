import { Flex, Paper } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppLayoutSidebar from "../AppLayoutSidebar";

export default function AppLayout() {
  return (
    <>
      <Flex direction={"row"}>
        {/* Sidebar  */}
        <AppLayoutSidebar />

        <Paper
          className="app-layout-content-skeleton"
          mih={"100vh"}
          mah={"100vh"}
        >
          <Outlet />
        </Paper>
      </Flex>
    </>
  );
}
