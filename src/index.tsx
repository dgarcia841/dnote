import React from "react";
import Client from "react-dom/client"
import App from "@src/components/App"

window.addEventListener("load", () => {
    const root = document.getElementById("app-root");
    if (!root) {
        document.write("App root not found");
        return;
    }
    Client.createRoot(root).render(<App />);
});