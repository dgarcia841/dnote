import React from "react";
import Client from "react-dom/client"
import App from "@src/components/App"
import { Storage } from "./storage";

window.addEventListener("load", () => {
    Storage.load();
    const root = document.getElementById("app-root");
    if (!root) {
        document.write("App root not found");
        return;
    }
    Client.createRoot(root).render(<App />);
});