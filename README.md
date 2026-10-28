# INVESTYUK

**Investment Information & Intelligence**: website informasi peluang investasi daerah Kabupaten ABC dengan pencarian cerdas, rekomendasi, dan pengelompokan peluang.

![Status](https://img.shields.io/badge/status-fase%200%E2%80%931%3A%20fondasi%20%26%20database-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.4.3-000000?logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.10.1-2D3748?logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

> **Proyek akademik.** INVESTYUK adalah tugas besar mata kuliah Manajemen Proyek (S1 Informatika) berdasarkan Kerangka Acuan Kerja (KAK) simulasi. **Kabupaten ABC bersifat fiktif**; seluruh angka investasi, lokasi, dan konten adalah data contoh.

> **Status:** fondasi (Next.js, Prisma, Docker Compose, dua bahasa, token desain), skema database + migrasi awal, dan seed data fiktif sudah ada. Halaman aplikasi, autentikasi, dan fitur AI belum dibuat. Lihat [Roadmap](#roadmap).

---

## Daftar isi

- [Tentang](#tentang)
- [Fitur](#fitur)
- [Sistem Cerdas](#sistem-cerdas)
- [Tech stack](#tech-stack)
- [Arsitektur](#arsitektur)
- [Prasyarat (Windows)](#prasyarat-windows)
- [Setup pertama kali](#setup-pertama-kali)
- [Akun uji](#akun-uji)
- [Kerja harian](#kerja-harian)
- [Panduan Prisma (untuk pemula)](#panduan-prisma-untuk-pemula)
- [Variabel lingkungan](#variabel-lingkungan)
- [Skrip npm](#skrip-npm)
- [Struktur proyek](#struktur-proyek)
- [Troubleshooting](#troubleshooting)
- [Aturan tim](#aturan-tim)
- [Dokumentasi](#dokumentasi)
- [Roadmap](#roadmap)
- [Perlindungan data pribadi](#perlindungan-data-pribadi)
- [Atribusi](#atribusi)
- [Lisensi](#lisensi)
- [Penulis](#penulis)

---

## Tentang

INVESTYUK menyajikan informasi peluang investasi daerah secara terpusat, transparan, dan mudah diakses:

- Sektor unggulan, peluang investasi, lokasi, prosedur, dan persyaratan dalam satu tempat.
- **Inquiry** dari calon investor ke pemerintah daerah, lengkap dengan **kode tracking**, tanpa wajib akun.
- **Sistem Cerdas** sederhana untuk menemukan peluang yang relevan.
- **Dashboard** bagi dinas dan admin untuk mengelola data dan memantau inquiry.

INVESTYUK bersifat **edukatif dan informatif**: tidak ada transaksi investasi, dan AI tidak memberi saran atau keputusan investasi.

## Fitur

| Pengguna | Fitur utama |
|---|---|
| Pengunjung & investor (tanpa login) | Beranda *search-first*, sektor unggulan, daftar/detail peluang, peta lokasi, filter, bandingkan hingga 3 peluang, rekomendasi, prosedur, FAQ, artikel, inquiry + Lacak Inquiry, dua bahasa (ID/EN) |
| Investor terdaftar (opsional) | Riwayat inquiry, peluang tersimpan, masuk dengan email + password atau Google |
| Dinas & admin | Dashboard KPI, kelola peluang/sektor/kecamatan/konten, kelola inquiry (penugasan, balasan, status), pengguna & peran, audit log, Pengelolaan AI (admin) |

### Sistem Cerdas

| Fitur | Pendekatan |
|---|---|
| **Smart search** | Kueri bahasa alami diurai menjadi filter (mis. "lahan perikanan di bawah 500 juta") + semantic search dengan model embedding multibahasa lokal; keyword/fuzzy sebagai fallback |
| **Rekomendasi** | Rule-based scoring dari preferensi + content-based filtering untuk "Peluang Serupa"; setiap hasil disertai alasan |
| **Pengelompokan** | Kategori manual (sektor, kecamatan) + K-Means atas fitur numerik peluang |

Semua keluaran berasal dari data di database dan diberi catatan bahwa informasinya estimasi, bukan nasihat keuangan.

## Tech stack

Versi diambil dari `package.json` dan `docker-compose.yml`.

| Lapisan | Teknologi | Versi |
|---|---|---|
| Runtime | Node.js | `>=22` (Dockerfile: `node:22-slim`) |
| Framework | Next.js (App Router), React | `16.4.3`, `19.3.0` |
| Bahasa | TypeScript | `^5` |
| Styling | Tailwind CSS | `^4` |
| Linter | ESLint + `eslint-config-next` | `^9`, `16.4.3` |
| ORM | Prisma (`prisma`, `@prisma/client`, `@prisma/adapter-mariadb`) | `7.10.1` (dikunci) |
| Seed | `tsx` (menjalankan `prisma/seed.ts`), `bcryptjs` (hash password) | `4.23.15`, `3.0.3` |
| Database | MySQL (Docker) | `mysql:8.4` |
| Email lokal | Mailpit (Docker) | `axllent/mailpit:latest` |
| Komponen UI | shadcn/ui (style `new-york`, komponen disalin ke `src/components/ui`) | dependensi: `radix-ui` `1.8.1`, `cn` `0.5.0`, `class-variance-authority` `0.7.1`, `tw-animate-css` `1.4.0` |
| Ikon | lucide-react | `1.63.0` |
| Internasionalisasi | next-intl (ID default tanpa prefix, EN di `/en`) | `4.14.9` |
| Autentikasi | Auth.js (email + password, Google) | (direncanakan) |
| Grafik & peta | Recharts, react-leaflet (OpenStreetMap) | (direncanakan) |
| Pengujian | Vitest, Playwright | (direncanakan) |

## Arsitektur

```mermaid
flowchart LR
    B["Browser"] --> N["Next.js<br/>UI + Route Handlers / Server Actions"]
    N --> A["Auth.js"]
    N --> P["Prisma"]
    P --> D[("MySQL 8")]
    N --> M["Modul AI<br/>parser · fuzzy · embedding · rekomendasi · K-Means"]
    M --> C[("Cache model embedding")]
    N --> E["SMTP (Mailpit lokal)"]
    N --> U[("Volume uploads")]
```

## Prasyarat (Windows)

| Alat | Versi | Catatan |
|---|---|---|
| Git | terbaru | |
| Node.js | 22 atau lebih baru | Dockerfile memakai `node:22-slim`; `package.json` mewajibkan `>=22` |
| Docker Desktop | terbaru | Pakai backend **WSL2** (Settings → General) |

Instalasi lewat `winget` (PowerShell, lalu **tutup dan buka ulang terminal**):

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Docker.DockerDesktop -e
```

Cek versi:

```powershell
git --version
node -v
npm -v
docker --version
docker compose version
```

**Hasil yang diharapkan:** semua perintah mencetak versi; `node -v` menunjukkan `v22.x` atau lebih baru.

## Setup pertama kali

Jalankan semua perintah di PowerShell dari folder proyek.

### 1. Clone repo

```powershell
git clone https://github.com/F4ntasyc/INVESTYUK.git
cd INVESTYUK
```

**Hasil yang diharapkan:** folder `INVESTYUK` berisi `package.json`, `docker-compose.yml`, `prisma/`, dan `src/`.

### 2. Pasang dependensi

```powershell
npm install
```

Skrip `postinstall` otomatis menjalankan `prisma generate`, sehingga Prisma Client dibuat di `src/generated/prisma` (folder ini tidak di-commit).

**Hasil yang diharapkan:** di akhir output ada `✔ Generated Prisma Client (7.10.1) to .\src\generated\prisma`.

### 3. Buat file `.env`

```powershell
Copy-Item .env.example .env
```

**Hasil yang diharapkan:** file `.env` muncul di root proyek.

### 4. Isi `.env`

Buka `.env` di VS Code, lalu isi:

| Variabel | Isi |
|---|---|
| `MYSQL_ROOT_PASSWORD` | Password root MySQL pilihanmu, mis. `investyuk123` |
| `MYSQL_DATABASE` | Biarkan `investyuk` |
| `DATABASE_URL` | `mysql://root:investyuk123@localhost:3307/investyuk` (password sama dengan di atas) |
| `AUTH_SECRET` | String acak (cara membuat di bawah) |
| `AUTH_URL`, `SMTP_HOST`, `SMTP_PORT`, `MAIL_FROM` | Biarkan nilai dari `.env.example` |
| `SEED_TEST_PASSWORD` | Password semua [akun uji](#akun-uji); biarkan `Uji-Investyuk-2026` dari `.env.example` (khusus lokal) |

> [!IMPORTANT]
> - Password MySQL **tanpa karakter khusus** (`@ # : / % ? & +` dan spasi). Pakai huruf dan angka saja.
> - Password di `MYSQL_ROOT_PASSWORD` dan di dalam `DATABASE_URL` harus **sama persis**.
> - Port di `DATABASE_URL` adalah **3307** (bukan 3306).
> - Edit `.env` dengan **VS Code**. Jangan menulis `.env` lewat PowerShell `Set-Content`/`Out-File`, karena bisa menambah BOM dan membuat variabel pertama tidak terbaca.
> - **Jangan ubah `MYSQL_ROOT_PASSWORD`** setelah `docker compose up` pertama. Password tersimpan di volume database; lihat [Troubleshooting](#troubleshooting) (P1000 karena password berubah).

Membuat `AUTH_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Salin hasilnya ke `AUTH_SECRET=` di `.env`.

**Hasil yang diharapkan:** semua variabel di `.env` terisi, tidak ada yang kosong.

### 5. Nyalakan database dan Mailpit

Pastikan Docker Desktop sudah berjalan, lalu:

```powershell
docker compose up -d
docker compose ps
```

Ulangi `docker compose ps` sampai kolom STATUS untuk `investyuk-db` menunjukkan `(healthy)`. Pertama kali biasanya 20–60 detik (image diunduh dan MySQL diinisialisasi).

**Hasil yang diharapkan:** `investyuk-db` berstatus `Up ... (healthy)` dan `investyuk-mailpit` berstatus `Up`.

### 6. Terapkan migrasi database

```powershell
npm run db:migrate
```

Perintah ini menerapkan migrasi yang sudah ada di `prisma/migrations` (20 tabel).

> [!WARNING]
> Kalau Prisma bertanya apakah database boleh di-**reset** (semua data hilang), jawab **TIDAK** (`N`), lalu baca [Troubleshooting](#troubleshooting).

**Hasil yang diharapkan:** pesan bahwa migrasi `20261028115043_init` diterapkan, atau `Already in sync` bila sudah pernah dijalankan.

### 7. Isi data contoh (seed)

```powershell
npm run db:seed
```

Perintah ini mengisi database dengan data fiktif dua bahasa: 6 dinas, 7 sektor, 9 kecamatan, 40 peluang, prosedur, FAQ, artikel, [akun uji](#akun-uji), dan contoh inquiry. Aman dijalankan berulang kali (tidak membuat data ganda).

**Hasil yang diharapkan:** di akhir output ada `[seed] Selesai. Jumlah baris per tabel:` dengan tabel berisi antara lain `opportunities 40`, `users 5`, `inquiries 12`, lalu `The seed command has been executed.`

> Kalau muncul `[seed] SEED_TEST_PASSWORD belum diisi`, tambahkan baris `SEED_TEST_PASSWORD=Uji-Investyuk-2026` ke `.env` (langkah 4).

### 8. Jalankan aplikasi

```powershell
npm run dev
```

**Hasil yang diharapkan:** terminal menampilkan `Local: http://localhost:3000`. Hentikan dengan `Ctrl+C`.

### 9. Alamat layanan

| Layanan | Alamat |
|---|---|
| Aplikasi | http://localhost:3000 |
| Mailpit (kotak masuk email uji) | http://localhost:8025 |
| MySQL (dari Windows) | `localhost:3307`, user `root` |

> [!NOTE]
> Profile Docker `app` **belum bisa dipakai** karena Dockerfile belum menjalankan `prisma generate`. Jangan jalankan `docker compose --profile app up`. Aplikasi dijalankan dengan `npm run dev` di Windows; Docker hanya untuk database dan Mailpit.

## Akun uji

Dibuat oleh `npm run db:seed`. Password semua akun sama dengan nilai `SEED_TEST_PASSWORD` di `.env` (bawaan `.env.example`: `Uji-Investyuk-2026`).

| Email | Peran | Keterangan |
|---|---|---|
| `admin@investyuk.test` | ADMIN | Akses penuh |
| `dinas.pertanian@investyuk.test` | DINAS | Dinas Pertanian dan Ketahanan Pangan (sektor Pertanian) |
| `dinas.pariwisata@investyuk.test` | DINAS | Dinas Pariwisata dan Ekonomi Kreatif (sektor Pariwisata, Ekonomi Kreatif) |
| `investor1@investyuk.test` | INVESTOR | Punya 2 inquiry dan 3 peluang tersimpan |
| `investor2@investyuk.test` | INVESTOR | Punya 1 inquiry dan 2 peluang tersimpan |

> [!CAUTION]
> Akun dan password ini **hanya untuk lingkungan lokal**. Jangan pernah dipakai di server publik.

> [!NOTE]
> Seluruh konten seed (dinas, kecamatan, peluang, angka, artikel, FAQ, terjemahan EN) **fiktif dan dibuat dengan bantuan AI, sehingga wajib diverifikasi tim** sebelum dipakai untuk demo atau laporan (PRD bagian 10). Datanya ada di `prisma/seed-data/`.

## Kerja harian

| Kebutuhan | Perintah |
|---|---|
| Menyalakan database + Mailpit | `docker compose up -d` |
| Menjalankan aplikasi | `npm run dev` |
| Mematikan container (data aman) | `docker compose stop` |
| Setelah `git pull` | `npm install`, lalu `npm run db:migrate` |
| Melihat isi database | `npm run db:studio` |
| Mengembalikan data contoh | `npm run db:seed` |
| Melihat log MySQL | `docker compose logs -f db` (keluar: `Ctrl+C`) |

Setelah `git pull`:

```powershell
npm install
npm run db:migrate
```

Perbedaan cara mematikan:

| Perintah | Container | Data database |
|---|---|---|
| `docker compose stop` | Dihentikan, tetap ada | **Aman** |
| `docker compose down` | Dihapus | **Aman** (volume `db_data` tetap) |
| `docker compose down -v` | Dihapus | **TERHAPUS SEMUA** (volume ikut dihapus) |

## Panduan Prisma (untuk pemula)

### Prisma itu apa?

Prisma adalah **ORM** (*Object-Relational Mapping*): perantara antara kode TypeScript dan database MySQL. Kita tidak menulis SQL secara langsung. Kita memanggil fungsi seperti `prisma.opportunity.findMany()`, lalu Prisma menerjemahkannya ke SQL, menjalankannya, dan mengembalikan hasil yang sudah bertipe. Salah ketik nama kolom langsung ketahuan di editor, bukan saat aplikasi berjalan.

### Perbandingan dengan yang mungkin sudah kamu kenal

| Kebutuhan | PHP native + phpMyAdmin | Laravel | Prisma (proyek ini) |
|---|---|---|---|
| Mendefinisikan tabel | `CREATE TABLE` manual atau klik di phpMyAdmin | File migration PHP (`Schema::create`) | Tulis `model` di `prisma/schema.prisma` |
| Mengubah tabel | `ALTER TABLE` manual atau klik | Migration baru (`php artisan make:migration`) | Edit `schema.prisma`, lalu `npm run db:migrate -- --name <nama>`; SQL dibuat otomatis |
| Query data | `mysqli`/PDO + string SQL | Eloquent (`Opportunity::where(...)->get()`) | `prisma.opportunity.findMany({ where: ... })` |
| Data awal | Import file `.sql` | Seeder (`php artisan db:seed`) | `prisma/seed.ts` (`npm run db:seed`) |
| Melihat isi database | phpMyAdmin | phpMyAdmin / Tinker | `npm run db:studio` (Prisma Studio di browser) |

### Fungsi tiap file

| File / folder | Fungsi |
|---|---|
| `prisma/schema.prisma` | **Sumber kebenaran** struktur database: semua `model` (tabel), kolom, relasi, dan `enum` |
| `prisma/migrations/` | Riwayat perubahan struktur dalam bentuk file SQL (satu folder per perubahan). Di-commit dan **tidak boleh diedit** setelah di-commit |
| `prisma7.config.ts` | Konfigurasi Prisma CLI: lokasi schema, folder migrasi, perintah seed, dan `DATABASE_URL` |
| `src/lib/prisma.ts` | Satu objek `prisma` untuk dipakai aplikasi Next.js (terhubung lewat adapter MariaDB) |
| `src/generated/prisma/` | Prisma Client hasil `prisma generate`. Dibuat otomatis, **tidak di-commit**, jangan diedit |
| `prisma/seed.ts` + `prisma/seed-data/` | Skrip pengisi data contoh fiktif dan datanya |

### Migrate vs generate vs seed vs studio

| Perintah | Yang dilakukan | Kapan dipakai |
|---|---|---|
| `npm run db:migrate` | Menerapkan migrasi yang belum ada di database; bila `schema.prisma` berubah, membuat migrasi baru | Setelah `git pull`, atau setelah mengubah schema |
| `npm run db:generate` | Membuat ulang Prisma Client (kode TypeScript) dari `schema.prisma`; tidak menyentuh database | Bila editor error `Cannot find module '@/generated/prisma/client'` atau tipe belum ikut berubah |
| `npm run db:seed` | Mengisi/menyegarkan data contoh | Setelah setup pertama, setelah reset, atau saat data contoh ingin dikembalikan |
| `npm run db:studio` | Membuka Prisma Studio untuk melihat dan mengedit data | Kapan saja ingin melihat isi tabel |

### Alur kerja mengubah schema

1. **Koordinasi dulu** di grup tim: siapa mengubah apa, supaya tidak ada dua migrasi yang bertabrakan.
2. Ambil perubahan terbaru dan samakan database:

   ```powershell
   git pull
   npm run db:migrate
   ```

3. Edit `prisma/schema.prisma` (mis. tambah kolom).
4. Buat dan terapkan migrasi dengan nama deskriptif (huruf kecil dan garis bawah):

   ```powershell
   npm run db:migrate -- --name tambah_kolom_website_dinas
   ```

   Prisma membuat folder `prisma/migrations/<tanggal>_tambah_kolom_website_dinas/migration.sql`, menerapkannya ke database, dan membuat ulang Prisma Client.
   (Kalau `--name` tidak terbaca, Prisma akan menanyakan nama migrasi; atau pakai `npx prisma migrate dev --name tambah_kolom_website_dinas`.)
5. **Buka `migration.sql` dan periksa.** Waspadai `DROP COLUMN` / `DROP TABLE`, karena datanya akan hilang di komputer semua anggota tim.
6. Commit `schema.prisma` **bersama** folder migrasi barunya dalam satu commit.

### Contoh query: Prisma berdampingan dengan SQL

Di kode aplikasi (server), impor dengan `import { prisma } from "@/lib/prisma";`.

**Ambil data dengan filter**

```ts
const hasil = await prisma.opportunity.findMany({
  where: { status: "PUBLISHED", investmentValue: { lt: BigInt(500_000_000) } },
  orderBy: { investmentValue: "asc" },
  take: 10,
});
```

```sql
SELECT * FROM opportunities
WHERE status = 'PUBLISHED' AND investmentValue < 500000000
ORDER BY investmentValue ASC
LIMIT 10;
```

**Tambah data**

```ts
await prisma.faq.create({
  data: {
    questionId: "Apakah ada biaya?",
    questionEn: "Is there a fee?",
    answerId: "Tidak.",
    answerEn: "No.",
    sortOrder: 11,
  },
});
```

```sql
INSERT INTO faqs (questionId, questionEn, answerId, answerEn, sortOrder)
VALUES ('Apakah ada biaya?', 'Is there a fee?', 'Tidak.', 'No.', 11);
```

**Ambil data beserta relasinya**

```ts
const peluang = await prisma.opportunity.findUnique({
  where: { slug: "pembangunan-resort-pantai" },
  include: { sector: true, district: true, images: { orderBy: { sortOrder: "asc" } } },
});
// peluang.sector.nameId, peluang.district.name, peluang.images[0].url
```

```sql
SELECT o.*, s.*, d.*
FROM opportunities o
JOIN sectors s   ON s.id = o.sectorId
JOIN districts d ON d.id = o.districtId
WHERE o.slug = 'pembangunan-resort-pantai';
-- lalu: SELECT * FROM opportunity_images WHERE opportunityId = ? ORDER BY sortOrder;
```

**Menghitung**

```ts
const jumlahBaru = await prisma.inquiry.count({ where: { status: "NEW" } });
```

```sql
SELECT COUNT(*) FROM inquiries WHERE status = 'NEW';
```

### Aturan tim untuk database

1. **Ubah struktur tabel HANYA lewat `schema.prisma` + `npm run db:migrate`.** Jangan menambah/mengubah kolom lewat phpMyAdmin, DBeaver, atau SQL manual. Database akan berbeda dari riwayat migrasi (*drift*), dan Prisma akan meminta reset yang menghapus data.
2. **Jangan edit atau hapus migrasi yang sudah di-commit.** Kalau ada yang salah, buat migrasi baru yang memperbaikinya.
3. **Setelah `git pull`, jalankan `npm run db:migrate`** supaya database kamu mengikuti perubahan anggota tim lain.
4. **Koordinasi sebelum mengubah schema**, dan commit schema + migrasi bersama-sama.
5. **`BigInt` tidak bisa langsung di-`JSON.stringify`.** Kolom uang (`investmentValue`) bertipe `BigInt`, sehingga `JSON.stringify(peluang)` akan error `Do not know how to serialize a BigInt`. Ubah dulu, mis. `peluang.investmentValue.toString()`, sebelum dikirim ke klien atau ke Client Component.

### Seed dan reset

| | `npm run db:seed` | `npm run db:reset` |
|---|---|---|
| Yang dilakukan | Mengisi/menyegarkan data contoh. Data contoh dikembalikan ke nilai awal; FAQ dan prosedur dihapus lalu dibuat ulang; data lain yang kamu buat sendiri tetap ada | **MENGHAPUS SEMUA DATA**, mengosongkan database, lalu menerapkan ulang semua migrasi |
| Kapan dipakai | Setelah setup pertama, setelah reset, atau saat data contoh berantakan karena uji coba | Hanya bila database lokal rusak atau *drift* dan tidak bisa diperbaiki dengan cara lain |
| Seed otomatis? | Ya | **Tidak.** Di Prisma 7.10.1, `migrate reset` (dan `migrate dev`) tidak menjalankan seed; jalankan `npm run db:seed` sesudahnya |

> [!CAUTION]
> **`npm run db:reset` MENGHAPUS SEMUA DATA** di database lokal kamu (termasuk data yang kamu buat sendiri) dan tidak bisa dibatalkan. Prisma akan meminta konfirmasi; baca baik-baik sebelum menjawab `y`.

Setelah reset:

```powershell
npm run db:reset
npm run db:seed
```

## Variabel lingkungan

Variabel yang ada di `.env.example` saat ini:

| Variabel | Fungsi | Contoh nilai |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | Password root MySQL di container `db` (dibaca `docker-compose.yml`) | `investyuk123` |
| `MYSQL_DATABASE` | Nama database yang dibuat container `db` | `investyuk` |
| `DATABASE_URL` | Koneksi Prisma dari Windows ke MySQL (dipakai `prisma7.config.ts` dan `src/lib/prisma.ts`) | `mysql://root:investyuk123@localhost:3307/investyuk` |
| `AUTH_SECRET` | Rahasia sesi untuk Auth.js (belum dipakai kode) | hasil perintah `node -e ...` di langkah 4 |
| `AUTH_URL` | URL dasar aplikasi (belum dipakai kode) | `http://localhost:3000` |
| `SMTP_HOST` | Host SMTP; lokal memakai Mailpit (belum dipakai kode) | `localhost` |
| `SMTP_PORT` | Port SMTP Mailpit (belum dipakai kode) | `1025` |
| `MAIL_FROM` | Alamat pengirim email (belum dipakai kode) | `INVESTYUK <no-reply@investyuk.local>` |
| `SEED_TEST_PASSWORD` | Password semua akun uji yang dibuat `npm run db:seed` (khusus lokal; seed berhenti bila kosong) | `Uji-Investyuk-2026` |

Variabel yang **direncanakan** (belum ada di `.env.example`, jangan ditambahkan dulu):

| Variabel | Fungsi |
|---|---|
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Login dengan Google (opsional) |
| `CAPTCHA_SITE_KEY` / `CAPTCHA_SECRET_KEY` | CAPTCHA pada form inquiry |
| `EMBEDDING_MODEL` | Model embedding lokal untuk semantic search |
| `UPLOAD_DIR` | Folder unggahan gambar |

> File `.env` **tidak boleh** di-commit (sudah di `.gitignore`). Yang di-commit hanya `.env.example`.

## Skrip npm

Skrip yang ada di `package.json`:

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan Next.js |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run db:generate` | `prisma generate`: membuat ulang Prisma Client (setelah `schema.prisma` berubah) |
| `npm run db:migrate` | `prisma migrate dev`: menerapkan migrasi / membuat migrasi baru |
| `npm run db:studio` | `prisma studio`: melihat dan mengedit isi database di browser |
| `npm run db:seed` | `prisma db seed`: mengisi data contoh fiktif (`tsx prisma/seed.ts`, didaftarkan di `prisma7.config.ts`); aman diulang |
| `npm run db:reset` | `prisma migrate reset`: **MENGHAPUS SEMUA DATA** lalu menerapkan ulang migrasi; tidak menjalankan seed otomatis |
| `postinstall` | Otomatis setelah `npm install`: `prisma generate` |

Skrip yang **direncanakan** (belum ada):

| Perintah | Fungsi |
|---|---|
| `npm test` | Unit dan integrasi (Vitest) |
| `npm run test:e2e` | End-to-end (Playwright) |
| `npm run test:ai` | Evaluasi Sistem Cerdas dengan kueri uji |

## Struktur proyek

Kondisi saat ini:

```text
INVESTYUK/
├─ docs/
│  ├─ INVESTYUK_PRD.md
│  ├─ INVESTYUK_ERD.md
│  └─ UI/beranda.png           # mockup Beranda
├─ messages/
│  ├─ id.json                  # terjemahan ID (namespace: common, metadata, home)
│  └─ en.json                  # terjemahan EN
├─ prisma/
│  ├─ schema.prisma            # 20 model, 5 enum
│  ├─ migrations/
│  │  ├─ 20261028115043_init/  # migrasi awal
│  │  └─ migration_lock.toml
│  ├─ seed.ts                  # orkestrasi seed (npm run db:seed)
│  └─ seed-data/               # data fiktif ID/EN: agencies, sectors, districts, opportunities,
│                              # procedures, faqs, articles, users, inquiries
├─ public/
│  └─ images/                  # logo, hero, peluang/, sektor/, inquiry-gedung (placeholder SVG)
├─ src/
│  ├─ app/
│  │  ├─ [locale]/             # layout.tsx (font, <html lang>), page.tsx (halaman uji fondasi)
│  │  ├─ globals.css           # token desain (Tailwind 4 @theme + variabel shadcn)
│  │  └─ favicon.ico
│  ├─ components/ui/           # komponen shadcn/ui (button, card, input, badge, select, ...)
│  ├─ config/
│  │  └─ images.ts             # daftar semua path gambar + key alt text
│  ├─ generated/prisma/        # Prisma Client (dibuat otomatis, tidak di-commit)
│  ├─ i18n/
│  │  ├─ routing.ts            # locale id/en, localePrefix 'as-needed'
│  │  ├─ request.ts            # memuat messages per locale
│  │  └─ navigation.ts         # Link, redirect, usePathname, useRouter sadar bahasa
│  ├─ lib/
│  │  └─ prisma.ts             # PrismaClient singleton + adapter MariaDB
│  ├─ global.d.ts              # tipe key terjemahan next-intl
│  └─ proxy.ts                 # routing bahasa (Next.js 16: pengganti middleware.ts)
├─ .dockerignore
├─ .env.example
├─ AGENTS.md                   # dibuat otomatis oleh `next dev`
├─ components.json             # konfigurasi shadcn/ui
├─ docker-compose.yml          # db (MySQL 8.4), mailpit, app (profile, belum siap)
├─ Dockerfile
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ prisma7.config.ts           # konfigurasi Prisma CLI (schema, migrasi, perintah seed)
└─ tsconfig.json
```

Direncanakan:

| Lokasi | Isi |
|---|---|
| `src/app/[locale]/` | Beranda dan halaman publik, auth, akun, dashboard (direncanakan) |
| `src/app/api/` | search, recommend, inquiries, track (direncanakan) |
| `src/components/` | Komponen situs: navbar, footer, kartu peluang (direncanakan) |
| `src/lib/ai/` | parser, fuzzy, embedding, hybrid, recommend, kmeans (direncanakan) |
| `tests/unit/`, `tests/e2e/`, `tests/ai-eval/` | Vitest, Playwright, evaluasi AI (direncanakan) |
| `docs/screenshots/` | Tangkapan layar (direncanakan) |

## Troubleshooting

### P1000 Authentication failed: port dipakai MySQL lain

**Gejala:** `npm run db:migrate` gagal dengan `P1000: Authentication failed`.

**Penyebab:** MySQL lain di Windows (XAMPP, Laragon, atau service MySQL) memakai port 3306/3307, sehingga Prisma terhubung ke MySQL yang salah.

**Solusi:**

```powershell
netstat -ano | findstr :3307
```

Ambil angka PID di kolom terakhir, lalu:

```powershell
tasklist /FI "PID eq <PID>"
```

- Pastikan `DATABASE_URL` memakai port `3307`.
- Kalau prosesnya bukan Docker (`com.docker.backend.exe` / `wslrelay.exe`), hentikan MySQL lain itu, **atau** ganti port host di `docker-compose.yml` (mis. `"3308:3306"`) dan di `DATABASE_URL`, lalu jalankan `docker compose up -d` lagi.

### P1000 Authentication failed: password berubah

**Gejala:** `P1000: Authentication failed`, padahal port sudah benar.

**Penyebab:** `MYSQL_ROOT_PASSWORD` diubah setelah volume `db_data` terbentuk. MySQL hanya memakai password saat inisialisasi pertama; volume masih menyimpan password lama.

**Cek:**

```powershell
docker compose exec db mysql -uroot -p -e "SELECT 'login OK';"
```

Masukkan password dari `.env`. Kalau hasilnya `Access denied`, penyebabnya ini.

**Solusi:**

> [!CAUTION]
> **`docker compose down -v` MENGHAPUS SEMUA DATA DATABASE.** Lakukan hanya bila datanya boleh hilang.

```powershell
docker compose down -v
docker compose up -d
```

Tunggu sampai `(healthy)` (`docker compose ps`), lalu terapkan migrasi lagi:

```powershell
npm run db:migrate
```

### ERROR 2002 Can't connect through socket

**Gejala:** `ERROR 2002 (HY000): Can't connect to local MySQL server through socket` saat `docker compose exec db mysql ...`.

**Penyebab:** MySQL masih inisialisasi.

**Solusi:** tunggu sampai `docker compose ps` menunjukkan `(healthy)`, lalu ulangi.

### Cannot find module '@/generated/prisma/client'

**Gejala:** error import saat `npm run dev` atau di editor.

**Penyebab:** Prisma Client belum dibuat (mis. `npm install` dilewati atau `schema.prisma` berubah).

**Solusi:**

```powershell
npm run db:generate
```

### Port 3000 sudah dipakai

**Gejala:** `npm run dev` melaporkan port 3000 sedang dipakai.

**Solusi:** cari prosesnya:

```powershell
netstat -ano | findstr :3000
```

Hentikan proses itu, atau jalankan di port lain:

```powershell
npx next dev -p 3001
```

> Di PowerShell, `npm run dev -- -p 3001` kadang tidak meneruskan `--` ke npm; `npx next dev -p 3001` lebih aman.

### Warning "LF will be replaced by CRLF"

**Gejala:** muncul saat `git add`.

**Solusi:** aman, abaikan.

### Banner Prisma "Update available 7.10.1 -> 8.x"

**Gejala:** banner muncul saat menjalankan perintah Prisma.

**Solusi:** **jangan upgrade.** Versi Prisma dikunci di `7.10.1` untuk proyek ini.

### Docker Desktop belum jalan

**Gejala:** `error during connect` atau pesan tentang `pipe/docker_engine` saat menjalankan `docker`.

**Solusi:** buka Docker Desktop dan tunggu statusnya **Running**, lalu ulangi perintah.

## Aturan tim

1. Buat branch dari `main`: `feat/...` untuk fitur, `fix/...` untuk perbaikan (mis. `feat/smart-search`).
2. Pesan commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/), mis. `feat: tambah filter kelompok peluang`.
3. Jangan commit `.env`, password, atau kunci API.
4. Jangan upgrade Prisma atau Next.js tanpa diskusi tim.
5. Jangan ubah `MYSQL_ROOT_PASSWORD` sembarangan (lihat [Troubleshooting](#troubleshooting)).
6. `AGENTS.md` dibuat ulang otomatis oleh `next dev`. Biarkan isinya, dan commit bila berubah.

## Dokumentasi

| Dokumen | Isi |
|---|---|
| [`docs/INVESTYUK_PRD.md`](docs/INVESTYUK_PRD.md) | Kebutuhan produk, alur pengguna, spesifikasi UI, arsitektur, pengujian, risiko |
| [`docs/INVESTYUK_ERD.md`](docs/INVESTYUK_ERD.md) | Diagram ERD, daftar tabel, aturan data, dan `schema.prisma` |

## Roadmap

**Fase 0, Fondasi**
- [x] Repo
- [x] Next.js + Tailwind CSS
- [x] Prisma
- [x] Docker Compose (MySQL + Mailpit)
- [ ] shadcn/ui
- [ ] next-intl
- [ ] Token desain

**Fase 1, Data**
- [x] Skema database + migrasi awal (20 tabel)
- [x] Seed (40 peluang, dua bahasa; konten wajib diverifikasi tim)

**Fase berikutnya**
- [ ] **Fase 2, Halaman publik inti:** beranda, sektor, daftar dan detail peluang, prosedur, FAQ, edukasi
- [ ] **Fase 3, Pencarian & AI dasar:** parser kueri, fuzzy, rekomendasi rule-based, K-Means
- [ ] **Fase 4, Inquiry & autentikasi:** form, tracking, email, peran
- [ ] **Fase 5, Dashboard:** KPI, CRUD, kelola inquiry, pengguna
- [ ] **Fase 6, Peningkatan:** semantic + hybrid search, peta, bandingkan, Peluang Serupa, Pengelolaan AI, audit log, hak hapus
- [ ] **Fase 7, Mutu & dokumentasi:** pengujian, evaluasi AI, perbaikan, manual pengguna dan developer

**Di luar versi ini:** asisten tanya-jawab (RAG), hosting publik, notifikasi WhatsApp/SMS, dark mode.

## Perlindungan data pribadi

- Data yang diminta seminimal mungkin (nama, email, pesan; sisanya opsional) dengan persetujuan tercatat.
- Kontak investor di-*mask* pada daftar; pembukaannya dicatat di audit log.
- Akses data dibatasi per peran; dinas hanya melihat inquiry sektornya.
- Investor dapat meminta datanya dihapus/dianonimkan.
- Log pencarian bersifat anonim.

## Atribusi

Catat di sini sumber dan lisensi seluruh foto, ikon, dan font yang dipakai (mis. Unsplash/Pexels, lucide-react, Plus Jakarta Sans, Inter) sebelum repositori dipublikasikan.

> **Gambar saat ini placeholder;** ganti dan catat sumber/lisensi. Semua file ada di `public/images/` dan path-nya terdaftar di `src/config/images.ts`; saat aset asli datang, cukup ganti file dan path di sana, lalu tambahkan sumber dan lisensinya di bagian ini.

## Lisensi

Proyek akademik. Lisensi belum ditentukan; tambahkan berkas `LICENSE` bila repositori akan dibuka untuk umum.

## Penulis

`[Nama tim / anggota]` · S1 Informatika, Telkom University
