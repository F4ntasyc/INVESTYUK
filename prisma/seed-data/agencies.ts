// Dinas/OPD fiktif Kabupaten ABC.
// Tabel `agencies` tidak punya kolom unik selain `id`, jadi `id` ditulis tetap
// di sini dan seed melakukan upsert berdasarkan `id`. Jangan ubah id yang sudah ada.

export type AgencySeed = {
  id: number;
  key: AgencyKey;
  nameId: string;
  nameEn: string;
  email: string;
  phone: string;
};

export type AgencyKey =
  | "dpmptsp"
  | "pertanian"
  | "perikanan"
  | "pariwisata"
  | "perindag"
  | "esdm";

export const agencies: AgencySeed[] = [
  {
    id: 1,
    key: "dpmptsp",
    nameId:
      "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kabupaten ABC",
    nameEn: "ABC Regency Investment and One-Stop Integrated Services Office",
    email: "dpmptsp@abckab.test",
    phone: "0812-0000-0101",
  },
  {
    id: 2,
    key: "pertanian",
    nameId: "Dinas Pertanian dan Ketahanan Pangan Kabupaten ABC",
    nameEn: "ABC Regency Agriculture and Food Security Office",
    email: "pertanian@abckab.test",
    phone: "0812-0000-0102",
  },
  {
    id: 3,
    key: "perikanan",
    nameId: "Dinas Kelautan dan Perikanan Kabupaten ABC",
    nameEn: "ABC Regency Marine Affairs and Fisheries Office",
    email: "perikanan@abckab.test",
    phone: "0812-0000-0103",
  },
  {
    id: 4,
    key: "pariwisata",
    nameId: "Dinas Pariwisata dan Ekonomi Kreatif Kabupaten ABC",
    nameEn: "ABC Regency Tourism and Creative Economy Office",
    email: "pariwisata@abckab.test",
    phone: "0812-0000-0104",
  },
  {
    id: 5,
    key: "perindag",
    nameId: "Dinas Perindustrian dan Perdagangan Kabupaten ABC",
    nameEn: "ABC Regency Industry and Trade Office",
    email: "perindag@abckab.test",
    phone: "0812-0000-0105",
  },
  {
    id: 6,
    key: "esdm",
    nameId: "Dinas Energi dan Sumber Daya Mineral Kabupaten ABC",
    nameEn: "ABC Regency Energy and Mineral Resources Office",
    email: "esdm@abckab.test",
    phone: "0812-0000-0106",
  },
];
