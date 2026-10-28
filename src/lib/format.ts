import type { Locale } from "@/i18n/routing";

const intlLocale: Record<Locale, string> = { id: "id-ID", en: "en-US" };

/** Format Rupiah sesuai bahasa. Intl.NumberFormat menerima BigInt langsung. */
export function formatRupiah(value: bigint, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(value);
}

/** Gabung daftar sesuai bahasa: "sektor, kecamatan, dan kisaran modal". */
export function formatList(items: string[], locale: Locale): string {
  return new Intl.ListFormat(intlLocale[locale], {
    style: "long",
    type: "conjunction",
  }).format(items);
}
