import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
