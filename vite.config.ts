import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        external: [
          // Exclude platform-specific Rollup binaries to prevent build issues
          /^@rollup\/rollup-.*/,
        ],
        onwarn(warning, warn) {
          // Suppress warnings about external modules
          if (
            warning.code === "UNRESOLVED_IMPORT" &&
            warning.message?.includes("@rollup/rollup-")
          ) {
            return;
          }
          warn(warning);
        },
      },
      target: "esnext",
      minify: "esbuild",
    },
    optimizeDeps: {
      exclude: ["@rollup/rollup-linux-x64-gnu"],
    },
  };
});
