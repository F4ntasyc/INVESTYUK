// Halaman uji fondasi (sementara). Akan diganti Beranda.
import { ArrowRight, Leaf, Search } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const otherLocale = locale === "id" ? "en" : "id";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Badge variant="official">{tc("officialSite")}</Badge>
        <Link
          href="/"
          locale={otherLocale}
          hrefLang={otherLocale}
          lang={otherLocale}
          className="-mr-4 inline-flex min-h-touch items-center rounded-full px-4 text-sm font-semibold text-blue underline-offset-4 hover:underline"
        >
          {tc("switchLanguage")}
        </Link>
      </div>

      <section className="flex flex-col gap-6">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-text-2">
          {t("intro")}
        </p>
        <p className="font-accent text-3xl text-blue">{t("accent")}</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button">
            <Search aria-hidden />
            {t("primaryAction")}
          </Button>
          <Button type="button" variant="outline">
            {t("secondaryAction")}
          </Button>
        </div>
      </section>

      <Card className="max-w-sm bg-section">
        <CardHeader className="gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-tint-green text-icon-green">
            <Leaf aria-hidden className="size-6" />
          </span>
          <CardTitle className="font-heading text-lg text-navy">
            {t("card.title")}
          </CardTitle>
          <CardDescription className="text-text-2">
            {t("card.body")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArrowRight aria-hidden className="size-5 text-navy" />
        </CardContent>
      </Card>
    </main>
  );
}
