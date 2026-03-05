/**
 * Module: main.jsx
 * Responsibility: React entry point that mounts the root application.
 *
 * Time Complexity: O(1) bootstrap logic.
 * Space Complexity: O(1) bootstrap metadata.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Locates root DOM node where React tree will be mounted.
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element '#root' was not found in index.html.");
}

// Creates React root and renders the top-level App component.
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
