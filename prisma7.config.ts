import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Dijalankan oleh `prisma db seed` (npm run db:seed).
    // Prisma 7.10.1 TIDAK menjalankan seed otomatis saat `migrate reset`/`migrate dev`.
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
