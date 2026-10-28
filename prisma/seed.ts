/**
 * Seed data FIKTIF INVESTYUK (dua bahasa). Jalankan: npm run db:seed
 *
 * Aman dijalankan berulang (idempotent):
 * - agencies              : upsert berdasarkan `id` tetap (tabel tanpa kolom unik lain)
 * - sectors, districts,
 *   opportunities, articles: upsert berdasarkan `slug`
 * - users                 : upsert berdasarkan `email`
 * - inquiries             : upsert berdasarkan `trackingCode`
 * - saved_opportunities   : upsert berdasarkan kunci gabungan (userId, opportunityId)
 * - opportunity_images, opportunity_requirements, inquiry_events:
 *                           hapus milik induknya lalu buat ulang, dalam satu transaksi
 * - procedure_steps, faqs : hapus semua lalu buat ulang, dalam satu transaksi
 *                           (tabel tanpa kolom unik; perubahan manual di tabel ini ikut tertimpa)
 *
 * Tidak di-seed: cluster_runs, clusters, search_logs, audit_logs,
 * deletion_requests, verification_tokens, accounts.
 *
 * Seed memakai PrismaClient sendiri (bukan singleton Next.js di src/lib/prisma.ts).
 */
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { agencies, type AgencyKey } from "./seed-data/agencies";
import { articles } from "./seed-data/articles";
import { districts } from "./seed-data/districts";
import { faqs } from "./seed-data/faqs";
import { inquiries } from "./seed-data/inquiries";
import { opportunities } from "./seed-data/opportunities";
import { procedures } from "./seed-data/procedures";
import { sectors } from "./seed-data/sectors";
import { savedOpportunities, users, type UserKey } from "./seed-data/users";

const TX = { timeout: 60_000, maxWait: 10_000 };

function requireEnv(name: string, hint: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`\n[seed] ${name} belum diisi.\n${hint}\n`);
    process.exit(1);
  }
  return value;
}

const password = requireEnv(
  "SEED_TEST_PASSWORD",
  "Tambahkan SEED_TEST_PASSWORD ke .env (lihat .env.example), atau set sementara di PowerShell:\n" +
    '  $env:SEED_TEST_PASSWORD="Uji-Investyuk-2026"',
);
const databaseUrl = requireEnv(
  "DATABASE_URL",
  "Isi DATABASE_URL di .env (lihat README, bagian Setup pertama kali).",
);

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(databaseUrl) });

async function main() {
  // --- Dinas ---------------------------------------------------------------
  for (const { key: _key, ...a } of agencies) {
    void _key;
    await prisma.agency.upsert({ where: { id: a.id }, update: a, create: a });
  }
  const agencyId = (key: AgencyKey) => agencies.find((a) => a.key === key)!.id;

  // --- Sektor & kecamatan ---------------------------------------------------
  const sectorIds = new Map<string, number>();
  for (const { agency, ...s } of sectors) {
    const data = { ...s, agencyId: agencyId(agency) };
    const row = await prisma.sector.upsert({
      where: { slug: s.slug },
      update: data,
      create: data,
    });
    sectorIds.set(s.slug, row.id);
  }

  const districtIds = new Map<string, number>();
  for (const d of districts) {
    const row = await prisma.district.upsert({
      where: { slug: d.slug },
      update: d,
      create: d,
    });
    districtIds.set(d.slug, row.id);
  }

  // --- Akun uji ---------------------------------------------------------------
  const passwordHash = await bcrypt.hash(password, 12);
  const userIds = new Map<UserKey, string>();
  for (const u of users) {
    const data = {
      email: u.email,
      name: u.name,
      role: u.role,
      agencyId: u.agency ? agencyId(u.agency) : null,
      passwordHash,
      isActive: true,
    };
    const row = await prisma.user.upsert({
      where: { email: u.email },
      update: data,
      create: data,
    });
    userIds.set(u.key, row.id);
  }
  const userId = (key: UserKey) => userIds.get(key)!;

  // --- Peluang + gambar + persyaratan ----------------------------------------
  const opportunityIds = new Map<string, number>();
  for (const o of opportunities) {
    const data = {
      slug: o.slug,
      titleId: o.titleId,
      titleEn: o.titleEn,
      summaryId: o.summaryId,
      summaryEn: o.summaryEn,
      descriptionId: o.descriptionId,
      descriptionEn: o.descriptionEn,
      sectorId: sectorIds.get(o.sector)!,
      districtId: districtIds.get(o.district)!,
      address: o.address,
      latitude: o.latitude,
      longitude: o.longitude,
      investmentValue: o.investmentValue,
      estRoiPercent: o.estRoiPercent,
      paybackYears: o.paybackYears,
      landAreaHa: o.landAreaHa,
      jobsEstimate: o.jobsEstimate,
      coverImageUrl: o.coverImageUrl,
      featured: o.featured,
      status: o.status,
      publishedAt: o.publishedAt,
    };
    const id = await prisma.$transaction(async (tx) => {
      const row = await tx.opportunity.upsert({
        where: { slug: o.slug },
        update: data,
        create: data,
      });
      await tx.opportunityImage.deleteMany({ where: { opportunityId: row.id } });
      await tx.opportunityImage.createMany({
        data: o.images.map((img, sortOrder) => ({
          ...img,
          opportunityId: row.id,
          sortOrder,
        })),
      });
      await tx.opportunityRequirement.deleteMany({
        where: { opportunityId: row.id },
      });
      await tx.opportunityRequirement.createMany({
        data: o.requirements.map((r, sortOrder) => ({
          ...r,
          opportunityId: row.id,
          sortOrder,
        })),
      });
      return row.id;
    }, TX);
    opportunityIds.set(o.slug, id);
  }

  // --- Konten tanpa kolom unik: hapus lalu buat ulang ------------------------
  await prisma.$transaction(
    async (tx) => {
      await tx.procedureStep.deleteMany();
      await tx.procedureStep.createMany({ data: procedures });
      await tx.faq.deleteMany();
      await tx.faq.createMany({ data: faqs });
    },
    TX,
  );

  // --- Artikel ----------------------------------------------------------------
  for (const a of articles) {
    const data = { ...a, status: "PUBLISHED" as const, authorId: userId("admin") };
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: data,
      create: data,
    });
  }

  // --- Inquiry + timeline -----------------------------------------------------
  for (const { events, opportunity, user, agency, ...i } of inquiries) {
    const data = {
      ...i,
      opportunityId: opportunity ? opportunityIds.get(opportunity)! : null,
      userId: user ? userId(user) : null,
      assignedAgencyId: agency ? agencyId(agency) : null,
    };
    await prisma.$transaction(async (tx) => {
      const row = await tx.inquiry.upsert({
        where: { trackingCode: i.trackingCode },
        update: data,
        create: data,
      });
      await tx.inquiryEvent.deleteMany({ where: { inquiryId: row.id } });
      await tx.inquiryEvent.createMany({
        data: events.map(({ actor, ...e }) => ({
          ...e,
          inquiryId: row.id,
          actorId: actor ? userId(actor) : null,
        })),
      });
    }, TX);
  }

  // --- Peluang tersimpan --------------------------------------------------------
  for (const s of savedOpportunities) {
    const key = {
      userId: userId(s.user),
      opportunityId: opportunityIds.get(s.opportunity)!,
    };
    await prisma.savedOpportunity.upsert({
      where: { userId_opportunityId: key },
      update: {},
      create: key,
    });
  }

  // --- Ringkasan ----------------------------------------------------------------
  const counts = {
    agencies: await prisma.agency.count(),
    sectors: await prisma.sector.count(),
    districts: await prisma.district.count(),
    opportunities: await prisma.opportunity.count(),
    opportunity_images: await prisma.opportunityImage.count(),
    opportunity_requirements: await prisma.opportunityRequirement.count(),
    procedure_steps: await prisma.procedureStep.count(),
    faqs: await prisma.faq.count(),
    articles: await prisma.article.count(),
    users: await prisma.user.count(),
    inquiries: await prisma.inquiry.count(),
    inquiry_events: await prisma.inquiryEvent.count(),
    saved_opportunities: await prisma.savedOpportunity.count(),
  };
  console.log("\n[seed] Selesai. Jumlah baris per tabel:");
  console.table(counts);
}

main()
  .catch((error) => {
    console.error("[seed] Gagal:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
