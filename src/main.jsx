import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextVariablesProvider } from "./context/ContextVariables.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ContextVariablesProvider>
        <App />
      </ContextVariablesProvider>
    </AuthContextProvider>
  </StrictMode>
);
