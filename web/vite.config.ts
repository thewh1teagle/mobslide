import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mobslide/",
  build: {
    rollupOptions: {
      // Landing page at /mobslide/, phone remote at /mobslide/remote/
      input: {
        landing: "index.html",
        remote: "remote/index.html",
      },
    },
  },
});
