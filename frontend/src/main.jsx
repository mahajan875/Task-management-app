import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { registerSW } from "virtual:pwa-register";
import * as Sentry from "@sentry/react";

Sentry.init({

    dsn: "YOUR_SENTRY_DSN"
});

registerSW({
    immediate: true
});

ReactDOM.createRoot(document.getElementById("root")).render(

    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>

);