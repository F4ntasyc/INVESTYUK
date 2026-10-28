import { Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { container, isSvg } from "@/components/site/container";
import { images } from "@/config/images";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  // Form GET biasa: tetap berfungsi tanpa JavaScript.
  const searchAction = getPathname({ href: "/peluang", locale });
  const examples = [t("example1"), t("example2"), t("example3"), t("example4")];

  const aiBadge = (
    <div className="flex items-center gap-3 rounded-full border border-white/25 bg-navy/85 py-2 pr-5 pl-2 text-left text-white">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-blue">
        <Sparkles aria-hidden className="size-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold">{t("aiBadgeTitle")}</span>
        <span className="text-[0.8125rem] text-slate-200">{t("aiBadgeItems")}</span>
      </span>
    </div>
  );

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy">
      <Image
        src={images.hero.src}
        alt={tc(images.hero.altKey)}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        unoptimized={isSvg(images.hero.src)}
      />
      {/* Overlay navy: ≥85% di area judul agar putih & sky lolos 4,5:1 di atas foto apa pun. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_37_69/0.88)_0%,rgb(11_37_69/0.85)_60%,rgb(11_37_69/0.74)_100%)]"
      />

      <div
        className={`${container} flex flex-col items-center pt-16 pb-28 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 sm:pt-20 lg:pt-24 lg:pb-36`}
      >
        <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">{t("eyebrow")}</p>
        <h1
          id="hero-title"
          className="mt-4 max-w-5xl text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")} <span className="text-sky">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white sm:text-lg">{t("subtitle")}</p>

        <form
          action={searchAction}
          method="get"
          role="search"
          className="mt-8 flex w-full max-w-3xl items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-[0_12px_40px_rgb(0_0_0/0.25)]"
        >
          <Sparkles aria-hidden className="size-5 shrink-0 text-blue" />
          <label htmlFor="hero-search" className="sr-only">
            {t("searchLabel")}
          </label>
          <input
            id="hero-search"
            name="q"
            type="search"
            required
            maxLength={100}
            placeholder={t("searchPlaceholder")}
            className="h-11 min-w-0 flex-1 bg-transparent text-base text-navy placeholder:text-text-2 focus-visible:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-blue px-5 font-semibold text-white transition-colors hover:bg-blue/90 focus-visible:ring-3 focus-visible:ring-sky focus-visible:outline-none sm:px-7"
          >
            <Search aria-hidden className="size-5" />
            <span className="sr-only sm:not-sr-only">{t("searchButton")}</span>
          </button>
        </form>

        <div className="mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <Sparkles aria-hidden className="size-4 text-sky" />
            {t("examplesLabel")}
          </span>
          <ul className="contents">
            {examples.map((example) => (
              <li key={example}>
                <Link
                  href={{ pathname: "/peluang", query: { q: example } }}
                  className="inline-flex min-h-touch items-center"
                >
                  <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[0.8125rem] text-white transition-colors hover:bg-white/20">
                    {example}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop: rata kanan di bawah contoh pencarian (posisi mockup); ponsel: di bawah search. */}
        <div className="mt-6 lg:mt-4 lg:self-end">{aiBadge}</div>
      </div>
    </section>
  );
}
