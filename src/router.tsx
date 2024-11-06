import React, { Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import HomeRouter from "./pages/home/router";
import AppErrorElement from "./shared/components/AppErrorElement";
import AppLayoutSkeleton from "./shared/components/AppLayout/skeleton";

const AppLayout = React.lazy(() => import("@/shared/components/AppLayout"));

const RouterPath = {
  Index: `/`,
};

const Router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<AppLayoutSkeleton />}>
        <AppLayout />
      </Suspense>
    ),
    children: [...HomeRouter],
    errorElement: <AppErrorElement />,
  },
]);

/** Declare a main router */
export default {
  RouterPath,
  Router,
};
