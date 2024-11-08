import RouterPaths from "@/router-paths";
import { type RouteObject } from "react-router-dom";
import PageHomeConversationContent from "./components/PageHomeConversationContent";
import PageHomeEmpty from "./components/PageHomeEmpty";
import PageHomeLayout from "./components/PageHomeLayout";

const HomeRouter: RouteObject[] = [
  {
    path: RouterPaths.Conversations.Index,
    element: <PageHomeLayout />,
    children: [
      {
        index: true,
        element: <PageHomeEmpty />,
      },
      {
        path: RouterPaths.Conversations.View,
        element: <PageHomeConversationContent />,
      },
    ],
  },
];

export default HomeRouter;
