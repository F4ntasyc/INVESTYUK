# INVESTYUK — Rancangan Database (ERD)

| | |
|---|---|
| **Proyek** | INVESTYUK (Investment Information & Intelligence), Kabupaten ABC |
| **Konteks** | Tugas besar Manajemen Proyek, S1 Informatika |
| **Versi** | 0.1 (draf) |
| **Tanggal** | 27 Oktober 2026 |
| **Basis data** | MySQL 8, diakses lewat Prisma ORM |

---

## 1. Ringkasan

Database terdiri dari **20 tabel** dalam 6 kelompok:

| Kelompok | Tabel |
|---|---|
| Pengguna & autentikasi | `users`, `accounts`, `verification_tokens` |
| Organisasi & referensi | `agencies`, `sectors`, `districts` |
| Peluang investasi | `opportunities`, `opportunity_images`, `opportunity_requirements` |
| Sistem Cerdas (AI) | `cluster_runs`, `clusters`, `search_logs` (embedding disimpan di `opportunities`) |
| Konten | `procedure_steps`, `faqs`, `articles` |
| Inquiry & kepatuhan | `inquiries`, `inquiry_events`, `saved_opportunities`, `audit_logs`, `deletion_requests` |

## 2. Asumsi & konvensi

- **Dua bahasa (ID/EN)** disimpan sebagai pasangan kolom `xxxId` / `xxxEn`. Cukup untuk dua bahasa; kalau bahasa bertambah, pindah ke tabel terjemahan.
- **Sesi memakai JWT** (Auth.js), jadi tidak ada tabel `sessions`.
- **Penamaan**: tabel `snake_case` jamak (lewat `@@map`), kolom `camelCase` mengikuti Prisma.
- **ID**: `String cuid()` untuk `users` dan `accounts` (kebutuhan adapter Auth.js), `Int autoincrement` untuk tabel lain. Identitas publik inquiry adalah `trackingCode`, bukan `id`.
- **Nilai uang** disimpan dalam Rupiah sebagai `BigInt`. `BigInt` tidak bisa langsung di-`JSON.stringify`, jadi ubah ke string/number saat dikirim ke klien.
- **Seluruh angka peluang** (nilai investasi, ROI, balik modal) adalah data fiktif untuk simulasi.
- Daftar tabel ini disusun dari keputusan desain yang sudah disepakati; kolom bisa disesuaikan saat implementasi.

## 3. Diagram ERD

```mermaid
erDiagram
    USERS ||--o{ ACCOUNTS : "punya akun OAuth"
    AGENCIES |o--o{ USERS : "staf dinas"
    AGENCIES ||--o{ SECTORS : "membina"
    SECTORS ||--o{ OPPORTUNITIES : "mengelompokkan"
    DISTRICTS ||--o{ OPPORTUNITIES : "lokasi"
    OPPORTUNITIES ||--o{ OPPORTUNITY_IMAGES : "galeri"
    OPPORTUNITIES ||--o{ OPPORTUNITY_REQUIREMENTS : "persyaratan"
    CLUSTER_RUNS ||--o{ CLUSTERS : "menghasilkan"
    CLUSTERS |o--o{ OPPORTUNITIES : "kelompok"
    USERS |o--o{ INQUIRIES : "mengajukan"
    OPPORTUNITIES |o--o{ INQUIRIES : "diminati"
    AGENCIES |o--o{ INQUIRIES : "ditugaskan"
    INQUIRIES ||--o{ INQUIRY_EVENTS : "timeline"
    USERS |o--o{ INQUIRY_EVENTS : "aktor"
    USERS ||--o{ SAVED_OPPORTUNITIES : "menyimpan"
    OPPORTUNITIES ||--o{ SAVED_OPPORTUNITIES : "disimpan"
    USERS |o--o{ ARTICLES : "penulis"
    USERS |o--o{ AUDIT_LOGS : "aktor"
    USERS |o--o{ CLUSTER_RUNS : "pembuat"
```

> Tabel `search_logs`, `procedure_steps`, `faqs`, `verification_tokens`, dan `deletion_requests` berdiri sendiri (tanpa foreign key), sehingga tidak tampak di diagram.

## 4. Daftar tabel

### 4.1 Pengguna & autentikasi

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `users` | Semua akun (investor, dinas, admin) | `email` (unik), `passwordHash` (kosong jika hanya Google), `role`, `agencyId` (untuk dinas), `isActive` |
| `accounts` | Akun OAuth (Google) milik user, format adapter Auth.js | `provider`, `providerAccountId` |
| `verification_tokens` | Token verifikasi email dan reset password | `token`, `expires` |

### 4.2 Organisasi & referensi

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `agencies` | Dinas/OPD pembina sektor | `nameId/En`, `email`, `phone` |
| `sectors` | Sektor unggulan (6–8 data) | `slug`, `nameId/En`, `descriptionId/En`, `agencyId`, `icon`, `color` |
| `districts` | Kecamatan (8–10 data) | `slug`, `name`, `latitude`, `longitude` |

### 4.3 Peluang investasi

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `opportunities` | Data utama peluang (±40 data) | `slug`, `titleId/En`, `summaryId/En`, `descriptionId/En`, `sectorId`, `districtId`, `latitude/longitude`, **fitur numerik K-Means** (`investmentValue`, `estRoiPercent`, `paybackYears`, `landAreaHa`, `jobsEstimate`), `featured`, `status`, `clusterId`, **embedding** (`embedding`, `embeddingModel`, `embeddingHash`) |
| `opportunity_images` | Galeri foto | `url`, `altId/En`, `sortOrder` |
| `opportunity_requirements` | Persyaratan dan dokumen per peluang | `textId/En`, `sortOrder` |

### 4.4 Sistem Cerdas (AI)

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `cluster_runs` | Satu kali eksekusi K-Means (riwayat eksperimen untuk dokumentasi metode) | `k`, `features`, `normalization`, `inertia`, `silhouette`, `isActive` |
| `clusters` | Hasil klaster per eksekusi, diberi nama manual | `runId`, `index`, `labelId/En`, `centroid` |
| `search_logs` | Log pencarian **anonim** untuk statistik dan evaluasi | `queryText`, `parsedFilters`, `resultCount`, `method`, `durationMs` (tanpa referensi ke user) |

### 4.5 Konten

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `procedure_steps` | Langkah prosedur investasi | `stepOrder`, `titleId/En`, `contentId/En` |
| `faqs` | Pertanyaan umum | `questionId/En`, `answerId/En`, `sortOrder` |
| `articles` | Konten edukasi investasi | `slug`, `titleId/En`, `contentId/En` (Markdown), `category`, `status`, `authorId` |

### 4.6 Inquiry & kepatuhan

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `inquiries` | Pertanyaan investor (dengan atau tanpa akun) | `trackingCode` (unik), `name`, `email`, `phone`, `organization`, `message`, `opportunityId`, `userId`, `assignedAgencyId`, `status`, `consentAt`, `consentVersion`, `anonymizedAt` |
| `inquiry_events` | Timeline sekaligus balasan | `type`, `fromStatus`, `toStatus`, `message`, `isPublic` (false = catatan internal), `actorId` |
| `saved_opportunities` | Peluang tersimpan milik investor yang login | kunci gabungan `userId` + `opportunityId` |
| `audit_logs` | Jejak akses/perubahan data sensitif | `actorId`, `action`, `entityType`, `entityId`, `metadata`, `ipHash` |
| `deletion_requests` | Permintaan hapus/anonimkan data (UU PDP) | `email`, `trackingCode`, `status`, `processedAt`, `processedBy` |

## 5. Aturan bisnis & hak akses data

**Alur status inquiry:** `NEW → IN_PROGRESS → REPLIED → DONE`. Setiap perubahan status, penugasan, dan balasan dicatat sebagai baris di `inquiry_events` dan memicu email ke investor.

**Kode tracking:** acak, minimal 40 bit entropi (misalnya `INV-7K3M-9QXA-2T`), dibuat dengan generator acak yang aman (crypto). Pelacakan publik **wajib kode + email yang sama**, supaya kode tidak bisa ditebak orang lain.

**Cakupan akses per peran:**

| Peran | Peluang | Inquiry |
|---|---|---|
| Publik | Hanya `PUBLISHED` | Hanya miliknya sendiri lewat kode + email |
| Investor (login) | Sama dengan publik + `saved_opportunities` | Inquiry dengan `userId` miliknya |
| Dinas | Peluang dengan `sector.agencyId` = `user.agencyId` | Inquiry dengan `assignedAgencyId` = `user.agencyId` |
| Admin | Semua | Semua, plus penugasan ke dinas |

**Perlindungan data pribadi (level B):**
- Daftar inquiry menampilkan email/telepon yang di-*mask* (`a***@gmail.com`). Membuka detail kontak menulis baris `audit_logs` (`VIEW_INQUIRY_CONTACT`).
- Setiap inquiry menyimpan bukti persetujuan: `consentAt` dan `consentVersion` (versi Kebijakan Privasi).
- **Anonimisasi** (permintaan hapus): `name`, `email`, `phone`, `organization` ditimpa placeholder (misalnya `Dihapus`, `anonim-<id>@invalid`), `message` dikosongkan, `anonymizedAt` diisi. Statistik tetap utuh.
- Opsional: inquiry berstatus `DONE` lebih dari 24 bulan dianonimkan otomatis.
- `search_logs` tidak menyimpan identitas apa pun.

**Inquiry tamu → akun:** saat investor mendaftar dengan email yang terverifikasi, inquiry lama dengan email sama dan `userId` kosong bisa ditautkan.

## 6. Catatan fitur AI pada database

**Smart search (hybrid):**
- `embedding` menyimpan vektor (±384 angka) sebagai JSON. Karena datanya hanya ±40 baris, kemiripan kosinus dihitung di Node, tanpa ekstensi vektor.
- `embeddingHash` = hash dari teks sumber (judul + ringkasan + deskripsi, kedua bahasa). Embedding dibuat ulang hanya jika hash berubah. `embeddingModel` mencatat model yang dipakai.
- Pencarian keyword/fuzzy (fallback) berjalan di Node (misalnya Fuse.js) atas kolom judul/ringkasan. Jika nanti perlu, tambahkan indeks FULLTEXT lewat migrasi SQL.
- Pemahaman kueri bahasa alami memerlukan kamus sektor/kecamatan; ambil langsung dari `sectors.nameId/En` dan `districts.name`.

**Rekomendasi:**
- Rule-based: skor berbobot dari kecocokan `sectorId`, `districtId`, dan kisaran `investmentValue`.
- Content-based ("Peluang Serupa"): kemiripan kosinus antar `embedding`, digabung dengan kemiripan fitur numerik yang sudah dinormalisasi.

**K-Means:**
- Fitur: `investmentValue`, `estRoiPercent`, `paybackYears`, `jobsEstimate`, `landAreaHa`. `investmentValue` bersebaran miring, jadi sebaiknya di-log-transform sebelum normalisasi min-max.
- Setiap eksekusi menulis satu `cluster_runs` (parameter, normalisasi, inertia, silhouette) dan `clusters` (pusat klaster + nama manual). Hanya satu `cluster_runs.isActive = true`.
- Menjalankan ulang: buat `cluster_runs` baru, lalu perbarui `opportunities.clusterId` dalam satu transaksi.

## 7. Perintah awal

Setup aktual di repo (Windows PowerShell). Prisma **7.10.1 dikunci** dan **tidak** memakai `prisma init`:

- Paket dipasang dengan versi tepat: `npm install --save-exact prisma@7.10.1 dotenv` (dev) dan `npm install --save-exact @prisma/client@7.10.1 @prisma/adapter-mariadb@7.10.1`. Anggota tim cukup menjalankan `npm install`.
- Konfigurasi CLI ada di `prisma7.config.ts` (schema `prisma/schema.prisma`, migrasi `prisma/migrations`, URL dari `DATABASE_URL`).
- `schema.prisma` memakai generator `prisma-client` dengan output `src/generated/prisma` (di-ignore git); `datasource` tidak lagi berisi `url`.
- Aplikasi terhubung lewat adapter `PrismaMariaDb` yang menerima `DATABASE_URL` langsung (lihat `src/lib/prisma.ts`).
- MySQL berjalan di Docker Compose dengan port host **3307**.

```powershell
npm install
Copy-Item .env.example .env
docker compose up -d
npm run db:migrate
npm run db:generate
```

`npm install` sudah menjalankan `prisma generate` lewat skrip `postinstall`; `npm run db:generate` hanya diperlukan bila `schema.prisma` berubah. Seed data belum tersedia.

Contoh `DATABASE_URL`: `mysql://root:password@localhost:3307/investyuk`

## 8. Lampiran: `schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "mysql"
}

// ===================== ENUM =====================

enum Role {
  INVESTOR
  DINAS
  ADMIN
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum InquiryStatus {
  NEW
  IN_PROGRESS
  REPLIED
  DONE
}

enum InquiryEventType {
  CREATED
  STATUS_CHANGED
  ASSIGNED
  REPLIED
  NOTE
}

enum DeletionStatus {
  PENDING
  DONE
  REJECTED
}

// ============ PENGGUNA & AUTENTIKASI ============

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  role          Role      @default(INVESTOR)
  agencyId      Int?
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  agency        Agency?            @relation(fields: [agencyId], references: [id])
  accounts      Account[]
  inquiries     Inquiry[]
  inquiryEvents InquiryEvent[]
  saved         SavedOpportunity[]
  articles      Article[]
  auditLogs     AuditLog[]
  clusterRuns   ClusterRun[]

  @@index([agencyId])
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ============ ORGANISASI & REFERENSI ============

model Agency {
  id     Int     @id @default(autoincrement())
  nameId String
  nameEn String
  email  String?
  phone  String?

  users     User[]
  sectors   Sector[]
  inquiries Inquiry[]

  @@map("agencies")
}

model Sector {
  id            Int     @id @default(autoincrement())
  slug          String  @unique
  nameId        String
  nameEn        String
  descriptionId String  @db.Text
  descriptionEn String  @db.Text
  icon          String?
  color         String?
  sortOrder     Int     @default(0)
  agencyId      Int

  agency        Agency        @relation(fields: [agencyId], references: [id])
  opportunities Opportunity[]

  @@index([agencyId])
  @@map("sectors")
}

model District {
  id        Int     @id @default(autoincrement())
  slug      String  @unique
  name      String
  latitude  Decimal @db.Decimal(9, 6)
  longitude Decimal @db.Decimal(9, 6)

  opportunities Opportunity[]

  @@map("districts")
}

// ============ PELUANG INVESTASI ============

model Opportunity {
  id              Int           @id @default(autoincrement())
  slug            String        @unique
  titleId         String
  titleEn         String
  summaryId       String        @db.Text
  summaryEn       String        @db.Text
  descriptionId   String        @db.LongText
  descriptionEn   String        @db.LongText
  sectorId        Int
  districtId      Int
  address         String?
  latitude        Decimal       @db.Decimal(9, 6)
  longitude       Decimal       @db.Decimal(9, 6)

  // fitur numerik (K-Means, rekomendasi, filter)
  investmentValue BigInt        // Rupiah
  estRoiPercent   Decimal       @db.Decimal(5, 2)
  paybackYears    Decimal       @db.Decimal(4, 1)
  landAreaHa      Decimal?      @db.Decimal(10, 2)
  jobsEstimate    Int?

  coverImageUrl   String?
  featured        Boolean       @default(false)
  status          PublishStatus @default(DRAFT)
  publishedAt     DateTime?

  // hasil Sistem Cerdas
  clusterId       Int?
  embedding       Json?
  embeddingModel  String?
  embeddingHash   String?

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  sector       Sector                   @relation(fields: [sectorId], references: [id])
  district     District                 @relation(fields: [districtId], references: [id])
  cluster      Cluster?                 @relation(fields: [clusterId], references: [id], onDelete: SetNull)
  images       OpportunityImage[]
  requirements OpportunityRequirement[]
  inquiries    Inquiry[]
  saved        SavedOpportunity[]

  @@index([status, sectorId])
  @@index([districtId])
  @@index([clusterId])
  @@index([featured, status])
  @@map("opportunities")
}

model OpportunityImage {
  id            Int     @id @default(autoincrement())
  opportunityId Int
  url           String
  altId         String?
  altEn         String?
  sortOrder     Int     @default(0)

  opportunity Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  @@index([opportunityId])
  @@map("opportunity_images")
}

model OpportunityRequirement {
  id            Int    @id @default(autoincrement())
  opportunityId Int
  textId        String @db.Text
  textEn        String @db.Text
  sortOrder     Int    @default(0)

  opportunity Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  @@index([opportunityId])
  @@map("opportunity_requirements")
}

// ============ SISTEM CERDAS (AI) ============

model ClusterRun {
  id            Int      @id @default(autoincrement())
  k             Int
  features      Json     // daftar fitur yang dipakai
  normalization Json     // parameter min-max / log-transform
  inertia       Decimal? @db.Decimal(14, 4)
  silhouette    Decimal? @db.Decimal(6, 4)
  isActive      Boolean  @default(false)
  createdById   String?
  createdAt     DateTime @default(now())

  createdBy User?     @relation(fields: [createdById], references: [id], onDelete: SetNull)
  clusters  Cluster[]

  @@index([isActive])
  @@map("cluster_runs")
}

model Cluster {
  id            Int     @id @default(autoincrement())
  runId         Int
  index         Int
  labelId       String
  labelEn       String
  descriptionId String? @db.Text
  descriptionEn String? @db.Text
  centroid      Json
  color         String?

  run           ClusterRun    @relation(fields: [runId], references: [id], onDelete: Cascade)
  opportunities Opportunity[]

  @@unique([runId, index])
  @@map("clusters")
}

model SearchLog {
  id            Int      @id @default(autoincrement())
  queryText     String   @db.VarChar(500)
  parsedFilters Json?
  resultCount   Int
  method        String   @db.VarChar(20) // hybrid | fallback
  locale        String   @default("id") @db.VarChar(5)
  durationMs    Int?
  createdAt     DateTime @default(now())

  @@index([createdAt])
  @@map("search_logs")
}

// ============ KONTEN ============

model ProcedureStep {
  id        Int    @id @default(autoincrement())
  stepOrder Int
  titleId   String
  titleEn   String
  contentId String @db.Text
  contentEn String @db.Text

  @@map("procedure_steps")
}

model Faq {
  id         Int    @id @default(autoincrement())
  questionId String
  questionEn String
  answerId   String @db.Text
  answerEn   String @db.Text
  sortOrder  Int    @default(0)

  @@map("faqs")
}

model Article {
  id            Int           @id @default(autoincrement())
  slug          String        @unique
  titleId       String
  titleEn       String
  excerptId     String?       @db.Text
  excerptEn     String?       @db.Text
  contentId     String        @db.LongText
  contentEn     String        @db.LongText
  category      String?
  coverImageUrl String?
  status        PublishStatus @default(DRAFT)
  authorId      String?
  publishedAt   DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  author User? @relation(fields: [authorId], references: [id], onDelete: SetNull)

  @@index([status, publishedAt])
  @@map("articles")
}

// ============ INQUIRY & KEPATUHAN ============

model Inquiry {
  id               Int           @id @default(autoincrement())
  trackingCode     String        @unique
  name             String
  email            String
  phone            String?
  organization     String?
  message          String        @db.Text
  opportunityId    Int?
  userId           String?
  assignedAgencyId Int?
  status           InquiryStatus @default(NEW)
  locale           String        @default("id") @db.VarChar(5)
  consentAt        DateTime
  consentVersion   String
  anonymizedAt     DateTime?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  closedAt         DateTime?

  opportunity    Opportunity?   @relation(fields: [opportunityId], references: [id], onDelete: SetNull)
  user           User?          @relation(fields: [userId], references: [id], onDelete: SetNull)
  assignedAgency Agency?        @relation(fields: [assignedAgencyId], references: [id], onDelete: SetNull)
  events         InquiryEvent[]

  @@index([email])
  @@index([status, assignedAgencyId])
  @@index([opportunityId])
  @@index([userId])
  @@map("inquiries")
}

model InquiryEvent {
  id         Int              @id @default(autoincrement())
  inquiryId  Int
  type       InquiryEventType
  fromStatus InquiryStatus?
  toStatus   InquiryStatus?
  message    String?          @db.Text
  isPublic   Boolean          @default(true)
  actorId    String?
  createdAt  DateTime         @default(now())

  inquiry Inquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  actor   User?   @relation(fields: [actorId], references: [id], onDelete: SetNull)

  @@index([inquiryId, createdAt])
  @@map("inquiry_events")
}

model SavedOpportunity {
  userId        String
  opportunityId Int
  createdAt     DateTime @default(now())

  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  opportunity Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  @@id([userId, opportunityId])
  @@map("saved_opportunities")
}

model AuditLog {
  id         Int      @id @default(autoincrement())
  actorId    String?
  action     String
  entityType String
  entityId   String?
  metadata   Json?
  ipHash     String?
  createdAt  DateTime @default(now())

  actor User? @relation(fields: [actorId], references: [id], onDelete: SetNull)

  @@index([entityType, entityId])
  @@index([actorId, createdAt])
  @@map("audit_logs")
}

model DeletionRequest {
  id           Int            @id @default(autoincrement())
  email        String
  trackingCode String?
  status       DeletionStatus @default(PENDING)
  requestedAt  DateTime       @default(now())
  processedAt  DateTime?
  processedBy  String?

  @@index([status])
  @@map("deletion_requests")
}
```
