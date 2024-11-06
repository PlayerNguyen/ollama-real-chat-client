import { Center } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export default function AppErrorElement() {
  const error = useRouteError();
  console.error(error);

  return <Center>Something is wrong {JSON.stringify(error)}</Center>;
}
