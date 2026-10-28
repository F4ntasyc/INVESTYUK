// Sementara: halaman "Segera hadir" sampai fitur ini dibangun.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ComingSoon, comingSoonMetadata } from "@/components/site/coming-soon";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/lacak">): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale)
    ? comingSoonMetadata(locale, "lacak")
    : {};
}

export default async function Page({ params }: PageProps<"/[locale]/lacak">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ComingSoon page="lacak" />;
}
