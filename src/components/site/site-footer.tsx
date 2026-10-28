import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { container } from "./container";

type FooterLink = { href: string | { pathname: string; query: Record<string, string> }; label: string };

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t("explore"),
      links: [
        { href: "/sektor", label: t("sektor") },
        { href: "/peluang", label: t("peluang") },
        { href: "/rekomendasi", label: t("rekomendasi") },
        { href: { pathname: "/peluang", query: { tampilan: "peta" } }, label: t("peta") },
      ],
    },
    {
      title: t("guide"),
      links: [
        { href: "/prosedur", label: t("prosedur") },
        { href: "/edukasi", label: t("edukasi") },
        { href: "/faq", label: t("faq") },
        { href: "/lacak", label: t("lacak") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/kebijakan-privasi", label: t("privasi") },
        { href: "/syarat", label: t("syarat") },
        { href: "/tentang", label: t("tentang") },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-slate-200">
      <div className={`${container} py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr_1.2fr]">
          {/* Identitas */}
          <div className="flex flex-col gap-4">
            <p className="font-heading text-2xl font-extrabold tracking-tight text-white">INVESTYUK</p>
            <div>
              <p className="font-semibold text-white">{t("government")}</p>
              <p className="text-sm">{t("agency")}</p>
            </div>
            <Badge variant="official" className="px-3 py-1 text-sm">
              {tc("officialSite")}
            </Badge>
            <p className="max-w-sm text-sm leading-relaxed">{t("about")}</p>
          </div>

          {/* Tautan */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-2 text-sm font-semibold tracking-wide text-sky">{col.title}</h2>
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-touch items-center text-sm text-slate-200 underline-offset-4 hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Kontak */}
          <div>
            <h2 className="mb-2 text-sm font-semibold tracking-wide text-sky">{t("contact")}</h2>
            <address className="flex flex-col gap-3 text-sm not-italic">
              <p className="flex gap-2">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-sky" />
                <span>
                  <span className="sr-only">{t("addressLabel")}: </span>
                  {t("address")}
                </span>
              </p>
              <a href={`mailto:${t("email")}`} className="flex min-h-touch items-center gap-2 hover:text-white hover:underline">
                <Mail aria-hidden className="size-4 shrink-0 text-sky" />
                <span className="sr-only">{t("emailLabel")}: </span>
                {t("email")}
              </a>
              <a
                href={`tel:${t("phone").replaceAll("-", "")}`}
                className="flex min-h-touch items-center gap-2 tabular-nums hover:text-white hover:underline"
              >
                <Phone aria-hidden className="size-4 shrink-0 text-sky" />
                <span className="sr-only">{t("phoneLabel")}: </span>
                {t("phone")}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm">
          <p className="font-semibold text-white">{t("academic")}</p>
          <p>{t("disclaimer")}</p>
          <p className="text-slate-300">{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
