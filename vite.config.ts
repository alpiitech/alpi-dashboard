import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@radix-ui/react-tooltip",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-avatar",
      "@radix-ui/react-switch",
      "@radix-ui/react-label",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return undefined
          }

          if (/[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/.test(id)) {
            return "vendor-react"
          }

          if (id.includes("@tanstack")) {
            return "vendor-tanstack"
          }

          if (id.includes("@radix-ui")) {
            return "vendor-radix"
          }

          if (id.includes("node_modules/recharts")) {
            return "vendor-charts"
          }

          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("node_modules/zod")
          ) {
            return "vendor-forms"
          }

          if (id.includes("date-fns") || id.includes("react-day-picker")) {
            return "vendor-date"
          }

          return "vendor"
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
