import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import PageHomeSidebar from "../PageHomeSidebar";

export default function PageHomeLayout() {
  return (
    <>
      {/* Left Sidebar  */}
      <PageHomeSidebar />
      {/* Content */}
      <Flex className="page-home-content-wrapper w-full flex-1">
        <Outlet />
      </Flex>
    </>
  );
}
