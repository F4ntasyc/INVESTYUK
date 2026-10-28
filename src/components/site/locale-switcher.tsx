"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "cn";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Props = { names: Record<Locale, string>; className?: string };

const short: Record<Locale, string> = { id: "ID", en: "EN" };

function Links({ names, className, query }: Props & { query?: Record<string, string> }) {
  const pathname = usePathname();
  const current = useLocale() as Locale;

  return (
    <div className={cn("flex items-center text-sm font-semibold", className)}>
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden className="px-0.5 text-text-2">
              |
            </span>
          ) : null}
          {locale === current ? (
            <span
              aria-current="true"
              className="inline-flex min-h-touch min-w-10 items-center justify-center text-navy"
            >
              {short[locale]}
              <span className="sr-only"> {names[locale]}</span>
            </span>
          ) : (
            <Link
              href={{ pathname, query }}
              locale={locale}
              hrefLang={locale}
              className="inline-flex min-h-touch min-w-10 items-center justify-center rounded-full font-medium text-text-2 hover:text-blue"
            >
              <span lang={locale}>{short[locale]}</span>
              <span lang={locale} className="sr-only">
                {" "}
                {names[locale]}
              </span>
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

function LinksWithQuery(props: Props) {
  const params = useSearchParams();
  const query = Object.fromEntries(params.entries());
  return <Links {...props} query={query} />;
}

/** ID | EN, tetap di halaman yang sama (termasuk query, mis. ?q=...). */
export function LocaleSwitcher(props: Props) {
  return (
    <Suspense fallback={<Links {...props} />}>
      <LinksWithQuery {...props} />
    </Suspense>
  );
}
