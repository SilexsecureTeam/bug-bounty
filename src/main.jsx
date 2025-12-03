// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ import router here
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#11151C",
            color: "#E8EAF2",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.1)"
          }
        }}
      />
    </BrowserRouter>
  </HelmetProvider>
);
