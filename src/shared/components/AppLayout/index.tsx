import RouterPaths from "@/router-paths";
import useAppSettings from "@/shared/hooks/store/useAppSettings";
import { Flex } from "@mantine/core";
import { startTransition, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppLayoutSidebar from "../AppLayoutSidebar";

export default function AppLayout() {
  const { lastPath, setLastPath } = useAppSettings();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    startTransition(() => {
      if (lastPath) {
        navigate(lastPath);
      }
    });
  }, [lastPath]);

  useEffect(() => {
    if (pathname !== undefined || pathname !== null) {
      setLastPath(pathname);
    } else {
      setLastPath(RouterPaths.Conversations.Index);
    }
  }, [pathname]);

  return (
    <>
      <Flex direction={"row"}>
        {/* Sidebar  */}
        <AppLayoutSidebar />

        <Flex className="app-layout-content-wrapper overflow-hidden w-full">
          <Outlet />
        </Flex>
      </Flex>
    </>
  );
}
