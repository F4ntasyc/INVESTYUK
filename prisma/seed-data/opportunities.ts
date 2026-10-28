import { images } from "../../src/config/images";
import { districts, type DistrictSlug } from "./districts";
import { sectors, type SectorSlug } from "./sectors";

// ±40 peluang FIKTIF. Sebaran angka sengaja membentuk 3 kelompok untuk K-Means
// (PRD bagian 10):
//   kecil    : Rp100 jt–1 M,   ROI 20–35%, balik modal 2–4 th,  tenaga kerja 5–40
//   menengah : Rp1–25 M,       ROI 12–20%, balik modal 4–8 th,  tenaga kerja 40–200
//   besar    : Rp50–800 M,     ROI 8–14%,  balik modal 8–12 th, tenaga kerja 200–2000
// clusterId dan kolom embedding sengaja tidak diisi (dihitung fitur AI nanti).

type Scale = "kecil" | "menengah" | "besar";
type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type RawOpportunity = {
  slug: string;
  sector: SectorSlug;
  district: DistrictSlug;
  scale: Scale;
  /** nilai investasi dalam JUTA rupiah */
  valueJuta: number;
  roi: number;
  payback: number;
  landHa: number | null;
  jobs: number;
  status?: Status;
  featured?: boolean;
  /** gambar khusus (selain gambar sektor) */
  image?: keyof typeof images.peluang;
  titleId: string;
  titleEn: string;
  summaryId: string;
  summaryEn: string;
  detailId: string;
  detailEn: string;
};

const raw: RawOpportunity[] = [
  // ============================ KECIL / UMKM ============================
  {
    slug: "budidaya-lele-bioflok",
    sector: "perikanan",
    district: "sari-mekar",
    scale: "kecil",
    valueJuta: 350,
    roi: 28,
    payback: 2.5,
    landHa: 0.2,
    jobs: 8,
    titleId: "Budidaya Lele Sistem Bioflok",
    titleEn: "Biofloc Catfish Farming",
    summaryId:
      "Usaha perikanan air tawar di lahan sempit dengan kolam bioflok yang hemat air dan panen rutin.",
    summaryEn:
      "A freshwater fisheries business on a small plot, using water-saving biofloc tanks with regular harvests.",
    detailId:
      "Lahan pekarangan seluas ±2.000 m² cukup untuk 20 kolam bundar. Permintaan lele dari warung makan dan pasar kecamatan stabil sepanjang tahun, dan kelompok pembudidaya setempat siap berbagi benih serta pengalaman.",
    detailEn:
      "Around 2,000 m² of land is enough for 20 round tanks. Demand from food stalls and the district market is steady all year, and the local fish farmers' group is ready to share fry and know-how.",
  },
  {
    slug: "tambak-udang-vaname-skala-kecil",
    sector: "perikanan",
    district: "muara-sentosa",
    scale: "kecil",
    valueJuta: 480,
    roi: 32,
    payback: 3,
    landHa: 1,
    jobs: 12,
    titleId: "Tambak Udang Vaname Skala Kecil",
    titleEn: "Small-Scale Vannamei Shrimp Pond",
    summaryId:
      "Lahan tambak perikanan seluas satu hektare di muara, siap dikelola dengan kolam berlapis plastik.",
    summaryEn:
      "One hectare of estuary land for shrimp farming, ready for lined ponds.",
    detailId:
      "Lahan berada dekat saluran air payau dengan kualitas air yang dipantau kelompok pembudidaya. Hasil panen dapat dijual ke pengepul di pelabuhan perikanan kecamatan.",
    detailEn:
      "The land sits beside a brackish-water channel whose quality is monitored by the local farmers' group. Harvests can be sold to collectors at the district fishing port.",
  },
  {
    slug: "keramba-jaring-apung-nila",
    sector: "perikanan",
    district: "teluk-lazuardi",
    scale: "kecil",
    valueJuta: 275,
    roi: 26,
    payback: 2.8,
    landHa: 0.5,
    jobs: 10,
    titleId: "Keramba Jaring Apung Ikan Nila",
    titleEn: "Floating Net Cages for Tilapia",
    summaryId:
      "Budidaya perikanan nila di perairan teluk yang tenang, dengan lahan darat kecil untuk gudang pakan.",
    summaryEn:
      "Tilapia farming in the calm waters of the bay, with a small plot on shore for feed storage.",
    detailId:
      "Perairan teluk terlindung dari gelombang besar sehingga cocok untuk 12 unit keramba. Lahan darat ±5.000 m² di tepi teluk dapat dipakai untuk gudang dan tempat sortir.",
    detailEn:
      "The bay is sheltered from heavy swell, which suits 12 cage units. About 5,000 m² of shoreline land can hold a store and a sorting area.",
  },
  {
    slug: "pengolahan-ikan-asap",
    sector: "perikanan",
    district: "muara-sentosa",
    scale: "kecil",
    valueJuta: 420,
    roi: 24,
    payback: 3.2,
    landHa: 0.1,
    jobs: 15,
    titleId: "Rumah Pengasapan Ikan Tradisional",
    titleEn: "Traditional Smoked Fish House",
    summaryId:
      "Pengolahan hasil perikanan tangkap menjadi ikan asap kemasan di lahan kecil dekat tempat pelelangan.",
    summaryEn:
      "Turning the daily catch into packaged smoked fish, on a small plot near the fish auction.",
    detailId:
      "Pasokan ikan segar tersedia setiap hari dari nelayan setempat. Rumah pengasapan dengan tungku hemat bahan bakar dan ruang kemas higienis dapat memperpanjang daya simpan produk dan membuka pasar oleh-oleh.",
    detailEn:
      "Local fishers land fresh fish every day. A smokehouse with fuel-efficient kilns and a clean packing room extends shelf life and opens up the souvenir market.",
  },
  {
    slug: "rumah-kaca-sayuran-hidroponik",
    sector: "pertanian",
    district: "lembah-cempaka",
    scale: "kecil",
    valueJuta: 650,
    roi: 25,
    payback: 3,
    landHa: 0.5,
    jobs: 12,
    titleId: "Rumah Kaca Sayuran Hidroponik",
    titleEn: "Hydroponic Vegetable Greenhouse",
    summaryId:
      "Budidaya selada dan sayuran daun di rumah kaca berudara sejuk, untuk pasokan hotel dan pasar swalayan.",
    summaryEn:
      "Lettuce and leafy greens grown in a cool-climate greenhouse for hotels and supermarkets.",
    detailId:
      "Suhu lembah yang sejuk menekan biaya pendinginan. Rumah kaca seluas ±5.000 m² dapat memanen setiap minggu, dan beberapa hotel di pusat kabupaten sudah mencari pemasok tetap.",
    detailEn:
      "The valley's cool temperatures keep cooling costs low. A greenhouse of about 5,000 m² can harvest every week, and several hotels in the regency centre are looking for a regular supplier.",
  },
  {
    slug: "rumah-sangrai-kopi-rakyat",
    sector: "pertanian",
    district: "bukit-kenanga",
    scale: "kecil",
    valueJuta: 500,
    roi: 30,
    payback: 2.6,
    landHa: 0.1,
    jobs: 9,
    titleId: "Rumah Sangrai Kopi Rakyat",
    titleEn: "Smallholder Coffee Roastery",
    summaryId:
      "Menyangrai dan mengemas kopi arabika dari kebun rakyat Bukit Kenanga untuk pasar daring dan kafe.",
    summaryEn:
      "Roasting and packing arabica from Bukit Kenanga smallholder farms for online shoppers and cafés.",
    detailId:
      "Petani setempat selama ini menjual biji mentah dengan harga rendah. Rumah sangrai kecil dengan mesin kapasitas 5 kg per proses dapat menaikkan nilai jual dan membangun merek kopi daerah.",
    detailEn:
      "Local farmers have so far sold green beans at low prices. A small roastery with a 5 kg batch roaster can raise their value and build a regional coffee brand.",
  },
  {
    slug: "homestay-wisata-pantai",
    sector: "pariwisata",
    district: "pantai-karang-biru",
    scale: "kecil",
    valueJuta: 800,
    roi: 22,
    payback: 3.8,
    landHa: 0.3,
    jobs: 10,
    titleId: "Homestay Wisata Pantai",
    titleEn: "Beachside Homestay",
    summaryId:
      "Penginapan enam kamar bergaya rumah panggung, lima menit berjalan kaki ke pantai.",
    summaryEn:
      "A six-room stilt-house homestay, a five-minute walk from the beach.",
    detailId:
      "Kunjungan wisatawan ke pantai terus naik pada akhir pekan, tetapi pilihan menginap masih sedikit. Homestay yang dikelola bersama warga dapat menawarkan paket sarapan dan pemandu lokal.",
    detailEn:
      "Weekend visitors to the beach keep growing, yet there are few places to stay. A homestay run with local residents can offer breakfast packages and local guides.",
  },
  {
    slug: "glamping-tepi-pantai",
    sector: "pariwisata",
    district: "teluk-lazuardi",
    scale: "kecil",
    valueJuta: 950,
    roi: 24,
    payback: 3.5,
    landHa: 0.8,
    jobs: 18,
    titleId: "Glamping Tepi Pantai",
    titleEn: "Beachfront Glamping",
    summaryId:
      "Sepuluh tenda glamping menghadap teluk, untuk wisatawan keluarga dan komunitas.",
    summaryEn:
      "Ten glamping tents facing the bay, aimed at families and community groups.",
    detailId:
      "Lahan berpasir dengan naungan pohon cemara laut cocok untuk tenda permanen tanpa bangunan berat. Matahari terbenam di teluk menjadi daya tarik utama untuk promosi di media sosial.",
    detailEn:
      "Sandy ground shaded by casuarina trees suits permanent tents without heavy construction. Sunsets over the bay are the main draw for social media promotion.",
  },
  {
    slug: "kedai-oleh-oleh-khas",
    sector: "perdagangan",
    district: "kota-harapan",
    scale: "kecil",
    valueJuta: 300,
    roi: 33,
    payback: 2.2,
    landHa: 0.05,
    jobs: 6,
    titleId: "Kedai Oleh-Oleh Khas Kabupaten ABC",
    titleEn: "ABC Regency Souvenir Shop",
    summaryId:
      "Toko oleh-oleh di jalur utama Kota Harapan yang menampung produk UMKM setempat.",
    summaryEn:
      "A souvenir shop on Kota Harapan's main road, stocking products from local small businesses.",
    detailId:
      "Wisatawan yang melintas menuju pantai belum punya tempat singgah untuk membeli produk lokal. Kedai dengan sistem titip jual dapat memulai dengan modal persediaan yang kecil.",
    detailEn:
      "Travellers heading to the coast have nowhere to stop and buy local products. A consignment-based shop can start with little inventory capital.",
  },
  {
    slug: "studio-kriya-anyaman-bambu",
    sector: "ekonomi-kreatif",
    district: "sari-mekar",
    scale: "kecil",
    valueJuta: 200,
    roi: 35,
    payback: 2,
    landHa: 0.05,
    jobs: 20,
    titleId: "Studio Kriya Anyaman Bambu",
    titleEn: "Bamboo Weaving Craft Studio",
    summaryId:
      "Ruang produksi bersama bagi perajin anyaman bambu, lengkap dengan area foto produk untuk penjualan daring.",
    summaryEn:
      "A shared workshop for bamboo weavers, with a product photo corner for online sales.",
    detailId:
      "Puluhan perajin di Sari Mekar masih bekerja di rumah masing-masing. Studio bersama memudahkan kendali mutu, pesanan dalam jumlah besar, dan pelatihan desain baru.",
    detailEn:
      "Dozens of weavers in Sari Mekar still work from home. A shared studio makes quality control, bulk orders and training in new designs much easier.",
  },
  {
    slug: "rumah-produksi-batik-tulis",
    sector: "ekonomi-kreatif",
    district: "kota-harapan",
    scale: "kecil",
    valueJuta: 450,
    roi: 29,
    payback: 2.7,
    landHa: 0.1,
    jobs: 25,
    titleId: "Rumah Produksi Batik Tulis",
    titleEn: "Hand-Drawn Batik Workshop",
    summaryId:
      "Bengkel batik tulis bermotif khas daerah, dengan ruang pamer dan kelas membatik untuk wisatawan.",
    summaryEn:
      "A hand-drawn batik workshop with regional motifs, a showroom and batik classes for visitors.",
    detailId:
      "Motif batik setempat mulai dikenal lewat pameran kabupaten. Rumah produksi dengan instalasi pengolahan limbah pewarna sederhana dapat melayani pesanan seragam instansi dan pasar wisata.",
    detailEn:
      "Local batik motifs are gaining recognition through regency exhibitions. A workshop with simple dye-waste treatment can take on uniform orders from offices and serve the tourist market.",
  },
  {
    slug: "plts-atap-untuk-umkm",
    sector: "energi",
    district: "padang-seroja",
    scale: "kecil",
    valueJuta: 600,
    roi: 20,
    payback: 4,
    landHa: null,
    jobs: 5,
    titleId: "Penyedia PLTS Atap untuk UMKM",
    titleEn: "Rooftop Solar for Small Businesses",
    summaryId:
      "Usaha pemasangan dan sewa panel surya atap bagi pelaku UMKM di sekitar kawasan industri.",
    summaryEn:
      "Installing and leasing rooftop solar panels to small businesses around the industrial area.",
    detailId:
      "Banyak bengkel dan usaha kecil di Padang Seroja memiliki atap luas dan tagihan listrik tinggi di siang hari. Skema sewa membuat pelaku usaha tidak perlu membeli panel di muka.",
    detailEn:
      "Many workshops and small firms in Padang Seroja have large roofs and high daytime power bills. A leasing model means owners do not have to buy the panels up front.",
  },
  {
    slug: "pengolahan-keripik-singkong",
    sector: "industri",
    district: "gunung-damar",
    scale: "kecil",
    valueJuta: 380,
    roi: 31,
    payback: 2.4,
    landHa: 0.1,
    jobs: 18,
    titleId: "Industri Rumahan Keripik Singkong",
    titleEn: "Cassava Chip Home Industry",
    summaryId:
      "Pengolahan singkong dari lereng Gunung Damar menjadi keripik aneka rasa dalam kemasan modern.",
    summaryEn:
      "Turning cassava from the slopes of Gunung Damar into flavoured chips in modern packaging.",
    detailId:
      "Singkong melimpah dan harganya jatuh saat panen raya. Unit pengolahan dengan mesin pengiris dan peniris minyak dapat menyerap hasil panen petani dan tenaga kerja ibu rumah tangga.",
    detailEn:
      "Cassava is plentiful and prices fall at peak harvest. A processing unit with a slicer and oil spinner can absorb farmers' crops and employ local homemakers.",
  },
  {
    slug: "pusat-snorkeling-dan-selam",
    sector: "pariwisata",
    district: "pantai-karang-biru",
    scale: "kecil",
    valueJuta: 250,
    roi: 34,
    payback: 2.1,
    landHa: null,
    jobs: 7,
    titleId: "Pusat Snorkeling dan Selam",
    titleEn: "Snorkelling and Dive Centre",
    summaryId:
      "Penyewaan alat dan pemandu snorkeling di terumbu karang dangkal Pantai Karang Biru.",
    summaryEn:
      "Gear hire and guided snorkelling over the shallow reefs of Pantai Karang Biru.",
    detailId:
      "Terumbu karang dekat pantai masih terjaga dan mudah dijangkau. Usaha ini dapat melibatkan pemuda setempat sebagai pemandu bersertifikat sekaligus menjaga kelestarian karang.",
    detailEn:
      "The near-shore reef is in good condition and easy to reach. The business can train local young people as certified guides and help protect the coral.",
  },
  {
    slug: "biogas-komunal-peternakan",
    sector: "energi",
    district: "gunung-damar",
    scale: "kecil",
    valueJuta: 700,
    roi: 21,
    payback: 3.9,
    landHa: 0.2,
    jobs: 6,
    status: "DRAFT",
    titleId: "Biogas Komunal dari Limbah Peternakan",
    titleEn: "Community Biogas from Livestock Waste",
    summaryId:
      "Instalasi biogas bersama untuk kelompok peternak sapi, menghasilkan gas masak dan pupuk organik.",
    summaryEn:
      "A shared biogas plant for cattle farmers, producing cooking gas and organic fertiliser.",
    detailId:
      "Kotoran ternak dari puluhan kandang belum diolah dan mencemari saluran air. Digester komunal dapat menyalurkan gas ke rumah sekitar dan menjual ampasnya sebagai pupuk.",
    detailEn:
      "Manure from dozens of cattle sheds goes untreated and pollutes local streams. A shared digester can pipe gas to nearby homes and sell the residue as fertiliser.",
  },

  // ============================== MENENGAH ==============================
  {
    slug: "pabrik-pengolahan-kopi",
    sector: "pertanian",
    district: "bukit-kenanga",
    scale: "menengah",
    valueJuta: 12_000,
    roi: 16,
    payback: 5.5,
    landHa: 3,
    jobs: 85,
    titleId: "Pabrik Pengolahan Kopi Bukit Kenanga",
    titleEn: "Bukit Kenanga Coffee Processing Plant",
    summaryId:
      "Pabrik pengolahan hasil pertanian kopi, dari buah ceri hingga biji siap ekspor.",
    summaryEn:
      "A coffee processing plant taking cherries all the way to export-ready green beans.",
    detailId:
      "Kebun kopi rakyat di lereng Bukit Kenanga terus bertambah, tetapi pengolahan pascapanen masih manual. Pabrik dengan unit pengupasan, fermentasi, dan pengeringan terkendali dapat menjamin mutu yang seragam.",
    detailEn:
      "Smallholder coffee planting on the slopes of Bukit Kenanga keeps expanding, but post-harvest work is still manual. A plant with pulping, controlled fermentation and drying can guarantee consistent quality.",
  },
  {
    slug: "pabrik-tepung-mocaf",
    sector: "pertanian",
    district: "sari-mekar",
    scale: "menengah",
    valueJuta: 6_500,
    roi: 17,
    payback: 5,
    landHa: 2,
    jobs: 60,
    titleId: "Pabrik Pengolahan Singkong menjadi Tepung Mocaf",
    titleEn: "Cassava-to-Mocaf Flour Mill",
    summaryId:
      "Pabrik pengolahan hasil pertanian singkong menjadi tepung mocaf pengganti terigu.",
    summaryEn:
      "A mill turning cassava into mocaf, a wheat-flour alternative.",
    detailId:
      "Sari Mekar dikelilingi kebun singkong rakyat. Tepung mocaf diminati industri roti dan makanan ringan, dan pabrik dapat bermitra dengan koperasi tani untuk jaminan pasokan.",
    detailEn:
      "Sari Mekar is surrounded by smallholder cassava fields. Mocaf flour is in demand from bakeries and snack makers, and the mill can partner with farmer cooperatives to secure supply.",
  },
  {
    slug: "cold-storage-hasil-perikanan",
    sector: "perikanan",
    district: "muara-sentosa",
    scale: "menengah",
    valueJuta: 9_000,
    roi: 15,
    payback: 6,
    landHa: 1.5,
    jobs: 45,
    titleId: "Gudang Pendingin Hasil Perikanan",
    titleEn: "Fisheries Cold Storage",
    summaryId:
      "Gudang beku berkapasitas besar untuk menjaga mutu tangkapan nelayan sebelum dikirim ke luar daerah.",
    summaryEn:
      "Large-capacity cold storage to keep fishers' catch fresh before it ships out of the region.",
    detailId:
      "Saat musim ikan, harga jatuh karena hasil tangkapan tidak bisa disimpan. Gudang pendingin dan pabrik es di dekat pelabuhan dapat menstabilkan harga dan membuka pasar antarpulau.",
    detailEn:
      "In peak season prices collapse because the catch cannot be stored. Cold storage and an ice plant near the port can steady prices and open inter-island markets.",
  },
  {
    slug: "pabrik-pakan-ikan",
    sector: "industri",
    district: "padang-seroja",
    scale: "menengah",
    valueJuta: 18_000,
    roi: 14,
    payback: 6.5,
    landHa: 4,
    jobs: 120,
    titleId: "Pabrik Pakan Ikan dan Udang",
    titleEn: "Fish and Shrimp Feed Mill",
    summaryId:
      "Pabrik pakan apung untuk memenuhi kebutuhan pembudidaya ikan dan udang di pesisir selatan.",
    summaryEn:
      "A floating-feed mill serving fish and shrimp farmers along the southern coast.",
    detailId:
      "Pakan menjadi biaya terbesar pembudidaya dan selama ini didatangkan dari luar daerah. Pabrik di kawasan industri Padang Seroja dekat dengan sentra budidaya sehingga ongkos kirim lebih rendah.",
    detailEn:
      "Feed is fish farmers' biggest cost and is currently brought in from outside the regency. A mill in the Padang Seroja industrial area sits close to the farming centres, cutting delivery costs.",
  },
  {
    slug: "resor-butik-lembah-cempaka",
    sector: "pariwisata",
    district: "lembah-cempaka",
    scale: "menengah",
    valueJuta: 22_000,
    roi: 13,
    payback: 7.5,
    landHa: 5,
    jobs: 90,
    titleId: "Resor Butik Lembah Cempaka",
    titleEn: "Lembah Cempaka Boutique Resort",
    summaryId:
      "Resor 30 kamar dengan pemandangan kebun dan pegunungan, untuk wisata keluarga dan rapat kecil.",
    summaryEn:
      "A 30-room resort overlooking gardens and mountains, for family breaks and small meetings.",
    detailId:
      "Lembah Cempaka berudara sejuk dan dekat dengan rencana kawasan agrowisata. Resor butik dapat menawarkan pengalaman memetik sayur, bersepeda, dan kuliner berbahan lokal.",
    detailEn:
      "Lembah Cempaka is cool and sits next to the planned agritourism area. A boutique resort can offer vegetable picking, cycling and food made from local produce.",
  },
  {
    slug: "dermaga-wisata-bahari-teluk",
    sector: "pariwisata",
    district: "teluk-lazuardi",
    scale: "menengah",
    valueJuta: 15_000,
    roi: 15,
    payback: 6,
    landHa: 3,
    jobs: 70,
    titleId: "Dermaga dan Pusat Wisata Bahari",
    titleEn: "Marine Tourism Pier and Centre",
    summaryId:
      "Dermaga kapal wisata, kios, dan pusat informasi di Teluk Lazuardi untuk tur pulau dan memancing.",
    summaryEn:
      "A tour-boat pier, kiosks and visitor centre on Teluk Lazuardi for island trips and fishing tours.",
    detailId:
      "Kapal wisata saat ini bersandar di dermaga nelayan yang padat. Dermaga khusus wisata akan memisahkan arus wisatawan dan nelayan sekaligus menjadi titik awal paket wisata pulau.",
    detailEn:
      "Tour boats currently share a crowded fishing jetty. A dedicated pier would separate visitors from fishers and become the starting point for island tour packages.",
  },
  {
    slug: "pasar-modern-kota-harapan",
    sector: "perdagangan",
    district: "kota-harapan",
    scale: "menengah",
    valueJuta: 20_000,
    roi: 13,
    payback: 7,
    landHa: 1.2,
    jobs: 150,
    titleId: "Pasar Modern Kota Harapan",
    titleEn: "Kota Harapan Modern Market",
    summaryId:
      "Pasar dua lantai dengan los basah dan kering yang tertata, area parkir, dan ruang UMKM.",
    summaryEn:
      "A two-storey market with organised wet and dry sections, parking and space for small businesses.",
    detailId:
      "Pasar lama sudah melebihi kapasitas dan sering macet. Pasar baru dengan sistem kerja sama pemanfaatan dapat menampung pedagang lama dan menambah kios untuk produk olahan lokal.",
    detailEn:
      "The old market is beyond capacity and causes regular traffic jams. A new market built under a use-partnership scheme can rehouse existing traders and add stalls for local processed goods.",
  },
  {
    slug: "pusat-distribusi-logistik",
    sector: "perdagangan",
    district: "padang-seroja",
    scale: "menengah",
    valueJuta: 14_000,
    roi: 14,
    payback: 6.5,
    landHa: 3,
    jobs: 80,
    status: "ARCHIVED",
    titleId: "Pusat Distribusi dan Logistik Regional",
    titleEn: "Regional Distribution and Logistics Hub",
    summaryId:
      "Gudang distribusi dekat simpang jalan utama untuk mempercepat pengiriman barang ke seluruh kecamatan.",
    summaryEn:
      "A distribution warehouse at the main road junction to speed up deliveries across every district.",
    detailId:
      "Pengiriman barang ke kecamatan pesisir masih bergantung pada gudang di luar kabupaten. Pusat distribusi bersama dapat dipakai pedagang besar, toko daring, dan koperasi.",
    detailEn:
      "Deliveries to the coastal districts still depend on warehouses outside the regency. A shared hub could serve wholesalers, online sellers and cooperatives.",
  },
  {
    slug: "pltmh-sungai-damar",
    sector: "energi",
    district: "gunung-damar",
    scale: "menengah",
    valueJuta: 24_000,
    roi: 12,
    payback: 8,
    landHa: 2,
    jobs: 40,
    titleId: "Pembangkit Listrik Tenaga Mikrohidro Sungai Damar",
    titleEn: "Damar River Micro-Hydro Plant",
    summaryId:
      "Pembangkit mikrohidro memanfaatkan aliran Sungai Damar untuk desa di lereng gunung.",
    summaryEn:
      "A micro-hydro plant using the flow of the Damar River to power mountain villages.",
    detailId:
      "Aliran sungai yang deras sepanjang tahun cocok untuk pembangkit mikrohidro. Listriknya dapat menopang usaha pengolahan hasil kebun di desa-desa yang jauh dari jaringan utama.",
    detailEn:
      "The river runs strongly all year, which suits a micro-hydro scheme. Its power can support crop-processing businesses in villages far from the main grid.",
  },
  {
    slug: "pabrik-pengolahan-susu",
    sector: "industri",
    district: "lembah-cempaka",
    scale: "menengah",
    valueJuta: 11_000,
    roi: 16,
    payback: 5,
    landHa: 2,
    jobs: 75,
    titleId: "Pabrik Pengolahan Susu Sapi Perah",
    titleEn: "Dairy Processing Plant",
    summaryId:
      "Pengolahan susu segar peternak Lembah Cempaka menjadi susu pasteurisasi, yoghurt, dan keju.",
    summaryEn:
      "Processing fresh milk from Lembah Cempaka dairy farmers into pasteurised milk, yoghurt and cheese.",
    detailId:
      "Peternak sapi perah setempat menjual susu segar ke pengepul tanpa pendinginan memadai. Pabrik dengan pusat penampungan susu berpendingin dapat menaikkan mutu dan harga beli.",
    detailEn:
      "Local dairy farmers sell raw milk to collectors without proper chilling. A plant with chilled collection points can lift both quality and the price farmers receive.",
  },
  {
    slug: "pusat-kreatif-kota-harapan",
    sector: "ekonomi-kreatif",
    district: "kota-harapan",
    scale: "menengah",
    valueJuta: 4_000,
    roi: 18,
    payback: 4.5,
    landHa: 0.4,
    jobs: 60,
    titleId: "Pusat Kreatif dan Ruang Kerja Bersama",
    titleEn: "Creative Hub and Co-Working Space",
    summaryId:
      "Gedung tiga lantai berisi ruang kerja bersama, studio rekaman, dan ruang pamer karya kreatif.",
    summaryEn:
      "A three-storey building with co-working space, a recording studio and a gallery for creative work.",
    detailId:
      "Komunitas desainer, fotografer, dan pengembang aplikasi di Kota Harapan belum punya tempat berkumpul. Pusat kreatif dapat mendatangkan pendapatan dari sewa ruang, kelas, dan acara.",
    detailEn:
      "Kota Harapan's designers, photographers and app developers have no shared base. A creative hub can earn from desk rental, classes and events.",
  },
  {
    slug: "kebun-buah-petik-sendiri",
    sector: "pertanian",
    district: "bukit-kenanga",
    scale: "menengah",
    valueJuta: 3_500,
    roi: 19,
    payback: 4.2,
    landHa: 6,
    jobs: 45,
    titleId: "Kebun Buah Petik Sendiri",
    titleEn: "Pick-Your-Own Fruit Orchard",
    summaryId:
      "Kebun jeruk dan jambu kristal dengan konsep petik sendiri bagi keluarga dan rombongan sekolah.",
    summaryEn:
      "An orange and guava orchard where families and school groups pick their own fruit.",
    detailId:
      "Lahan berkontur di Bukit Kenanga cocok untuk buah dataran tinggi. Pendapatan berasal dari tiket masuk, penjualan buah, dan olahan seperti jus serta selai.",
    detailEn:
      "Bukit Kenanga's rolling land suits highland fruit. Income comes from entry tickets, fruit sales and products such as juice and jam.",
  },
  {
    slug: "sentra-pengolahan-rumput-laut",
    sector: "perikanan",
    district: "pantai-karang-biru",
    scale: "menengah",
    valueJuta: 5_000,
    roi: 18,
    payback: 4.8,
    landHa: 2,
    jobs: 65,
    titleId: "Sentra Pengolahan Rumput Laut",
    titleEn: "Seaweed Processing Centre",
    summaryId:
      "Pengeringan dan pengolahan rumput laut budidaya warga pesisir menjadi bahan baku industri.",
    summaryEn:
      "Drying and processing seaweed grown by coastal families into industrial raw material.",
    detailId:
      "Pembudidaya rumput laut masih menjemur di pinggir jalan dengan mutu yang tidak seragam. Sentra pengolahan dengan para-para dan gudang kering dapat memenuhi standar pembeli industri.",
    detailEn:
      "Seaweed farmers still dry their crop along the roadside, with uneven quality. A centre with drying racks and a dry store can meet industrial buyers' standards.",
  },
  {
    slug: "penyulingan-minyak-atsiri",
    sector: "industri",
    district: "gunung-damar",
    scale: "menengah",
    valueJuta: 7_000,
    roi: 17,
    payback: 5.2,
    landHa: 3,
    jobs: 55,
    titleId: "Penyulingan Minyak Atsiri",
    titleEn: "Essential Oil Distillery",
    summaryId:
      "Penyulingan minyak serai wangi dan nilam dari kebun rakyat di lereng Gunung Damar.",
    summaryEn:
      "Distilling citronella and patchouli oil from smallholder plots on the slopes of Gunung Damar.",
    detailId:
      "Serai wangi dan nilam tumbuh baik di lereng gunung dan sudah ditanam sebagian petani. Penyulingan dengan ketel baja tahan karat menghasilkan minyak bermutu ekspor.",
    detailEn:
      "Citronella and patchouli grow well on the mountain slopes, and some farmers already plant them. A distillery with stainless-steel stills can produce export-grade oil.",
  },
  {
    slug: "pengolahan-sampah-menjadi-energi",
    sector: "energi",
    district: "sari-mekar",
    scale: "menengah",
    valueJuta: 19_000,
    roi: 12,
    payback: 7.8,
    landHa: 2.5,
    jobs: 50,
    status: "DRAFT",
    titleId: "Pengolahan Sampah menjadi Energi",
    titleEn: "Waste-to-Energy Facility",
    summaryId:
      "Fasilitas pemilahan dan pengolahan sampah organik menjadi biogas dan bahan bakar padat.",
    summaryEn:
      "A facility that sorts organic waste and turns it into biogas and solid fuel.",
    detailId:
      "Tempat pembuangan sampah di Sari Mekar hampir penuh. Fasilitas pengolahan dapat mengurangi volume sampah sekaligus menjual energinya ke kawasan industri terdekat.",
    detailEn:
      "The Sari Mekar landfill is nearly full. A processing facility can cut waste volumes and sell its energy to the nearby industrial area.",
  },

  // ================================ BESAR ================================
  {
    slug: "pengembangan-agrowisata-hortikultura",
    sector: "pertanian",
    district: "lembah-cempaka",
    scale: "besar",
    valueJuta: 250_000,
    roi: 11,
    payback: 9.5,
    landHa: 120,
    jobs: 650,
    featured: true,
    image: "agrowisata",
    titleId: "Pengembangan Agrowisata Hortikultura",
    titleEn: "Horticulture Agritourism Development",
    summaryId:
      "Kawasan kebun sayur, bunga, dan buah seluas 120 hektare yang memadukan produksi dan wisata edukasi.",
    summaryEn:
      "A 120-hectare estate of vegetables, flowers and fruit that combines production with educational tourism.",
    detailId:
      "Kawasan ini dirancang memiliki rumah kaca modern, pusat pembibitan, jalur wisata kebun, dan pusat kuliner. Petani sekitar dapat terlibat sebagai mitra plasma yang memasok hasil panen ke kawasan.",
    detailEn:
      "The estate is planned with modern greenhouses, a nursery, garden trails and a food hall. Neighbouring farmers can join as outgrowers supplying the estate.",
  },
  {
    slug: "pembangunan-resort-pantai",
    sector: "pariwisata",
    district: "pantai-karang-biru",
    scale: "besar",
    valueJuta: 120_000,
    roi: 12,
    payback: 9,
    landHa: 25,
    jobs: 400,
    featured: true,
    image: "resortPantai",
    titleId: "Pembangunan Resort Pantai",
    titleEn: "Beach Resort Development",
    summaryId:
      "Resort tepi pantai dengan vila, restoran, dan pusat wisata bahari di Pantai Karang Biru.",
    summaryEn:
      "A beachfront resort with villas, restaurants and a marine activity centre at Pantai Karang Biru.",
    detailId:
      "Pantai berpasir putih dengan terumbu karang dangkal menjadi daya tarik utama. Rencana pengembangan mempertahankan sempadan pantai untuk akses publik dan melibatkan warga dalam usaha pendukung.",
    detailEn:
      "White sand and shallow coral reefs are the main draw. The plan keeps the beach setback open for public access and involves residents in supporting businesses.",
  },
  {
    slug: "kawasan-industri-terpadu",
    sector: "industri",
    district: "padang-seroja",
    scale: "besar",
    valueJuta: 800_000,
    roi: 9,
    payback: 12,
    landHa: 500,
    jobs: 2000,
    featured: true,
    image: "kawasanIndustri",
    titleId: "Kawasan Industri Terpadu",
    titleEn: "Integrated Industrial Estate",
    summaryId:
      "Kawasan industri seluas 500 hektare dengan kaveling siap bangun, pengolahan limbah terpusat, dan akses jalan utama.",
    summaryEn:
      "A 500-hectare industrial estate with ready-to-build plots, central waste treatment and main-road access.",
    detailId:
      "Kawasan diarahkan untuk industri pengolahan hasil pertanian dan perikanan, logistik, serta manufaktur ringan. Pengelola kawasan menyediakan utilitas bersama sehingga investor dapat mulai membangun lebih cepat.",
    detailEn:
      "The estate is aimed at farm and fisheries processing, logistics and light manufacturing. The estate operator provides shared utilities so investors can start building sooner.",
  },
  {
    slug: "pembangkit-listrik-panas-bumi",
    sector: "energi",
    district: "gunung-damar",
    scale: "besar",
    valueJuta: 650_000,
    roi: 8.5,
    payback: 12,
    landHa: 40,
    jobs: 300,
    titleId: "Pembangkit Listrik Panas Bumi Gunung Damar",
    titleEn: "Gunung Damar Geothermal Power Plant",
    summaryId:
      "Pengembangan wilayah kerja panas bumi untuk pembangkit listrik beban dasar.",
    summaryEn:
      "Developing a geothermal field for baseload power generation.",
    detailId:
      "Manifestasi panas bumi seperti mata air panas dan fumarol ditemukan di lereng Gunung Damar. Pengembangan memerlukan survei rinci, pengeboran eksplorasi, dan kemitraan jangka panjang dengan pembeli listrik.",
    detailEn:
      "Hot springs and fumaroles on the slopes of Gunung Damar point to geothermal potential. Development needs detailed surveys, exploration drilling and a long-term power purchase partnership.",
  },
  {
    slug: "kawasan-industri-pengolahan-perikanan",
    sector: "perikanan",
    district: "muara-sentosa",
    scale: "besar",
    valueJuta: 180_000,
    roi: 10,
    payback: 10.5,
    landHa: 30,
    jobs: 800,
    titleId: "Kawasan Industri Pengolahan Perikanan Muara Sentosa",
    titleEn: "Muara Sentosa Fisheries Processing Estate",
    summaryId:
      "Kawasan industri perikanan terpadu: pelabuhan pendaratan, pabrik pengolahan, dan gudang beku.",
    summaryEn:
      "An integrated fisheries estate with a landing port, processing plants and cold stores.",
    detailId:
      "Muara Sentosa menjadi tempat pendaratan utama kapal nelayan pesisir selatan. Kawasan terpadu memungkinkan ikan diolah menjadi fillet, ikan kaleng, dan tepung ikan tanpa harus dikirim ke luar daerah.",
    detailEn:
      "Muara Sentosa is the main landing point for the southern coast's fishing fleet. An integrated estate lets the catch become fillets, canned fish and fishmeal without leaving the regency.",
  },
  {
    slug: "pabrik-pengolahan-hasil-pertanian-terpadu",
    sector: "industri",
    district: "sari-mekar",
    scale: "besar",
    valueJuta: 95_000,
    roi: 12.5,
    payback: 8.5,
    landHa: 20,
    jobs: 600,
    titleId: "Pabrik Pengolahan Hasil Pertanian Terpadu",
    titleEn: "Integrated Farm Produce Processing Plant",
    summaryId:
      "Pabrik pengolahan hasil pertanian berskala besar: sayur beku, buah olahan, dan pati singkong.",
    summaryEn:
      "A large plant processing farm produce into frozen vegetables, fruit products and cassava starch.",
    detailId:
      "Sari Mekar berada di tengah sentra pertanian dan dekat jalan menuju kawasan industri. Pabrik terpadu dapat menyerap hasil panen dari beberapa kecamatan sekaligus dengan kontrak pembelian bersama koperasi.",
    detailEn:
      "Sari Mekar sits at the heart of the farming belt, close to the road to the industrial estate. An integrated plant can take produce from several districts through purchase contracts with cooperatives.",
  },
  {
    slug: "pusat-belanja-dan-hotel-kota-harapan",
    sector: "perdagangan",
    district: "kota-harapan",
    scale: "besar",
    valueJuta: 150_000,
    roi: 11,
    payback: 10,
    landHa: 3,
    jobs: 500,
    titleId: "Pusat Belanja dan Hotel Kota Harapan",
    titleEn: "Kota Harapan Shopping Centre and Hotel",
    summaryId:
      "Bangunan campuran berisi pusat belanja, hotel bisnis, dan ruang pertemuan di jantung kabupaten.",
    summaryEn:
      "A mixed-use development with a shopping centre, business hotel and meeting rooms in the heart of the regency.",
    detailId:
      "Kota Harapan menjadi pusat pemerintahan dan perdagangan kabupaten, tetapi belum memiliki hotel bisnis dan ruang pertemuan berkapasitas besar. Proyek ini juga menyediakan ruang khusus produk UMKM.",
    detailEn:
      "Kota Harapan is the regency's centre of government and trade, yet it has no business hotel or large meeting venue. The project also sets aside space for local small-business products.",
  },
  {
    slug: "plts-skala-utilitas-padang-seroja",
    sector: "energi",
    district: "padang-seroja",
    scale: "besar",
    valueJuta: 210_000,
    roi: 9.5,
    payback: 11,
    landHa: 80,
    jobs: 220,
    titleId: "PLTS Skala Utilitas Padang Seroja",
    titleEn: "Padang Seroja Utility-Scale Solar Farm",
    summaryId:
      "Pembangkit listrik tenaga surya di lahan kering untuk memasok kawasan industri dan jaringan listrik.",
    summaryEn:
      "A solar farm on dry land supplying the industrial estate and the power grid.",
    detailId:
      "Lahan datar yang kurang produktif untuk pertanian dan penyinaran matahari yang tinggi membuat lokasi ini cocok untuk PLTS. Listrik bersih dapat menjadi nilai tambah bagi investor di kawasan industri.",
    detailEn:
      "Flat land that is poor for farming, combined with strong sunshine, makes this a good solar site. Clean power can be a selling point for investors in the industrial estate.",
  },
  {
    slug: "kawasan-wisata-terpadu-teluk-lazuardi",
    sector: "pariwisata",
    district: "teluk-lazuardi",
    scale: "besar",
    valueJuta: 300_000,
    roi: 10.5,
    payback: 11,
    landHa: 60,
    jobs: 900,
    titleId: "Kawasan Wisata Terpadu Teluk Lazuardi",
    titleEn: "Teluk Lazuardi Integrated Tourism Area",
    summaryId:
      "Kawasan wisata pantai terpadu dengan marina, hotel, taman rekreasi, dan kampung nelayan wisata.",
    summaryEn:
      "An integrated beach tourism area with a marina, hotels, a leisure park and a fishing-village experience.",
    detailId:
      "Teluk yang tenang dan pantai panjang memungkinkan pengembangan bertahap. Rencana kawasan menempatkan kampung nelayan sebagai bagian dari atraksi, bukan dipindahkan.",
    detailEn:
      "The calm bay and long beach allow phased development. The area plan keeps the fishing village as part of the attraction rather than moving it.",
  },
  {
    slug: "kawasan-studio-film-dan-animasi",
    sector: "ekonomi-kreatif",
    district: "kota-harapan",
    scale: "besar",
    valueJuta: 60_000,
    roi: 13,
    payback: 8,
    landHa: 5,
    jobs: 350,
    titleId: "Kawasan Studio Film dan Animasi",
    titleEn: "Film and Animation Studio Park",
    summaryId:
      "Studio produksi, ruang pascaproduksi, dan sekolah animasi untuk industri kreatif daerah.",
    summaryEn:
      "Production stages, post-production suites and an animation school for the regional creative industry.",
    detailId:
      "Lanskap pantai, lembah, dan pegunungan dalam satu kabupaten menarik bagi rumah produksi. Kawasan studio dapat melatih talenta lokal sekaligus melayani produksi dari luar daerah.",
    detailEn:
      "Beaches, valleys and mountains within one regency appeal to production companies. A studio park can train local talent while serving productions from elsewhere.",
  },
];

// ---------------------------------------------------------------------------
// Teks pelengkap (dirakit agar konsisten)
// ---------------------------------------------------------------------------

const scaleText: Record<Scale, { id: string; en: string }> = {
  kecil: {
    id: "Peluang skala kecil/UMKM yang cocok untuk investor perorangan, koperasi, atau kelompok usaha.",
    en: "A small-business opportunity suited to individual investors, cooperatives or business groups.",
  },
  menengah: {
    id: "Peluang skala menengah untuk badan usaha yang siap bermitra dengan pemasok dan tenaga kerja lokal.",
    en: "A mid-sized opportunity for companies ready to work with local suppliers and workers.",
  },
  besar: {
    id: "Peluang skala besar dengan masa pengembalian panjang; memerlukan kajian kelayakan menyeluruh dan kemitraan strategis.",
    en: "A large-scale opportunity with a long payback period; it calls for a full feasibility study and a strategic partnership.",
  },
};

const sectorRequirement: Record<SectorSlug, { id: string; en: string }> = {
  pertanian: {
    id: "Rencana kemitraan dengan kelompok tani setempat sebagai pemasok bahan baku",
    en: "A partnership plan with local farmer groups as raw-material suppliers",
  },
  perikanan: {
    id: "Rekomendasi teknis dari Dinas Kelautan dan Perikanan Kabupaten ABC",
    en: "A technical recommendation from the ABC Regency Marine Affairs and Fisheries Office",
  },
  pariwisata: {
    id: "Rencana pengelolaan pengunjung, kebersihan, dan akses publik ke kawasan",
    en: "A plan for visitor management, cleanliness and public access to the site",
  },
  industri: {
    id: "Rencana pengelolaan limbah dan emisi kegiatan industri",
    en: "A waste and emissions management plan for the industrial activity",
  },
  perdagangan: {
    id: "Kajian dampak lalu lintas dan rencana area parkir",
    en: "A traffic impact review and parking plan",
  },
  energi: {
    id: "Kajian teknis potensi sumber energi di lokasi",
    en: "A technical assessment of the energy resource on site",
  },
  "ekonomi-kreatif": {
    id: "Rencana pelibatan pelaku kreatif dan perajin lokal",
    en: "A plan to involve local creative workers and craftspeople",
  },
};

const baseRequirements: Record<Scale, { id: string; en: string }[]> = {
  kecil: [
    {
      id: "Nomor Induk Berusaha (NIB) yang diterbitkan melalui sistem OSS",
      en: "A Business Identification Number (NIB) issued through the OSS system",
    },
    {
      id: "Proposal usaha sederhana berisi rencana produksi dan pemasaran",
      en: "A simple business proposal covering production and marketing plans",
    },
  ],
  menengah: [
    {
      id: "Nomor Induk Berusaha (NIB) yang diterbitkan melalui sistem OSS",
      en: "A Business Identification Number (NIB) issued through the OSS system",
    },
    {
      id: "Konfirmasi kesesuaian lokasi dengan rencana tata ruang",
      en: "Confirmation that the site fits the spatial plan",
    },
    {
      id: "Dokumen lingkungan sesuai tingkat risiko usaha",
      en: "Environmental documents matching the business risk level",
    },
  ],
  besar: [
    {
      id: "Nomor Induk Berusaha (NIB) yang diterbitkan melalui sistem OSS",
      en: "A Business Identification Number (NIB) issued through the OSS system",
    },
    {
      id: "Persetujuan kesesuaian kegiatan pemanfaatan ruang",
      en: "Approval that the planned land use fits the spatial plan",
    },
    {
      id: "Persetujuan lingkungan berdasarkan kajian dampak lingkungan",
      en: "Environmental approval based on an environmental impact assessment",
    },
    {
      id: "Studi kelayakan teknis dan finansial",
      en: "A technical and financial feasibility study",
    },
  ],
};

// ---------------------------------------------------------------------------
// Bentuk akhir untuk seed.ts
// ---------------------------------------------------------------------------

export type OpportunitySeed = {
  slug: string;
  sector: SectorSlug;
  district: DistrictSlug;
  scale: Scale;
  titleId: string;
  titleEn: string;
  summaryId: string;
  summaryEn: string;
  descriptionId: string;
  descriptionEn: string;
  address: string;
  latitude: number;
  longitude: number;
  investmentValue: bigint;
  estRoiPercent: number;
  paybackYears: number;
  landAreaHa: number | null;
  jobsEstimate: number;
  coverImageUrl: string;
  featured: boolean;
  status: Status;
  publishedAt: Date | null;
  images: { url: string; altId: string; altEn: string }[];
  requirements: { textId: string; textEn: string }[];
};

const JUTA = BigInt(1_000_000);
const PUBLISHED_BASE = Date.UTC(2026, 6, 1); // 1 Juli 2026
const DAY = 24 * 60 * 60 * 1000;

/** Geser koordinat secara deterministik di sekitar pusat kecamatan (±0,02°). */
function offset(index: number): [number, number] {
  const angle = (index * 137.5 * Math.PI) / 180; // sudut emas, tersebar rata
  const r = 0.008 + (index % 4) * 0.004;
  return [
    Number((Math.sin(angle) * r).toFixed(6)),
    Number((Math.cos(angle) * r).toFixed(6)),
  ];
}

export const opportunities: OpportunitySeed[] = raw.map((o, i) => {
  const district = districts.find((d) => d.slug === o.district)!;
  const sector = sectors.find((s) => s.slug === o.sector)!;
  const [dLat, dLng] = offset(i);
  const status = o.status ?? "PUBLISHED";
  const sectorImage = images.sektor[o.sector];

  const gallery: { url: string; altId: string; altEn: string }[] = [];
  if (o.image) {
    gallery.push({
      url: images.peluang[o.image].src,
      altId: `Gambaran lokasi ${o.titleId}`,
      altEn: `Site view for ${o.titleEn}`,
    });
  }
  gallery.push({
    url: sectorImage.src,
    altId: `Ilustrasi sektor ${sector.nameId.toLowerCase()} untuk ${o.titleId}`,
    altEn: `${sector.nameEn} sector illustration for ${o.titleEn}`,
  });
  // Peluang unggulan dan setiap peluang ganjil mendapat gambar lanskap tambahan.
  if (o.featured || i % 2 === 1) {
    gallery.push({
      url: images.hero.src,
      altId: `Lanskap Kecamatan ${district.name}, Kabupaten ABC`,
      altEn: `Landscape of ${district.name} District, ABC Regency`,
    });
  }

  const requirements = [...baseRequirements[o.scale], sectorRequirement[o.sector]];

  return {
    slug: o.slug,
    sector: o.sector,
    district: o.district,
    scale: o.scale,
    titleId: o.titleId,
    titleEn: o.titleEn,
    summaryId: o.summaryId,
    summaryEn: o.summaryEn,
    descriptionId: [
      o.detailId,
      `**Lokasi.** Kecamatan ${district.name}, Kabupaten ABC.`,
      `**Skala.** ${scaleText[o.scale].id}`,
      "_Seluruh angka bersifat estimasi untuk simulasi, bukan nasihat keuangan._",
    ].join("\n\n"),
    descriptionEn: [
      o.detailEn,
      `**Location.** ${district.name} District, ABC Regency.`,
      `**Scale.** ${scaleText[o.scale].en}`,
      "_All figures are estimates for simulation purposes, not financial advice._",
    ].join("\n\n"),
    address: `Kecamatan ${district.name}, Kabupaten ABC`,
    latitude: Number((district.latitude + dLat).toFixed(6)),
    longitude: Number((district.longitude + dLng).toFixed(6)),
    investmentValue: BigInt(o.valueJuta) * JUTA,
    estRoiPercent: o.roi,
    paybackYears: o.payback,
    landAreaHa: o.landHa,
    jobsEstimate: o.jobs,
    coverImageUrl: gallery[0].url,
    featured: o.featured ?? false,
    status,
    publishedAt:
      status === "DRAFT" ? null : new Date(PUBLISHED_BASE + i * 2 * DAY),
    images: gallery,
    requirements: requirements.map((r) => ({ textId: r.id, textEn: r.en })),
  };
});
