import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { container, isSvg } from "@/components/site/container";
import { OpportunityCard } from "@/components/site/opportunity-card";
import { images } from "@/config/images";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFeaturedOpportunities } from "@/lib/data/opportunities";

export async function FeaturedSection() {
  const t = await getTranslations("home.featured");
  const ti = await getTranslations("home.inquiryCta");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  const featured = await getFeaturedOpportunities(locale);

  return (
    <div className={`${container} grid gap-5 py-16 lg:py-20 xl:grid-cols-[minmax(0,1fr)_20rem]`}>
      {/* Panel biru muda berisi 3 kartu peluang (seperti mockup). */}
      <section aria-labelledby="featured-title" className="min-w-0 rounded-card bg-tint-blue/60 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h2 id="featured-title" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              <Sparkles aria-hidden className="size-6 text-icon-purple" />
              {t("title")}
            </h2>
            <p className="mt-1 text-sm text-text-2">{t("subtitle")}</p>
          </div>
          <Link
            href="/peluang"
            className="inline-flex min-h-touch items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
          >
            {t("seeAll")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        {/* Ponsel: geser horizontal dengan snap; tablet ke atas: grid 3 kolom. */}
        <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 xl:mx-0 xl:grid xl:grid-cols-3 xl:overflow-visible xl:px-0 xl:pb-0">
          {featured.map((o) => (
            <li key={o.id} className="flex w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-auto">
              <OpportunityCard opportunity={o} className="w-full" />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-text-2">{t("note")}</p>
      </section>

      {/* Kartu ajakan inquiry */}
      <aside
        aria-labelledby="inquiry-cta-title"
        className="relative flex flex-col overflow-hidden rounded-card bg-tint-blue/60 p-6"
      >
        <h2 id="inquiry-cta-title" className="text-xl font-extrabold tracking-tight">
          {ti("title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-2">{ti("body")}</p>
        <Button asChild className="mt-5 self-start">
          <Link href="/inquiry">
            <MessageSquareText aria-hidden />
            {ti("button")}
            <ArrowRight aria-hidden />
          </Link>
        </Button>

        <div className="mt-6 flex flex-1 flex-col justify-end">
          <p className="-rotate-6 self-end text-right font-accent text-2xl leading-tight text-navy">
            {ti("accentLine1")}
            <br />
            <span className="text-xl">{ti("accentLine2")}</span>
            <svg
              aria-hidden
              viewBox="0 0 40 30"
              className="ml-auto block h-6 w-8 text-navy"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M34 2c2 12-6 22-24 22" />
              <path d="M14 18l-5 6 7 3" />
            </svg>
          </p>
          <Image
            src={images.inquiryGedung.src}
            alt={tc(images.inquiryGedung.altKey)}
            width={images.inquiryGedung.width}
            height={images.inquiryGedung.height}
            className="-mb-6 w-full max-w-80 self-center xl:-mx-6 xl:w-[calc(100%+3rem)] xl:max-w-none"
            unoptimized={isSvg(images.inquiryGedung.src)}
          />
        </div>
      </aside>
    </div>
  );
}
