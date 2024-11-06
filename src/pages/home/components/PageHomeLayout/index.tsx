import { Outlet } from "react-router-dom";
import PageHomeSidebar from "../PageHomeSidebar";

export default function PageHomeLayout() {
  return (
    <>
      {/* Left Sidebar  */}
      <PageHomeSidebar />
      {/* Content */}
      <Outlet />
    </>
  );
}
