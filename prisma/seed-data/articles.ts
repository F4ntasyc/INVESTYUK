// Artikel edukasi (Markdown). Semua PUBLISHED, penulis = akun admin.
// `category` disimpan sebagai key; label ID/EN-nya nanti diambil dari messages:
//   dasar · perizinan · analisis · kemitraan · risiko · daerah

export type ArticleSeed = {
  slug: string;
  category: "dasar" | "perizinan" | "analisis" | "kemitraan" | "risiko" | "daerah";
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  publishedAt: Date;
};

const DISCLAIMER_ID =
  "> **Catatan:** artikel ini bersifat edukatif dan bukan nasihat keuangan. Lakukan kajian sendiri dan konsultasikan keputusan Anda dengan pihak yang berkompeten.";
const DISCLAIMER_EN =
  "> **Note:** this article is for education only and is not financial advice. Do your own research and discuss your decisions with qualified advisers.";

export const articles: ArticleSeed[] = [
  {
    slug: "mengenal-investasi-daerah",
    category: "dasar",
    publishedAt: new Date("2026-07-06T02:00:00Z"),
    titleId: "Mengenal Investasi Daerah",
    titleEn: "Understanding Regional Investment",
    excerptId:
      "Apa itu investasi daerah, siapa saja yang terlibat, dan mengapa pemerintah daerah membuka peluangnya untuk umum.",
    excerptEn:
      "What regional investment is, who takes part, and why local governments open opportunities to the public.",
    contentId: `Investasi daerah adalah penanaman modal untuk kegiatan usaha di suatu wilayah, misalnya kabupaten atau kota. Modal itu bisa berasal dari perorangan, koperasi, perusahaan dalam negeri, maupun asing.

## Mengapa daerah membuka peluang investasi?

- **Membuka lapangan kerja** bagi warga setempat.
- **Menambah nilai** hasil pertanian, perikanan, dan sumber daya lokal lain.
- **Mempercepat pembangunan** sarana yang belum bisa dibiayai anggaran daerah saja.

## Siapa saja yang terlibat?

Investor menyediakan modal dan keahlian usaha. Pemerintah daerah menyediakan informasi, layanan perizinan, dan pendampingan. Masyarakat sekitar menjadi tenaga kerja, pemasok, sekaligus pihak yang merasakan dampaknya.

Investasi yang baik menguntungkan ketiganya, bukan hanya salah satu pihak.

${DISCLAIMER_ID}`,
    contentEn: `Regional investment means putting capital into business activity in a particular area, such as a regency or city. The money can come from individuals, cooperatives, domestic companies or foreign investors.

## Why do regions open up investment opportunities?

- **To create jobs** for local people.
- **To add value** to farm, fisheries and other local resources.
- **To speed up development** of facilities the regional budget cannot fund alone.

## Who takes part?

Investors bring capital and business expertise. The regional government provides information, licensing services and support. The local community supplies workers and goods, and lives with the results.

Good investment works for all three, not just one of them.

${DISCLAIMER_EN}`,
  },
  {
    slug: "memahami-roi-dan-masa-balik-modal",
    category: "analisis",
    publishedAt: new Date("2026-07-13T02:00:00Z"),
    titleId: "Memahami ROI dan Masa Balik Modal",
    titleEn: "Understanding ROI and Payback Period",
    excerptId:
      "Dua angka yang sering muncul di halaman peluang: apa artinya, dan apa yang tidak bisa dijelaskan keduanya.",
    excerptEn:
      "Two figures you will see on every opportunity page: what they mean, and what they cannot tell you.",
    contentId: `Setiap peluang di INVESTYUK mencantumkan **perkiraan ROI** dan **masa balik modal**. Keduanya membantu membandingkan peluang secara cepat.

## ROI (Return on Investment)

ROI menunjukkan perkiraan keuntungan per tahun dibandingkan modal yang ditanam, dinyatakan dalam persen. Semakin tinggi ROI, semakin cepat modal "bekerja" untuk Anda.

## Masa balik modal

Masa balik modal adalah perkiraan berapa tahun yang dibutuhkan sampai keuntungan menutup modal awal.

## Yang tidak dijelaskan kedua angka ini

- **Risiko.** ROI tinggi sering datang bersama risiko yang lebih tinggi.
- **Waktu persiapan.** Perizinan dan pembangunan bisa memakan waktu sebelum usaha menghasilkan.
- **Arus kas.** Usaha bisa untung di atas kertas tetapi kekurangan uang tunai di bulan-bulan awal.

Pada umumnya, usaha skala kecil memiliki ROI lebih tinggi dan balik modal lebih cepat, sedangkan proyek besar membutuhkan waktu lebih panjang.

${DISCLAIMER_ID}`,
    contentEn: `Every opportunity on INVESTYUK shows an **estimated ROI** and a **payback period**. Together they make quick comparisons easier.

## ROI (Return on Investment)

ROI is the estimated yearly profit compared with the capital invested, shown as a percentage. The higher the ROI, the harder your money is working.

## Payback period

The payback period estimates how many years it takes for profits to cover the initial investment.

## What these figures leave out

- **Risk.** A high ROI often comes with higher risk.
- **Lead time.** Permits and construction can take a while before the business earns anything.
- **Cash flow.** A business can be profitable on paper and still run short of cash in its first months.

As a rule, small businesses tend to show a higher ROI and faster payback, while large projects take longer to pay off.

${DISCLAIMER_EN}`,
  },
  {
    slug: "langkah-perizinan-berusaha",
    category: "perizinan",
    publishedAt: new Date("2026-07-20T02:00:00Z"),
    titleId: "Gambaran Umum Perizinan Berusaha",
    titleEn: "An Overview of Business Licensing",
    excerptId:
      "Urutan umum mengurus izin usaha, dari pendaftaran di OSS hingga persetujuan bangunan.",
    excerptEn:
      "The usual order of business licensing, from OSS registration to building approval.",
    contentId: `Perizinan berusaha di Indonesia kini dilakukan secara elektronik melalui sistem **Online Single Submission (OSS)**. Jenis izin yang dibutuhkan bergantung pada tingkat risiko kegiatan usaha.

## Urutan umum

1. **Pendaftaran** di OSS untuk mendapatkan Nomor Induk Berusaha (NIB).
2. **Kesesuaian tata ruang**: memastikan lokasi usaha sesuai rencana tata ruang.
3. **Dokumen lingkungan** sesuai tingkat risiko usaha.
4. **Persetujuan bangunan** bila usaha memerlukan bangunan baru.
5. **Izin atau standar sektor** yang berlaku khusus untuk bidang usaha tertentu.

## Tips

- Siapkan data perusahaan dan rencana usaha sebelum mendaftar.
- Tanyakan dokumen yang diperlukan kepada dinas pembina sektor sejak awal.
- Gunakan layanan pendampingan DPMPTSP bila mengalami kendala teknis.

Persyaratan rinci dapat berubah sesuai peraturan terbaru, jadi selalu periksa informasi resmi yang berlaku.`,
    contentEn: `Business licensing in Indonesia is now handled electronically through the **Online Single Submission (OSS)** system. The permits you need depend on how risky your business activity is.

## The usual order

1. **Register** on OSS to get a Business Identification Number (NIB).
2. **Spatial fit**: confirm the site matches the spatial plan.
3. **Environmental documents** that match your risk level.
4. **Building approval** if you need a new building.
5. **Sector permits or standards** that apply to specific lines of business.

## Tips

- Have your company details and business plan ready before you register.
- Ask the sector office early which documents you will need.
- Use the support desk at the Investment and One-Stop Services Office if you hit technical problems.

Detailed requirements change as regulations are updated, so always check the current official guidance.`,
  },
  {
    slug: "membaca-potensi-sektor-unggulan",
    category: "daerah",
    publishedAt: new Date("2026-07-27T02:00:00Z"),
    titleId: "Membaca Potensi Sektor Unggulan Kabupaten ABC",
    titleEn: "Reading the Priority Sectors of ABC Regency",
    excerptId:
      "Pegunungan di utara, dataran di tengah, dan pesisir di selatan: bagaimana bentang alam membentuk peluang.",
    excerptEn:
      "Mountains in the north, plains in the middle, coast in the south: how the landscape shapes opportunity.",
    contentId: `Kabupaten ABC memiliki tiga bentang alam yang berbeda, dan masing-masing membawa peluang tersendiri.

## Utara: pegunungan

Udara sejuk dan tanah subur cocok untuk **kopi, hortikultura, dan peternakan sapi perah**. Aliran sungai dan sumber panas bumi juga membuka peluang **energi terbarukan**.

## Tengah: kota dan dataran

Kota Harapan menjadi pusat **perdagangan dan ekonomi kreatif**. Dataran di sekitarnya menampung **industri pengolahan** dan sentra pertanian pangan.

## Selatan: pesisir

Pantai, teluk, dan muara menjadi basis **perikanan dan pariwisata bahari**, dari keramba skala rumah tangga hingga kawasan wisata terpadu.

Memahami bentang alam membantu Anda memilih lokasi yang dekat dengan bahan baku, pasar, dan tenaga kerja.`,
    contentEn: `ABC Regency has three distinct landscapes, and each brings its own opportunities.

## North: the mountains

Cool air and rich soil suit **coffee, horticulture and dairy farming**. Rivers and geothermal heat also open the door to **renewable energy**.

## Centre: town and plains

Kota Harapan is the hub for **trade and the creative economy**. The surrounding plains host **processing industries** and food-crop farming.

## South: the coast

Beaches, a bay and estuaries are the base for **fisheries and marine tourism**, from household fish cages to an integrated resort area.

Understanding the landscape helps you pick a site close to raw materials, markets and workers.`,
  },
  {
    slug: "kemitraan-dengan-umkm-dan-petani-lokal",
    category: "kemitraan",
    publishedAt: new Date("2026-08-03T02:00:00Z"),
    titleId: "Kemitraan dengan UMKM dan Petani Lokal",
    titleEn: "Partnering with Local Small Businesses and Farmers",
    excerptId:
      "Melibatkan pelaku usaha setempat bukan sekadar kewajiban sosial; sering kali itu strategi pasokan yang paling andal.",
    excerptEn:
      "Working with local producers is more than a social duty; it is often the most reliable supply strategy.",
    contentId: `Banyak peluang di Kabupaten ABC bergantung pada bahan baku dari petani, nelayan, dan perajin setempat. Kemitraan yang dirancang dengan baik menguntungkan kedua pihak.

## Bentuk kemitraan yang umum

- **Kontrak pembelian**: investor membeli hasil panen dengan harga dan mutu yang disepakati.
- **Pola inti–plasma**: investor menyediakan bibit, pelatihan, dan pasar; mitra mengelola kebun atau kolam.
- **Bagi hasil**: keuntungan dibagi sesuai porsi kontribusi.

## Kunci keberhasilan

1. Perjanjian tertulis yang jelas dan mudah dipahami kedua pihak.
2. Harga yang adil dan pembayaran tepat waktu.
3. Pendampingan teknis agar mutu pasokan konsisten.

Dinas pembina sektor dapat membantu mempertemukan investor dengan kelompok tani, kelompok pembudidaya, atau koperasi setempat.`,
    contentEn: `Many opportunities in ABC Regency rely on raw materials from local farmers, fishers and craftspeople. A well-designed partnership benefits both sides.

## Common partnership models

- **Purchase contracts**: the investor buys produce at an agreed price and quality.
- **Nucleus–outgrower schemes**: the investor supplies seedlings, training and a market; partners run the farms or ponds.
- **Profit sharing**: profits are split according to each party's contribution.

## What makes it work

1. A clear written agreement both sides can understand.
2. Fair prices and on-time payment.
3. Technical support so supply quality stays consistent.

Sector offices can help introduce investors to local farmer groups, fish farmer groups or cooperatives.`,
  },
  {
    slug: "mengelola-risiko-investasi",
    category: "risiko",
    publishedAt: new Date("2026-08-10T02:00:00Z"),
    titleId: "Mengelola Risiko Investasi",
    titleEn: "Managing Investment Risk",
    excerptId:
      "Risiko tidak bisa dihapus, tetapi bisa dikenali dan dikurangi sejak awal.",
    excerptEn:
      "Risk cannot be removed, but it can be spotted early and reduced.",
    contentId: `Setiap investasi mengandung risiko. Investor yang baik bukan yang menghindari semua risiko, melainkan yang mengenali dan mengelolanya.

## Jenis risiko yang perlu diperhatikan

- **Risiko pasar**: harga jual turun atau permintaan berkurang.
- **Risiko pasokan**: bahan baku tidak tersedia sesuai jumlah dan mutu.
- **Risiko operasional**: kerusakan alat, kekurangan tenaga terampil.
- **Risiko alam**: cuaca ekstrem, banjir, atau gelombang tinggi di wilayah pesisir.
- **Risiko regulasi**: perubahan aturan yang memengaruhi usaha.

## Cara mengurangi risiko

1. Mulai dari skala yang sesuai kemampuan, lalu kembangkan bertahap.
2. Lakukan kunjungan lapangan dan bicara langsung dengan warga serta pelaku usaha setempat.
3. Siapkan dana cadangan untuk masa awal operasional.
4. Pertimbangkan asuransi untuk aset dan usaha.

${DISCLAIMER_ID}`,
    contentEn: `Every investment carries risk. Good investors do not avoid all risk; they recognise it and manage it.

## Risks to watch

- **Market risk**: selling prices fall or demand shrinks.
- **Supply risk**: raw materials are not available in the right quantity or quality.
- **Operational risk**: equipment breaks down or skilled staff are hard to find.
- **Natural risk**: extreme weather, floods or high waves on the coast.
- **Regulatory risk**: rule changes that affect the business.

## Ways to reduce risk

1. Start at a scale you can handle, then grow in stages.
2. Visit the site and talk directly with residents and local businesses.
3. Keep a cash reserve for the early months of operation.
4. Consider insurance for your assets and business.

${DISCLAIMER_EN}`,
  },
  {
    slug: "menyiapkan-studi-kelayakan-sederhana",
    category: "analisis",
    publishedAt: new Date("2026-08-17T02:00:00Z"),
    titleId: "Menyiapkan Studi Kelayakan Sederhana",
    titleEn: "Preparing a Simple Feasibility Study",
    excerptId:
      "Lima pertanyaan yang perlu dijawab sebelum menanamkan modal, bahkan untuk usaha kecil.",
    excerptEn:
      "Five questions to answer before you invest, even in a small business.",
    contentId: `Studi kelayakan membantu Anda menilai apakah sebuah usaha layak dijalankan. Untuk usaha kecil, studi ini tidak perlu tebal; yang penting jujur dan berdasarkan data.

## Lima pertanyaan inti

1. **Pasar**: siapa pembelinya, berapa banyak, dan berapa harga yang mau mereka bayar?
2. **Teknis**: apa saja peralatan, bahan baku, dan keahlian yang dibutuhkan?
3. **Lokasi**: apakah lokasi mudah dijangkau dan sesuai tata ruang?
4. **Keuangan**: berapa modal awal, biaya bulanan, dan perkiraan pendapatan?
5. **Dampak**: bagaimana usaha memengaruhi lingkungan dan masyarakat sekitar?

## Gunakan data dari INVESTYUK

Halaman peluang menyediakan perkiraan nilai investasi, ROI, dan masa balik modal sebagai titik awal. Lengkapi dengan data lapangan dan hasil konsultasi bersama dinas terkait.

${DISCLAIMER_ID}`,
    contentEn: `A feasibility study helps you judge whether a business is worth starting. For a small business it need not be long; it needs to be honest and grounded in data.

## Five core questions

1. **Market**: who will buy, how much, and at what price?
2. **Technical**: what equipment, raw materials and skills are needed?
3. **Location**: is the site easy to reach and in line with the spatial plan?
4. **Finance**: what are the start-up costs, monthly costs and expected income?
5. **Impact**: how will the business affect the environment and the local community?

## Use INVESTYUK as a starting point

Each opportunity page gives estimated investment value, ROI and payback period. Add your own field data and the advice you get from the relevant office.

${DISCLAIMER_EN}`,
  },
  {
    slug: "cara-memakai-pencarian-cerdas-investyuk",
    category: "dasar",
    publishedAt: new Date("2026-08-24T02:00:00Z"),
    titleId: "Cara Memakai Pencarian Cerdas INVESTYUK",
    titleEn: "How to Use INVESTYUK Smart Search",
    excerptId:
      "Ketik kebutuhan Anda seperti sedang bertanya, dan biarkan sistem menyusun filternya.",
    excerptEn:
      "Type what you need as if you were asking a person, and let the system build the filters.",
    contentId: `Pencarian cerdas INVESTYUK memahami kalimat sehari-hari. Anda tidak perlu memilih filter satu per satu.

## Contoh pencarian

- "lahan perikanan di bawah 500 juta"
- "pabrik pengolahan hasil pertanian"
- "investasi pariwisata di pantai"
- "kawasan industri"

Sistem akan mengenali sektor, lokasi, dan kisaran nilai dalam kalimat Anda, lalu menampilkannya sebagai chip filter yang bisa diubah.

## Tips

- Sebutkan sektor atau jenis usaha yang Anda cari.
- Tambahkan batas modal bila ada, misalnya "di bawah 1 miliar".
- Sebutkan nama kecamatan bila Anda sudah punya lokasi incaran.

Hasil pencarian adalah bantuan untuk menemukan informasi, bukan rekomendasi investasi.`,
    contentEn: `INVESTYUK smart search understands everyday sentences, so you do not have to pick filters one by one.

## Example searches

- "fisheries land under 500 million"
- "farm produce processing plant"
- "beach tourism investment"
- "industrial estate"

The system picks out the sector, location and budget in your sentence and shows them as filter chips you can adjust.

## Tips

- Mention the sector or type of business you want.
- Add a budget limit if you have one, such as "under 1 billion".
- Name a district if you already have a location in mind.

Search results help you find information; they are not investment recommendations.`,
  },
];
