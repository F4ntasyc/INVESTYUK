import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "cn";
import { Link } from "@/i18n/navigation";
import type { OpportunityCardData } from "@/lib/data/opportunities";
import { sectorColorClasses } from "@/lib/sector-colors";
import { CompareButton } from "./compare-button";
import { isSvg } from "./container";

type Props = {
  opportunity: OpportunityCardData;
  /** Satu baris alasan (dipakai di hasil rekomendasi). */
  reason?: string;
  className?: string;
  priority?: boolean;
};

// Kartu peluang (PRD 8.2). Seluruh kartu dapat diklik lewat tautan judul yang
// "direntangkan"; tombol Bandingkan berada di atasnya (z-10), jadi tidak ada
// tautan bersarang. Bisa dipakai di Server maupun Client Component.
export function OpportunityCard({ opportunity: o, reason, className, priority }: Props) {
  const t = useTranslations("peluang.card");

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-[16/8] bg-section">
        <Image
          src={o.imageSrc}
          alt={o.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
          className="object-cover"
          unoptimized={isSvg(o.imageSrc)}
          priority={priority}
        />
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold",
            sectorColorClasses[o.sectorColor],
          )}
        >
          {o.sectorName}
        </span>
        {o.clusterLabel ? (
          <span className="absolute top-3 left-3 rounded-full bg-navy/90 px-2.5 py-1 text-xs font-semibold text-white">
            {t("cluster", { name: o.clusterLabel })}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 pb-2">
        <h3 className="text-base leading-snug font-bold">
          <Link
            href={`/peluang/${o.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {o.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-text-2">
          <MapPin aria-hidden className="size-4 shrink-0" />
          {o.districtName}
        </p>
        {reason ? (
          <p className="rounded-lg bg-section px-3 py-2 text-sm text-navy">{reason}</p>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="flex flex-col">
            <span className="sr-only">{t("value")}: </span>
            <span className="text-base font-bold text-navy tabular-nums">{o.value}</span>
          </p>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-blue transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white"
          >
            <ArrowRight className="size-5" />
          </span>
        </div>
      </div>
      <div className="px-1 pb-1">
        <CompareButton id={o.id} />
      </div>
    </article>
  );
}
