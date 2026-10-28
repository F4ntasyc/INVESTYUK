import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Leaf,
  MapPin,
  MessageSquareMore,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "cn";
import { container } from "@/components/site/container";
import { Link } from "@/i18n/navigation";
import { sectorColorClasses } from "@/lib/sector-colors";

const items = [
  { key: "sektor", href: "/sektor", Icon: Leaf, color: "green" },
  { key: "peluang", href: "/peluang", Icon: BriefcaseBusiness, color: "purple" },
  { key: "lokasi", href: "/peluang", Icon: MapPin, color: "blue" },
  { key: "prosedur", href: "/prosedur", Icon: FileText, color: "orange" },
  { key: "inquiry", href: "/lacak", Icon: MessageSquareMore, color: "pink" },
  { key: "edukasi", href: "/edukasi", Icon: GraduationCap, color: "teal" },
] as const;

export async function QuickAccess() {
  const t = await getTranslations("home.quick");

  return (
    <section aria-labelledby="quick-title" className={`${container} pt-16 lg:pt-20`}>
      <h2 id="quick-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {t("title")}
      </h2>
      <p className="mt-2 text-base text-text-2">{t("subtitle")}</p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {items.map(({ key, href, Icon, color }) => (
          <li key={key}>
            {/* Seluruh kartu = satu tautan. */}
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-card border border-border bg-white p-4 transition-[box-shadow,border-color,transform] hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-card focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0 sm:p-5"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl",
                  sectorColorClasses[color],
                )}
              >
                <Icon aria-hidden className="size-6" />
              </span>
              <span className="font-heading text-base leading-snug font-bold text-navy">
                {t(`${key}.title`)}
              </span>
              <span className="text-sm leading-relaxed text-text-2">{t(`${key}.desc`)}</span>
              <ArrowRight
                aria-hidden
                className="mt-auto size-5 text-navy transition-transform group-hover:translate-x-1 group-hover:text-blue motion-reduce:transition-none"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
