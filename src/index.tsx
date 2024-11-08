import { createRoot } from "react-dom/client";
import MainApp from "./app";

const app = document.querySelector("div#app");

createRoot(app!).render(<MainApp />);
