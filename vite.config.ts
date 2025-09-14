/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true, // para no tener que importar describe, it, expect
    environment: "jsdom", // simula un navegador para pruebas de componentes
    setupFiles: "./src/setupTests.ts", // archivo para inicializar mocks, jest-dom, etc
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    include: ["src/**/*.test.{ts,tsx}"],

  },
})