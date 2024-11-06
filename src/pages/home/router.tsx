import { type RouteObject } from "react-router-dom";
import PageHomeLayout from "./components/PageHomeLayout";

const HomeRouter: RouteObject[] = [
  {
    index: true,
    path: `/`,
    element: <PageHomeLayout />,
  },
];

export default HomeRouter;
