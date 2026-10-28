import type { AgencyKey } from "./agencies";
import { agencies } from "./agencies";
import type { UserKey } from "./users";

// 12 inquiry FIKTIF. Kode tracking dibuat SEKALI dengan crypto (alfabet 32
// karakter tanpa 0/O/1/I, 10 karakter = 50 bit) lalu ditulis tetap di sini
// agar seed idempotent. Format: INV-XXXX-XXXX-XX.

type Status = "NEW" | "IN_PROGRESS" | "REPLIED" | "DONE";
type EventType = "CREATED" | "STATUS_CHANGED" | "ASSIGNED" | "REPLIED" | "NOTE";

export type InquiryEventSeed = {
  type: EventType;
  fromStatus: Status | null;
  toStatus: Status | null;
  message: string | null;
  isPublic: boolean;
  actor: UserKey | null;
  createdAt: Date;
};

export type InquirySeed = {
  trackingCode: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string;
  opportunity: string | null;
  user: UserKey | null;
  agency: AgencyKey | null;
  status: Status;
  locale: "id" | "en";
  consentAt: Date;
  consentVersion: string;
  createdAt: Date;
  closedAt: Date | null;
  events: InquiryEventSeed[];
};

type RawInquiry = Omit<
  InquirySeed,
  "consentAt" | "consentVersion" | "closedAt" | "events"
> & {
  /** catatan internal dinas (NOTE, isPublic=false) */
  note?: string;
  /** balasan publik (REPLIED) */
  reply?: string;
};

const HOUR = 60 * 60 * 1000;
const at = (base: Date, hours: number) => new Date(base.getTime() + hours * HOUR);

/** Petugas yang menangani: akun dinas bila ada, selain itu admin. */
function handler(agency: AgencyKey | null): UserKey {
  if (agency === "pertanian") return "dinasPertanian";
  if (agency === "pariwisata") return "dinasPariwisata";
  return "admin";
}

/** Susun timeline yang konsisten dengan status akhir. */
function buildEvents(i: RawInquiry): {
  events: InquiryEventSeed[];
  closedAt: Date | null;
} {
  const t0 = i.createdAt;
  const by = handler(i.agency);
  const en = i.locale === "en";
  const events: InquiryEventSeed[] = [
    {
      type: "CREATED",
      fromStatus: null,
      toStatus: "NEW",
      message: null,
      isPublic: true,
      actor: i.user,
      createdAt: t0,
    },
  ];
  if (i.agency) {
    const agency = agencies.find((a) => a.key === i.agency)!;
    events.push({
      type: "ASSIGNED",
      fromStatus: null,
      toStatus: null,
      message: en ? `Forwarded to ${agency.nameEn}.` : `Diteruskan ke ${agency.nameId}.`,
      isPublic: true,
      actor: "admin",
      createdAt: at(t0, 3),
    });
  }
  const rank: Record<Status, number> = { NEW: 0, IN_PROGRESS: 1, REPLIED: 2, DONE: 3 };
  if (rank[i.status] >= 1) {
    events.push({
      type: "STATUS_CHANGED",
      fromStatus: "NEW",
      toStatus: "IN_PROGRESS",
      message: null,
      isPublic: true,
      actor: by,
      createdAt: at(t0, 24),
    });
    if (i.note) {
      events.push({
        type: "NOTE",
        fromStatus: null,
        toStatus: null,
        message: i.note,
        isPublic: false,
        actor: by,
        createdAt: at(t0, 26),
      });
    }
  }
  if (rank[i.status] >= 2) {
    events.push({
      type: "REPLIED",
      fromStatus: "IN_PROGRESS",
      toStatus: "REPLIED",
      message: i.reply ?? null,
      isPublic: true,
      actor: by,
      createdAt: at(t0, 72),
    });
  }
  let closedAt: Date | null = null;
  if (i.status === "DONE") {
    closedAt = at(t0, 168);
    events.push({
      type: "STATUS_CHANGED",
      fromStatus: "REPLIED",
      toStatus: "DONE",
      message: null,
      isPublic: true,
      actor: by,
      createdAt: closedAt,
    });
  }
  return { events, closedAt };
}

const raw: RawInquiry[] = [
  // ---------------- NEW ----------------
  {
    trackingCode: "INV-7V8N-K4BU-TU",
    name: "Hendra Kusuma",
    email: "hendra.kusuma@contoh.test",
    phone: "0812-0000-2001",
    organization: null,
    message:
      "Saya tertarik dengan tambak udang vaname. Apakah lahan tersebut sudah bersertifikat dan bagaimana ketersediaan benur di sekitar lokasi?",
    opportunity: "tambak-udang-vaname-skala-kecil",
    user: null,
    agency: null, // belum ditugaskan
    status: "NEW",
    locale: "id",
    createdAt: new Date("2026-10-25T03:15:00Z"),
  },
  {
    trackingCode: "INV-CN5N-QP2W-SQ",
    name: "Sinta Maharani",
    email: "sinta.maharani@contoh.test",
    phone: null,
    organization: "CV Maharani Niaga",
    message:
      "Mohon informasi umum mengenai insentif atau kemudahan yang tersedia bagi investor baru di Kabupaten ABC.",
    opportunity: null,
    user: null,
    agency: null, // belum ditugaskan
    status: "NEW",
    locale: "id",
    createdAt: new Date("2026-10-26T07:40:00Z"),
  },
  {
    trackingCode: "INV-KN9T-NUM9-JE",
    name: "Michael Tan",
    email: "michael.tan@example.test",
    phone: "0812-0000-2003",
    organization: "Harbour Leisure Group (fictional)",
    message:
      "We would like to know whether the beach resort site already has road access and a power connection, and what the expected land arrangement is.",
    opportunity: "pembangunan-resort-pantai",
    user: null,
    agency: "pariwisata",
    status: "NEW",
    locale: "en",
    createdAt: new Date("2026-10-24T09:05:00Z"),
  },
  // ------------- IN_PROGRESS -------------
  {
    trackingCode: "INV-C4UC-A4WH-CF",
    name: "Dimas Ardiansyah",
    email: "investor1@investyuk.test",
    phone: "0812-0000-2004",
    organization: null,
    message:
      "Apakah kawasan agrowisata hortikultura terbuka untuk kemitraan bertahap? Saya ingin memulai dari pengelolaan rumah kaca.",
    opportunity: "pengembangan-agrowisata-hortikultura",
    user: "investor1",
    agency: "pertanian",
    status: "IN_PROGRESS",
    locale: "id",
    createdAt: new Date("2026-10-18T02:30:00Z"),
    note: "Siapkan peta zonasi kawasan dan daftar kelompok tani calon mitra plasma sebelum menghubungi investor.",
  },
  {
    trackingCode: "INV-PET2-B7HF-7E",
    name: "Agus Salim Hidayat",
    email: "agus.hidayat@contoh.test",
    phone: "0812-0000-2005",
    organization: "PT Samudra Beku Lestari (fiktif)",
    message:
      "Berapa kapasitas listrik yang tersedia di dekat pelabuhan untuk gudang pendingin, dan apakah ada lahan alternatif?",
    opportunity: "cold-storage-hasil-perikanan",
    user: null,
    agency: "perikanan",
    status: "IN_PROGRESS",
    locale: "id",
    createdAt: new Date("2026-10-15T04:20:00Z"),
    note: "Koordinasikan dengan Dinas ESDM terkait data daya listrik di sekitar pelabuhan.",
  },
  {
    trackingCode: "INV-WJXC-ZCZ8-XS",
    name: "Yohana Siregar",
    email: "yohana.siregar@contoh.test",
    phone: null,
    organization: "PT Logam Prima Nusantara (fiktif)",
    message:
      "Kami mencari kaveling sekitar 5 hektare di kawasan industri terpadu. Mohon informasi skema sewa atau beli dan utilitas yang tersedia.",
    opportunity: "kawasan-industri-terpadu",
    user: null,
    agency: "perindag",
    status: "IN_PROGRESS",
    locale: "id",
    createdAt: new Date("2026-10-12T06:00:00Z"),
    note: "Minta pengelola kawasan mengirim daftar kaveling yang masih tersedia.",
  },
  // --------------- REPLIED ---------------
  {
    trackingCode: "INV-VP9Q-2ZJV-2G",
    name: "Larasati Putri",
    email: "investor2@investyuk.test",
    phone: "0812-0000-2007",
    organization: null,
    message:
      "Apakah tersedia data kunjungan wisatawan ke Pantai Karang Biru dalam beberapa tahun terakhir?",
    opportunity: "pembangunan-resort-pantai",
    user: "investor2",
    agency: "pariwisata",
    status: "REPLIED",
    locale: "id",
    createdAt: new Date("2026-10-05T05:10:00Z"),
    note: "Gunakan data kunjungan dari laporan tahunan dinas; jangan sertakan data per pengelola usaha.",
    reply:
      "Terima kasih atas pertanyaannya. Ringkasan data kunjungan wisatawan tiga tahun terakhir telah kami kirim ke email Anda. Kami juga dapat menjadwalkan kunjungan lapangan bila diperlukan.",
  },
  {
    trackingCode: "INV-7ERN-BL5J-75",
    name: "Bagus Wicaksono",
    email: "bagus.wicaksono@contoh.test",
    phone: "0812-0000-2008",
    organization: null,
    message:
      "Untuk rumah kaca hidroponik, apakah sumber air di lokasi mencukupi sepanjang musim kemarau?",
    opportunity: "rumah-kaca-sayuran-hidroponik",
    user: null,
    agency: "pertanian",
    status: "REPLIED",
    locale: "id",
    createdAt: new Date("2026-10-02T08:45:00Z"),
    note: "Cek catatan debit mata air dari penyuluh pertanian setempat.",
    reply:
      "Lokasi berada dekat mata air yang dimanfaatkan kelompok tani sepanjang tahun. Untuk kepastian, kami sarankan pengukuran debit air saat kunjungan lapangan. Silakan balas bila ingin menjadwalkan kunjungan.",
  },
  {
    trackingCode: "INV-AUUN-PGU3-Q3",
    name: "Rudi Hartono",
    email: "rudi.hartono@contoh.test",
    phone: null,
    organization: "Koperasi Maju Bersama (fiktif)",
    message:
      "Apakah koperasi bisa menjadi investor untuk peluang skala kecil, dan dokumen apa saja yang perlu disiapkan?",
    opportunity: null,
    user: null,
    agency: "dpmptsp",
    status: "REPLIED",
    locale: "id",
    createdAt: new Date("2026-09-28T03:00:00Z"),
    reply:
      "Bisa. Koperasi dapat mendaftar melalui sistem OSS untuk memperoleh NIB. Silakan lihat halaman Prosedur & Persyaratan, dan kunjungi kantor kami bila memerlukan pendampingan.",
  },
  // ----------------- DONE -----------------
  {
    trackingCode: "INV-BTAT-BJ5Z-MY",
    name: "Dimas Ardiansyah",
    email: "investor1@investyuk.test",
    phone: "0812-0000-2004",
    organization: null,
    message:
      "Apakah pabrik pengolahan kopi bisa bermitra langsung dengan koperasi petani kopi di Bukit Kenanga?",
    opportunity: "pabrik-pengolahan-kopi",
    user: "investor1",
    agency: "pertanian",
    status: "DONE",
    locale: "id",
    createdAt: new Date("2026-09-08T02:20:00Z"),
    note: "Kontak koperasi petani kopi sudah dikonfirmasi bersedia dihubungi.",
    reply:
      "Bisa. Kami telah menghubungkan Anda dengan pengurus koperasi petani kopi setempat. Kontak lengkap kami kirim melalui email.",
  },
  {
    trackingCode: "INV-VRLP-A58H-NE",
    name: "Emily Hartmann",
    email: "emily.hartmann@example.test",
    phone: null,
    organization: "Green Grid Partners (fictional)",
    message:
      "Is there any published survey data on the geothermal potential at Gunung Damar, and who should we contact to discuss exploration?",
    opportunity: "pembangkit-listrik-panas-bumi",
    user: null,
    agency: "esdm",
    status: "DONE",
    locale: "en",
    createdAt: new Date("2026-09-10T07:30:00Z"),
    note: "Ringkasan survei pendahuluan boleh dibagikan; data rinci menunggu persetujuan pimpinan.",
    reply:
      "Thank you for your interest. We have emailed a summary of the preliminary survey and the contact details of our energy team, who can arrange a meeting.",
  },
  {
    trackingCode: "INV-PEFQ-YE7Q-UA",
    name: "Nur Aini",
    email: "nur.aini@contoh.test",
    phone: "0812-0000-2012",
    organization: null,
    message:
      "Saya ingin membantu pemasaran produk anyaman bambu. Apakah studio kriya sudah memiliki perajin tetap?",
    opportunity: "studio-kriya-anyaman-bambu",
    user: null,
    agency: "pariwisata",
    status: "DONE",
    locale: "id",
    createdAt: new Date("2026-09-15T04:00:00Z"),
    reply:
      "Saat ini ada sekitar 30 perajin aktif yang tergabung dalam kelompok usaha di Sari Mekar. Kami sudah menyampaikan minat Anda kepada ketua kelompok.",
  },
];

export const inquiries: InquirySeed[] = raw.map((i) => {
  const { events, closedAt } = buildEvents(i);
  const { note: _note, reply: _reply, ...rest } = i;
  void _note;
  void _reply;
  return {
    ...rest,
    consentAt: i.createdAt,
    consentVersion: "v1",
    closedAt,
    events,
  };
});
