import type { AgencyKey } from "./agencies";

// `icon`  = nama komponen ikon lucide-react (mis. <Sprout />).
// `color` = nama warna token di src/app/globals.css; UI memakai pasangan
//           `bg-tint-<color>` (latar pastel) + `text-icon-<color>` (ikon).
//           Pilihan yang ada: green, purple, blue, orange, pink, teal, indigo.

export type SectorSlug =
  | "pertanian"
  | "perikanan"
  | "pariwisata"
  | "industri"
  | "perdagangan"
  | "energi"
  | "ekonomi-kreatif";

export type SectorSeed = {
  slug: SectorSlug;
  nameId: string;
  nameEn: string;
  descriptionId: string;
  descriptionEn: string;
  icon: string;
  color: "green" | "purple" | "blue" | "orange" | "pink" | "teal" | "indigo";
  sortOrder: number;
  agency: AgencyKey;
};

export const sectors: SectorSeed[] = [
  {
    slug: "pertanian",
    nameId: "Pertanian",
    nameEn: "Agriculture",
    descriptionId:
      "Lahan dataran tinggi yang subur untuk hortikultura, kopi, dan tanaman pangan, didukung kelompok tani yang aktif dan peluang hilirisasi hasil panen.",
    descriptionEn:
      "Fertile highlands suited to horticulture, coffee and food crops, backed by active farmer groups and room to add value through processing.",
    icon: "Sprout",
    color: "green",
    sortOrder: 1,
    agency: "pertanian",
  },
  {
    slug: "perikanan",
    nameId: "Perikanan",
    nameEn: "Fisheries",
    descriptionId:
      "Garis pantai, muara, dan kolam air tawar memberi ruang bagi budidaya, penangkapan, serta pengolahan hasil perikanan dari skala rumah tangga hingga kawasan.",
    descriptionEn:
      "A coastline, estuaries and freshwater ponds support aquaculture, capture fisheries and seafood processing, from household operations to full-scale estates.",
    icon: "Fish",
    color: "blue",
    sortOrder: 2,
    agency: "perikanan",
  },
  {
    slug: "pariwisata",
    nameId: "Pariwisata",
    nameEn: "Tourism",
    descriptionId:
      "Pantai berpasir putih, teluk yang tenang, dan lembah sejuk menjadi modal pengembangan akomodasi, wisata bahari, dan wisata alam.",
    descriptionEn:
      "White-sand beaches, a sheltered bay and cool valleys make a strong base for accommodation, marine tourism and nature-based travel.",
    icon: "TreePalm",
    color: "teal",
    sortOrder: 3,
    agency: "pariwisata",
  },
  {
    slug: "industri",
    nameId: "Industri",
    nameEn: "Industry",
    descriptionId:
      "Kawasan dataran dengan akses jalan utama cocok untuk industri pengolahan, terutama yang memanfaatkan bahan baku pertanian dan perikanan lokal.",
    descriptionEn:
      "Flat land with main-road access suits manufacturing, especially processing that draws on local farm and fisheries output.",
    icon: "Factory",
    color: "purple",
    sortOrder: 4,
    agency: "perindag",
  },
  {
    slug: "perdagangan",
    nameId: "Perdagangan",
    nameEn: "Trade",
    descriptionId:
      "Pusat kecamatan yang terus tumbuh membutuhkan pasar, pusat distribusi, dan ruang usaha untuk melayani warga serta pengunjung.",
    descriptionEn:
      "Growing district centres need markets, distribution hubs and retail space to serve residents and visitors alike.",
    icon: "Store",
    color: "indigo",
    sortOrder: 5,
    agency: "perindag",
  },
  {
    slug: "energi",
    nameId: "Energi",
    nameEn: "Energy",
    descriptionId:
      "Potensi panas bumi, aliran sungai, dan penyinaran matahari membuka peluang energi terbarukan untuk rumah tangga, usaha, dan kawasan industri.",
    descriptionEn:
      "Geothermal heat, river flow and strong sunshine open up renewable energy for homes, businesses and industrial estates.",
    icon: "Zap",
    color: "orange",
    sortOrder: 6,
    agency: "esdm",
  },
  {
    slug: "ekonomi-kreatif",
    nameId: "Ekonomi Kreatif",
    nameEn: "Creative Economy",
    descriptionId:
      "Perajin anyaman, pembatik, dan komunitas kreatif muda siap berkembang lewat ruang produksi, pemasaran digital, dan kemitraan usaha.",
    descriptionEn:
      "Weavers, batik makers and a young creative community are ready to grow through production space, digital marketing and business partnerships.",
    icon: "Palette",
    color: "pink",
    sortOrder: 7,
    agency: "pariwisata",
  },
];
