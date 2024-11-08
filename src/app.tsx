import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";

import "@mantine/core/styles.css";
import "./index.css";
import Router from "./router";

const theme = createTheme({});

export default function MainApp() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={Router} />
    </MantineProvider>
  );
}
