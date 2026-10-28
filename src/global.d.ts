import type { Locale } from "@/i18n/routing";
import type messages from "../messages/id.json";

// Membuat key terjemahan dan locale bertipe (salah ketik key = error tsc).
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
