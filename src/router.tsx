import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeRouter from "./pages/home/router";
import AppErrorElement from "./shared/components/AppErrorElement";
import AppLayoutSkeleton from "./shared/components/AppLayout/skeleton";
import SettingsRoutes from "./pages/settings/router";

const AppLayout = React.lazy(() => import("@/shared/components/AppLayout"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<AppLayoutSkeleton />}>
        <AppLayout />
      </Suspense>
    ),
    children: [...HomeRouter, ...SettingsRoutes],
    errorElement: <AppErrorElement />,
  },
]);

export default Router;
