import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

// Desktop releases before the remote moved to /remote/ point the QR code at
// the site root with an ?id= param. Keep those installs working.
const params = new URLSearchParams(window.location.search);
if (params.has("id")) {
  window.location.replace(`remote/?${params.toString()}`);
} else {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
