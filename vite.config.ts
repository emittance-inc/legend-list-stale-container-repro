import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/legend-list-stale-container-repro/",
    define: {
        __DEV__: JSON.stringify(true),
        global: "globalThis",
    },
    plugins: [react()],
    resolve: {
        dedupe: ["react", "react-dom"],
    },
});
