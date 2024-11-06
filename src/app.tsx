import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "@mantine/core/styles.css";
import "./index.css";

const theme = createTheme({});

export default function MainApp() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router.Router} />
    </MantineProvider>
  );
}
