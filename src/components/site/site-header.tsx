import { Search } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import { Link } from "@/i18n/navigation";
import { container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { HeaderShell } from "./header-shell";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { buildNav } from "./nav-items";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const items = buildNav((key) => t(key as Parameters<typeof t>[0]));
  const localeNames = { id: t("langId"), en: t("langEn") };

  return (
    <HeaderShell>
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" aria-label={t("logoLabel")} className="shrink-0 rounded-md">
          <Image
            src={images.logo.src}
            alt={tc(images.logo.altKey)}
            width={images.logo.width}
            height={images.logo.height}
            className="h-10 w-auto sm:h-11"
            unoptimized
            priority
          />
        </Link>

        <DesktopNav items={items} label={t("mainLabel")} />

        <div className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="icon" className="text-navy">
            <Link href={{ pathname: "/peluang", query: { fokus: "cari" } }} aria-label={t("search")}>
              <Search aria-hidden className="size-5" />
            </Link>
          </Button>
          <Link
            href="/lacak"
            className="hidden min-h-touch items-center rounded-full px-2 text-sm font-medium whitespace-nowrap text-text-2 hover:text-blue xl:inline-flex"
          >
            {t("track")}
          </Link>
          <LocaleSwitcher names={localeNames} className="hidden xl:flex" />
          <Button asChild variant="outline" size="sm" className="hidden px-5 xl:inline-flex">
            <Link href="/masuk">{t("login")}</Link>
          </Button>
          <MobileNav
            items={items}
            localeNames={localeNames}
            labels={{
              open: t("openMenu"),
              close: t("closeMenu"),
              title: t("menuTitle"),
              nav: t("mainLabel"),
              language: t("language"),
              track: t("track"),
              login: t("login"),
            }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
