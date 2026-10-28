import type { AgencyKey } from "./agencies";

// Akun uji untuk lingkungan LOKAL. Password semua akun = SEED_TEST_PASSWORD
// (di-hash bcryptjs cost 12 saat seed). Jangan dipakai di produksi.

export type UserKey = "admin" | "dinasPertanian" | "dinasPariwisata" | "investor1" | "investor2";

export type UserSeed = {
  key: UserKey;
  email: string;
  name: string;
  role: "ADMIN" | "DINAS" | "INVESTOR";
  agency: AgencyKey | null;
};

export const users: UserSeed[] = [
  {
    key: "admin",
    email: "admin@investyuk.test",
    name: "Admin INVESTYUK",
    role: "ADMIN",
    agency: null,
  },
  {
    key: "dinasPertanian",
    email: "dinas.pertanian@investyuk.test",
    name: "Ratna Wulandari",
    role: "DINAS",
    agency: "pertanian",
  },
  {
    key: "dinasPariwisata",
    email: "dinas.pariwisata@investyuk.test",
    name: "Galih Pratama",
    role: "DINAS",
    agency: "pariwisata",
  },
  {
    key: "investor1",
    email: "investor1@investyuk.test",
    name: "Dimas Ardiansyah",
    role: "INVESTOR",
    agency: null,
  },
  {
    key: "investor2",
    email: "investor2@investyuk.test",
    name: "Larasati Putri",
    role: "INVESTOR",
    agency: null,
  },
];

/** Peluang tersimpan per investor (slug peluang). */
export const savedOpportunities: { user: UserKey; opportunity: string }[] = [
  { user: "investor1", opportunity: "pengembangan-agrowisata-hortikultura" },
  { user: "investor1", opportunity: "pabrik-pengolahan-kopi" },
  { user: "investor1", opportunity: "rumah-kaca-sayuran-hidroponik" },
  { user: "investor2", opportunity: "pembangunan-resort-pantai" },
  { user: "investor2", opportunity: "kawasan-industri-terpadu" },
];
