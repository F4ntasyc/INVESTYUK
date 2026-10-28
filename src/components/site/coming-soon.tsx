import { ArrowLeft, Hammer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { container } from "./container";

export type ComingSoonPage =
  | "potensi"
  | "sektor"
  | "peluangDetail"
  | "bandingkan"
  | "rekomendasi"
  | "prosedur"
  | "edukasi"
  | "faq"
  | "inquiry"
  | "lacak"
  | "tentang"
  | "kebijakanPrivasi"
  | "syarat"
  | "masuk"
  | "daftar"
  | "lupaPassword";

/** Halaman sementara untuk rute yang belum dibangun (tanpa 404). */
export async function ComingSoon({ page }: { page: ComingSoonPage }) {
  const t = await getTranslations("comingSoon");

  return (
    <section className={`${container} flex flex-col items-start gap-6 py-20 sm:py-28`}>
      <span className="flex size-14 items-center justify-center rounded-2xl bg-tint-blue text-icon-blue">
        <Hammer aria-hidden className="size-7" />
      </span>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {t(`pages.${page}`)}
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-text-2">{t("body")}</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">
            <ArrowLeft aria-hidden />
            {t("back")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/peluang">{t("browse")}</Link>
        </Button>
      </div>
    </section>
  );
}

export async function comingSoonMetadata(locale: Locale, page: ComingSoonPage) {
  const t = await getTranslations({ locale, namespace: "comingSoon" });
  return { title: t(`pages.${page}`) };
}
