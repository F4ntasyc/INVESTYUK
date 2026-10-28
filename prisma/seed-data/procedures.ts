// Langkah prosedur investasi (umum, tanpa angka/aturan hukum spesifik).
// Tabel tanpa kolom unik: seed menghapus lalu membuat ulang seluruh baris.

export type ProcedureSeed = {
  stepOrder: number;
  titleId: string;
  titleEn: string;
  contentId: string;
  contentEn: string;
};

export const procedures: ProcedureSeed[] = [
  {
    stepOrder: 1,
    titleId: "Telusuri peluang dan informasi awal",
    titleEn: "Explore opportunities and background information",
    contentId:
      "Pelajari sektor unggulan, profil kecamatan, dan daftar peluang di INVESTYUK. Gunakan pencarian cerdas, filter, atau fitur bandingkan untuk menyaring peluang yang sesuai dengan minat dan kemampuan modal Anda.",
    contentEn:
      "Read up on the priority sectors, district profiles and opportunity listings on INVESTYUK. Use smart search, filters or the compare feature to narrow down opportunities that match your interests and budget.",
  },
  {
    stepOrder: 2,
    titleId: "Ajukan inquiry dan konsultasi",
    titleEn: "Send an inquiry and get advice",
    contentId:
      "Kirim pertanyaan melalui formulir inquiry. Anda akan menerima kode tracking untuk memantau tindak lanjut. Dinas pembina sektor akan menghubungi Anda untuk menjelaskan kondisi lokasi, data pendukung, dan langkah berikutnya.",
    contentEn:
      "Send your questions through the inquiry form. You will receive a tracking code so you can follow up. The office responsible for the sector will contact you about site conditions, supporting data and next steps.",
  },
  {
    stepOrder: 3,
    titleId: "Kunjungi dan verifikasi lokasi",
    titleEn: "Visit and verify the site",
    contentId:
      "Jadwalkan kunjungan lapangan bersama dinas terkait. Periksa status lahan, akses jalan, ketersediaan air dan listrik, serta kondisi sosial masyarakat sekitar sebelum mengambil keputusan.",
    contentEn:
      "Arrange a site visit with the relevant office. Check land status, road access, water and power supply, and the local community context before you decide.",
  },
  {
    stepOrder: 4,
    titleId: "Daftarkan usaha melalui OSS",
    titleEn: "Register your business through OSS",
    contentId:
      "Lakukan pendaftaran berusaha melalui sistem Online Single Submission (OSS) untuk memperoleh Nomor Induk Berusaha (NIB). Petugas DPMPTSP Kabupaten ABC dapat membantu bila Anda mengalami kendala.",
    contentEn:
      "Register through the Online Single Submission (OSS) system to obtain a Business Identification Number (NIB). Staff at the ABC Regency Investment and One-Stop Services Office can help if you run into problems.",
  },
  {
    stepOrder: 5,
    titleId: "Pastikan kesesuaian tata ruang dan lingkungan",
    titleEn: "Confirm spatial planning and environmental fit",
    contentId:
      "Pastikan rencana kegiatan sesuai dengan rencana tata ruang daerah dan siapkan dokumen lingkungan yang sesuai dengan tingkat risiko usaha. Konsultasikan jenis dokumen yang dibutuhkan kepada dinas terkait.",
    contentEn:
      "Make sure your plans fit the regional spatial plan and prepare the environmental documents that match your business risk level. Ask the relevant office which documents you need.",
  },
  {
    stepOrder: 6,
    titleId: "Urus persetujuan bangunan dan izin sektor",
    titleEn: "Obtain building approval and sector permits",
    contentId:
      "Bila kegiatan memerlukan bangunan, ajukan persetujuan bangunan gedung. Beberapa sektor juga memerlukan izin atau standar khusus; dinas pembina sektor akan menjelaskan persyaratannya.",
    contentEn:
      "If your project involves a building, apply for building approval. Some sectors also need specific permits or standards; the sector office will explain what applies.",
  },
  {
    stepOrder: 7,
    titleId: "Realisasi dan pendampingan",
    titleEn: "Get started and stay supported",
    contentId:
      "Mulai pembangunan dan operasional usaha. Pemerintah daerah memantau perkembangan realisasi investasi, membantu menyelesaikan hambatan di lapangan, dan menghubungkan Anda dengan mitra lokal.",
    contentEn:
      "Begin construction and operations. The regency government tracks investment progress, helps clear obstacles on the ground and connects you with local partners.",
  },
];
