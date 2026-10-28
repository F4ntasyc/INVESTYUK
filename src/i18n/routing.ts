import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // ID tanpa prefix (/), EN dengan prefix (/en)
  localePrefix: "as-needed",
  // Bahasa hanya ditentukan oleh URL, bukan Accept-Language/cookie,
  // supaya / selalu Bahasa Indonesia.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
