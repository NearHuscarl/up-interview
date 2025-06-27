/// <reference types='vitest' />
import path from "node:path";
import { defineConfig, ProxyOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import tailwindcss from "@tailwindcss/vite";

function getProxy(): Record<string, string | ProxyOptions> {
  const apiDevServer = "http://localhost:3000";
  return {
    "/api": apiDevServer,
  };
}

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/weather-forecast-web",
  server: {
    watch: {
      // need to use polling for file watching when mounted in a container
      usePolling: true,
    },
    port: 4200,
    // allow the app to be accessed from host machine in a containerized environment
    host: true,
    proxy: getProxy(),
  },
  preview: {
    port: 4300,
    host: true,
    proxy: getProxy(),
  },
  plugins: [react(), nxViteTsPaths(), tailwindcss(), nxCopyAssetsPlugin(["*.md"])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: "../../dist/apps/weather-forecast-web",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    setupFiles: ["./src/test/test-setup.ts"],
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/apps/weather-forecast-web",
      provider: "v8" as const,
    },
  },
}));
