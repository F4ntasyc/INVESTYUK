import { connection } from "next/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { FeaturedSection } from "@/components/home/featured-section";
import { Hero } from "@/components/home/hero";
import { QuickAccess } from "@/components/home/quick-access";
import { RecommendSection } from "@/components/home/recommend-section";
import { StatsStrip } from "@/components/home/stats-strip";
import { routing } from "@/i18n/routing";

// Beranda (PRD FR-PUB-01). Membaca database, jadi dirender saat request:
// `connection()` menghentikan prerender saat build (build tidak butuh DB).
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await connection();

  return (
    <>
      <Hero />
      <StatsStrip />
      <QuickAccess />
      <RecommendSection />
      <FeaturedSection />
    </>
  );
}
