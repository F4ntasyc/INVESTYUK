// Akses data peluang untuk halaman publik. Hanya status PUBLISHED.
// Hasil sudah berupa data siap tampil (BigInt diformat jadi string), sehingga
// aman dikirim ke Client Component.
//
// Halaman yang memanggil fungsi di sini WAJIB memanggil `await connection()`
// (next/server) lebih dulu agar dirender saat request, bukan saat build.
import type { Prisma } from "@/generated/prisma/client";
import type { Locale } from "@/i18n/routing";
import { formatRupiah } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { toSectorColor, type SectorColor } from "@/lib/sector-colors";

export type OpportunityCardData = {
  id: number;
  slug: string;
  title: string;
  sectorName: string;
  sectorColor: SectorColor;
  districtName: string;
  value: string;
  imageSrc: string;
  imageAlt: string;
  clusterLabel: string | null;
};

const cardInclude = {
  sector: true,
  district: true,
  cluster: true,
  images: { orderBy: { sortOrder: "asc" }, take: 1 },
} satisfies Prisma.OpportunityInclude;

type OpportunityWithCard = Prisma.OpportunityGetPayload<{
  include: typeof cardInclude;
}>;

const PUBLISHED = { status: "PUBLISHED" } as const;

function toCard(o: OpportunityWithCard, locale: Locale): OpportunityCardData {
  const en = locale === "en";
  const image = o.images[0];
  return {
    id: o.id,
    slug: o.slug,
    title: en ? o.titleEn : o.titleId,
    sectorName: en ? o.sector.nameEn : o.sector.nameId,
    sectorColor: toSectorColor(o.sector.color),
    districtName: o.district.name,
    value: formatRupiah(o.investmentValue, locale),
    imageSrc: o.coverImageUrl ?? image?.url ?? "/images/hero.svg",
    imageAlt: (en ? image?.altEn : image?.altId) ?? (en ? o.titleEn : o.titleId),
    clusterLabel: o.cluster ? (en ? o.cluster.labelEn : o.cluster.labelId) : null,
  };
}

export async function getHomeStats() {
  const [opportunities, sectors, districts, inquiries] = await Promise.all([
    prisma.opportunity.count({ where: PUBLISHED }),
    prisma.sector.count(),
    prisma.district.count(),
    prisma.inquiry.count(),
  ]);
  return { opportunities, sectors, districts, inquiries };
}

export async function getFeaturedOpportunities(locale: Locale) {
  const rows = await prisma.opportunity.findMany({
    where: { ...PUBLISHED, featured: true },
    include: cardInclude,
    orderBy: { publishedAt: "asc" },
    take: 3,
  });
  return rows.map((o) => toCard(o, locale));
}

/**
 * Pencarian keyword SEDERHANA di judul & ringkasan (ID dan EN).
 * Collation MySQL utf8mb4_unicode_ci membuat `contains` tidak peka huruf besar.
 * TODO (Fase 2–3): filter sidebar, urutan, tampilan peta, dan smart search hybrid.
 */
export async function searchOpportunities(locale: Locale, query: string) {
  const q = query.trim().slice(0, 100);
  const where: Prisma.OpportunityWhereInput = q
    ? {
        ...PUBLISHED,
        OR: [
          { titleId: { contains: q } },
          { titleEn: { contains: q } },
          { summaryId: { contains: q } },
          { summaryEn: { contains: q } },
        ],
      }
    : PUBLISHED;
  const rows = await prisma.opportunity.findMany({
    where,
    include: cardInclude,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
  return rows.map((o) => toCard(o, locale));
}

export async function getRecommendOptions(locale: Locale) {
  const [sectors, districts] = await Promise.all([
    prisma.sector.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.district.findMany({ orderBy: { name: "asc" } }),
  ]);
  return {
    sectors: sectors.map((s) => ({
      value: s.slug,
      label: locale === "en" ? s.nameEn : s.nameId,
    })),
    districts: districts.map((d) => ({ value: d.slug, label: d.name })),
  };
}

export type BudgetRange = "kecil" | "menengah" | "besar";

const MILIAR = BigInt(1_000_000_000);
const budgetWhere: Record<BudgetRange, Prisma.BigIntFilter> = {
  kecil: { lt: MILIAR },
  menengah: { gte: MILIAR, lte: BigInt(25) * MILIAR },
  besar: { gt: BigInt(25) * MILIAR },
};

/**
 * Rekomendasi SEMENTARA: filter sederhana, urut unggulan lalu nilai terkecil.
 * TODO (Fase 3): ganti dengan scoring rule-based sesuai PRD 5.2
 * (bobot kecocokan sektor, kecamatan, dan kisaran modal) + alasan per skor.
 */
export async function recommendOpportunities(
  locale: Locale,
  filters: { sector?: string; district?: string; budget?: BudgetRange },
) {
  const rows = await prisma.opportunity.findMany({
    where: {
      ...PUBLISHED,
      ...(filters.sector ? { sector: { slug: filters.sector } } : {}),
      ...(filters.district ? { district: { slug: filters.district } } : {}),
      ...(filters.budget ? { investmentValue: budgetWhere[filters.budget] } : {}),
    },
    include: cardInclude,
    orderBy: [{ featured: "desc" }, { investmentValue: "asc" }],
    take: 3,
  });
  return rows.map((o) => ({ card: toCard(o, locale), featured: o.featured }));
}
