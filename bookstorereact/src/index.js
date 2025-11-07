import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./styles/theme.css";
import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container);

// PUBLIC_INTERFACE
function bootstrap() {
  /** Bootstraps the React application and mounts it into the root element. */
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

bootstrap();

export default bootstrap;
