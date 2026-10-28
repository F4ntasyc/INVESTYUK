import { Search, SearchX } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { container } from "@/components/site/container";
import { OpportunityCard } from "@/components/site/opportunity-card";
import { getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { searchOpportunities } from "@/lib/data/opportunities";

// Daftar peluang + pencarian keyword sederhana (?q=).
// TODO (Fase 2–3): filter sidebar (sektor, kecamatan, kisaran, kelompok), urutan,
// tampilan peta (?tampilan=peta), smart search hybrid, dan paginasi bila data bertambah.

export async function generateMetadata({ params }: PageProps<"/[locale]/peluang">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "peluang" });
  return { title: t("title") };
}

export default async function PeluangPage({ params, searchParams }: PageProps<"/[locale]/peluang">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await connection();

  const sp = await searchParams;
  const q = (typeof sp.q === "string" ? sp.q : "").trim().slice(0, 100);
  const focusSearch = sp.fokus === "cari";
  const t = await getTranslations("peluang");
  const results = await searchOpportunities(locale, q);

  return (
    <div className={`${container} py-12 lg:py-16`}>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-base text-text-2">{t("intro")}</p>

      <form
        action={getPathname({ href: "/peluang", locale })}
        method="get"
        role="search"
        className="mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-input bg-white p-1.5 pl-5 shadow-card focus-within:ring-3 focus-within:ring-ring"
      >
        <Search aria-hidden className="size-5 shrink-0 text-text-2" />
        <label htmlFor="cari" className="sr-only">
          {t("searchLabel")}
        </label>
        <input
          id="cari"
          name="q"
          type="search"
          defaultValue={q}
          maxLength={100}
          autoFocus={focusSearch}
          placeholder={t("searchPlaceholder")}
          className="h-11 min-w-0 flex-1 bg-transparent text-base text-navy placeholder:text-text-2 focus-visible:outline-none"
        />
        <Button type="submit" className="h-11">
          {t("searchButton")}
        </Button>
      </form>

      <h2 className="mt-10 text-lg font-bold" aria-live="polite">
        {q ? t("countFor", { count: results.length, q }) : t("count", { count: results.length })}
      </h2>

      {results.length > 0 ? (
        <>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((o, i) => (
              <li key={o.id} className="flex">
                <OpportunityCard opportunity={o} className="w-full" priority={i < 3} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-text-2">{t("note")}</p>
        </>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-card bg-section p-8">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-tint-blue text-icon-blue">
            <SearchX aria-hidden className="size-6" />
          </span>
          <h3 className="text-xl font-bold">{t("emptyTitle", { q })}</h3>
          <p className="max-w-xl text-text-2">{t("emptyBody")}</p>
          <Button asChild variant="outline">
            <Link href="/peluang">{t("showAll")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
