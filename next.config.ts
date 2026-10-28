import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Plugin membaca konfigurasi dari src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone", // dibutuhkan Dockerfile
  turbopack: {
    rules: {
      // Tailwind CSS v4 lewat loader @tailwindcss/turbopack (tanpa postcss.config)
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
