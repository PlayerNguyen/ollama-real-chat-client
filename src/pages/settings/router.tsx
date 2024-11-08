import RouterPaths from "@/router-paths";
import type { RouteObject } from "react-router-dom";

const SettingsRoutes: RouteObject[] = [
  {
    path: RouterPaths.Settings.Index,
    element: <>Wrapper of settings</>,
  },
];

export default SettingsRoutes;
