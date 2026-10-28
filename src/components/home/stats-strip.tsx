import { Building2, MapPin, MessageSquareText, TrendingUp } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { container } from "@/components/site/container";
import { getHomeStats } from "@/lib/data/opportunities";
import { formatNumber } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

// FR-PUB-02: angka dihitung dari database, ditampilkan apa adanya (tanpa "+").
export async function StatsStrip() {
  const t = await getTranslations("home.stats");
  const locale = (await getLocale()) as Locale;
  const stats = await getHomeStats();

  const items = [
    { key: "opportunities", value: stats.opportunities, Icon: TrendingUp },
    { key: "sectors", value: stats.sectors, Icon: Building2 },
    { key: "districts", value: stats.districts, Icon: MapPin },
    { key: "inquiries", value: stats.inquiries, Icon: MessageSquareText },
  ] as const;

  return (
    <section aria-labelledby="stats-title" className={`${container} relative z-10 -mt-20 lg:-mt-24`}>
      <h2 id="stats-title" className="sr-only">
        {t("title")}
      </h2>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border shadow-card-hover md:grid-cols-4">
        {items.map(({ key, value, Icon }) => (
          <li key={key} className="flex flex-col gap-3 bg-white p-5 lg:flex-row lg:items-start lg:gap-4 lg:p-7">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-tint-blue text-icon-blue lg:size-14">
              <Icon aria-hidden className="size-6 lg:size-7" />
            </span>
            <div className="flex flex-col">
              <p className="order-2 text-sm font-semibold text-navy">{t(`${key}.label`)}</p>
              <p className="order-1 font-heading text-3xl font-extrabold text-navy tabular-nums lg:text-4xl">
                {formatNumber(value, locale)}
              </p>
              <p className="order-3 mt-0.5 text-sm leading-snug text-text-2">{t(`${key}.desc`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
