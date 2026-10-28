import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Pakai helper ini (bukan next/link / next/navigation) agar prefix bahasa otomatis.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
