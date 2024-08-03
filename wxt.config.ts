import react from "@vitejs/plugin-react";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    name: "Crumbs",
    version: "0.0.4", // Alfa.
    description:
      "Crumbs is a dApp that lets you leave and view permanent, on-chain comments on any website, enhancing communal web interaction.",
    permissions: [
      // "storage",
      // for the injected script. it may not work
      // "scripting",
    ],
    homepage_url: "https://crumbs.eurekonomicon.com",
    host_permissions: ["*://*/*"],
    web_accessible_resources: [
      {
        resources: ["*"],
        matches: ["*://*/*"],
      },
    ],
  },
});
