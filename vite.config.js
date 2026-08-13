import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Le base "/Football-predictions/" correspond au nom du repo GitHub.
// A adapter si votre repo GitHub Pages porte un autre nom (voir README).
export default defineConfig({
  plugins: [react()],
  base: "/Football-predictions/",
});
