/**
 * Satu-satunya daftar gambar situs.
 * Saat aset asli (jpg/png/webp) datang: taruh file di public/images/, ubah `src`
 * (dan `width`/`height`) di sini, lalu catat sumber + lisensinya di README (Atribusi).
 *
 * `altKey` adalah key terjemahan di namespace `common`, contoh:
 *   const t = await getTranslations("common");
 *   <Image src={images.hero.src} alt={t(images.hero.altKey)} ... />
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  altKey: `images.${string}`;
  /** true selama masih placeholder SVG */
  placeholder: boolean;
};

export const images = {
  logo: {
    src: "/images/logo.svg",
    width: 280,
    height: 56,
    altKey: "images.logo",
    placeholder: true,
  },
  hero: {
    src: "/images/hero.svg",
    width: 1600,
    height: 900,
    altKey: "images.hero",
    placeholder: true,
  },
  peluang: {
    agrowisata: {
      src: "/images/peluang/agrowisata.svg",
      width: 800,
      height: 500,
      altKey: "images.agrowisata",
      placeholder: true,
    },
    resortPantai: {
      src: "/images/peluang/resort-pantai.svg",
      width: 800,
      height: 500,
      altKey: "images.resortPantai",
      placeholder: true,
    },
    kawasanIndustri: {
      src: "/images/peluang/kawasan-industri.svg",
      width: 800,
      height: 500,
      altKey: "images.kawasanIndustri",
      placeholder: true,
    },
  },
  inquiryGedung: {
    src: "/images/inquiry-gedung.svg",
    width: 600,
    height: 400,
    altKey: "images.inquiryGedung",
    placeholder: true,
  },
  /** Gambar umum per sektor (key = slug sektor). Dipakai seed sebagai foto peluang. */
  sektor: {
    pertanian: {
      src: "/images/sektor/pertanian.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.pertanian",
      placeholder: true,
    },
    perikanan: {
      src: "/images/sektor/perikanan.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.perikanan",
      placeholder: true,
    },
    pariwisata: {
      src: "/images/sektor/pariwisata.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.pariwisata",
      placeholder: true,
    },
    industri: {
      src: "/images/sektor/industri.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.industri",
      placeholder: true,
    },
    perdagangan: {
      src: "/images/sektor/perdagangan.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.perdagangan",
      placeholder: true,
    },
    energi: {
      src: "/images/sektor/energi.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.energi",
      placeholder: true,
    },
    "ekonomi-kreatif": {
      src: "/images/sektor/ekonomi-kreatif.svg",
      width: 800,
      height: 500,
      altKey: "images.sektor.ekonomiKreatif",
      placeholder: true,
    },
  },
} as const satisfies {
  logo: SiteImage;
  hero: SiteImage;
  peluang: Record<string, SiteImage>;
  inquiryGedung: SiteImage;
  sektor: Record<string, SiteImage>;
};
