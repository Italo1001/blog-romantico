import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { cartographer } from "@replit/vite-plugin-cartographer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [
        react(),
        runtimeErrorOverlay(),
        ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
            ? [cartographer()]
            : []),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client", "src"),
            "@shared": path.resolve(__dirname, "shared"),
        },
    },
    root: "client",
    build: {
        outDir: "../dist/public",
        emptyOutDir: true,
    },
    server: {
        fs: {
            strict: true,
            deny: ["**/.*"],
        },
    },
});
