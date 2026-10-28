import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: file `middleware` diganti nama menjadi `proxy` (src/proxy.ts).
export default createMiddleware(routing);

export const config = {
  // Lewati API, file internal Next.js, dan file statis (yang mengandung titik).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
