import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadAnalyticsIfConsented } from "./lib/analytics";

loadAnalyticsIfConsented();
createRoot(document.getElementById("root")!).render(<App />);
