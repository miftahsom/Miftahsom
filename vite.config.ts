import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync, mkdirSync, existsSync } from "fs";

// Plugin to copy admin files during build
const copyAdminFiles = () => {
  return {
    name: 'copy-admin-files',
    writeBundle() {
      const adminDir = path.resolve(__dirname, 'dist/admin');
      if (!existsSync(adminDir)) {
        mkdirSync(adminDir, { recursive: true });
      }
      copyFileSync('public/admin/index.html', 'dist/admin/index.html');
      copyFileSync('public/admin/config.yml', 'dist/admin/config.yml');
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    copyAdminFiles()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
