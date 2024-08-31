import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import path from "path";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [react()],
    base: "./",
    root: "src",
    build: {
        outDir: "dist", // Output directory for production build.
        assetsDir: "assets", // Directory for static assets in the build output.
        minify: "esbuild", // Minification options (terser or esbuild).
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    },
},
)
