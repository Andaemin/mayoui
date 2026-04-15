import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: "./tsconfig.app.json",
            entryRoot: "src",
            insertTypesEntry: true,
            include: ["src"],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "MayoUI",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react-dom"],
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.ts",
    },
});
