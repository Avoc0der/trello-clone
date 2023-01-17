import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppStateProvider } from "./state/AppStateContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);

reportWebVitals();
