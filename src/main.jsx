import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./router/router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--toast-bg, #1e293b)",
          color: "#f1f5f9",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "13px",
          fontWeight: "600",
          padding: "12px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#f43f5e", secondary: "#fff" },
        },
      }}
    />
  </StrictMode>
);