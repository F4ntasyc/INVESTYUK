// Kecamatan FIKTIF Kabupaten ABC. Nama dan koordinat tidak mewakili wilayah nyata;
// koordinat hanya dibuat berdekatan (rentang ±45 km) agar peta terlihat masuk akal.
// Utara: pegunungan · tengah: kota & dataran · selatan: pesisir.

export type DistrictSlug =
  | "gunung-damar"
  | "bukit-kenanga"
  | "lembah-cempaka"
  | "kota-harapan"
  | "sari-mekar"
  | "padang-seroja"
  | "muara-sentosa"
  | "teluk-lazuardi"
  | "pantai-karang-biru";

export type DistrictSeed = {
  slug: DistrictSlug;
  name: string;
  latitude: number;
  longitude: number;
};

export const districts: DistrictSeed[] = [
  { slug: "gunung-damar", name: "Gunung Damar", latitude: -7.22, longitude: 107.72 },
  { slug: "bukit-kenanga", name: "Bukit Kenanga", latitude: -7.26, longitude: 107.86 },
  { slug: "lembah-cempaka", name: "Lembah Cempaka", latitude: -7.3, longitude: 107.64 },
  { slug: "kota-harapan", name: "Kota Harapan", latitude: -7.36, longitude: 107.79 },
  { slug: "sari-mekar", name: "Sari Mekar", latitude: -7.42, longitude: 107.68 },
  { slug: "padang-seroja", name: "Padang Seroja", latitude: -7.44, longitude: 107.92 },
  { slug: "muara-sentosa", name: "Muara Sentosa", latitude: -7.55, longitude: 107.98 },
  { slug: "teluk-lazuardi", name: "Teluk Lazuardi", latitude: -7.6, longitude: 107.83 },
  { slug: "pantai-karang-biru", name: "Pantai Karang Biru", latitude: -7.62, longitude: 107.66 },
];
