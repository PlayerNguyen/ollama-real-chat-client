import { createTheme, MantineProvider } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Router from "./router";

const theme = createTheme({});
dayjs.extend(relativeTime);

const queryClient = new QueryClient();

export default function MainApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={Router} />
        <Toaster />
      </MantineProvider>
    </QueryClientProvider>
  );
}
