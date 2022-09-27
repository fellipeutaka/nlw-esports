import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: [
      { find: "@assets", replacement: resolve(__dirname, "src", "assets") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src", "components"),
      },
      { find: "@@types", replacement: resolve(__dirname, "src", "@types") },
      {
        find: "@contexts",
        replacement: resolve(__dirname, "src", "@contexts"),
      },
      { find: "@hooks", replacement: resolve(__dirname, "src", "hooks") },
      { find: "@utils", replacement: resolve(__dirname, "src", "utils") },
      { find: "@services", replacement: resolve(__dirname, "src", "services") },
      { find: "@lib", replacement: resolve(__dirname, "src", "lib") },
      { find: "@styles", replacement: resolve(__dirname, "src", "styles") },
    ],
  },
});
