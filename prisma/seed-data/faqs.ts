// FAQ umum. Tabel tanpa kolom unik: seed menghapus lalu membuat ulang seluruh baris.

export type FaqSeed = {
  sortOrder: number;
  questionId: string;
  questionEn: string;
  answerId: string;
  answerEn: string;
};

export const faqs: FaqSeed[] = [
  {
    sortOrder: 1,
    questionId: "Apakah saya harus membuat akun untuk mengajukan inquiry?",
    questionEn: "Do I need an account to send an inquiry?",
    answerId:
      "Tidak. Inquiry dapat dikirim tanpa akun. Anda akan menerima kode tracking melalui email untuk memantau tindak lanjut. Akun hanya diperlukan bila Anda ingin menyimpan peluang dan melihat riwayat inquiry di satu tempat.",
    answerEn:
      "No. You can send an inquiry without an account and will receive a tracking code by email. An account is only needed if you want to save opportunities and see your inquiry history in one place.",
  },
  {
    sortOrder: 2,
    questionId: "Bagaimana cara melacak inquiry saya?",
    questionEn: "How do I track my inquiry?",
    answerId:
      "Buka halaman Lacak Inquiry, lalu masukkan kode tracking dan email yang Anda gunakan saat mengirim inquiry. Keduanya harus cocok agar data dapat ditampilkan.",
    answerEn:
      "Go to the Track Inquiry page and enter your tracking code together with the email you used. Both must match before any details are shown.",
  },
  {
    sortOrder: 3,
    questionId: "Apakah angka nilai investasi dan ROI di situs ini pasti?",
    questionEn: "Are the investment values and ROI figures guaranteed?",
    answerId:
      "Tidak. Angka yang ditampilkan adalah estimasi awal untuk memberi gambaran skala peluang. Lakukan kajian kelayakan sendiri dan konsultasikan dengan dinas terkait sebelum mengambil keputusan.",
    answerEn:
      "No. The figures are early estimates meant to show the scale of each opportunity. Carry out your own feasibility study and talk to the relevant office before making a decision.",
  },
  {
    sortOrder: 4,
    questionId: "Apakah INVESTYUK memberi saran investasi?",
    questionEn: "Does INVESTYUK give investment advice?",
    answerId:
      "Tidak. INVESTYUK adalah sumber informasi. Fitur pencarian cerdas dan rekomendasi hanya membantu menemukan peluang yang relevan berdasarkan data, bukan nasihat keuangan.",
    answerEn:
      "No. INVESTYUK is an information service. Smart search and recommendations only help you find relevant opportunities from the data; they are not financial advice.",
  },
  {
    sortOrder: 5,
    questionId: "Siapa yang akan menanggapi inquiry saya?",
    questionEn: "Who will respond to my inquiry?",
    answerId:
      "Inquiry diteruskan ke dinas yang membina sektor peluang tersebut. Pertanyaan umum ditangani oleh DPMPTSP Kabupaten ABC.",
    answerEn:
      "Your inquiry goes to the office responsible for that opportunity's sector. General questions are handled by the ABC Regency Investment and One-Stop Services Office.",
  },
  {
    sortOrder: 6,
    questionId: "Berapa lama inquiry biasanya ditanggapi?",
    questionEn: "How long does a response usually take?",
    answerId:
      "Dinas berupaya menanggapi secepatnya pada hari kerja. Anda dapat melihat perubahan status inquiry kapan saja melalui halaman Lacak Inquiry.",
    answerEn:
      "Offices aim to respond as soon as possible on working days. You can check your inquiry's status at any time on the Track Inquiry page.",
  },
  {
    sortOrder: 7,
    questionId: "Data pribadi apa yang dikumpulkan saat saya mengirim inquiry?",
    questionEn: "What personal data is collected when I send an inquiry?",
    answerId:
      "Hanya nama, email, dan pesan yang wajib diisi; nomor telepon dan nama organisasi bersifat opsional. Data dipakai untuk menindaklanjuti inquiry Anda sesuai Kebijakan Privasi.",
    answerEn:
      "Only your name, email and message are required; phone number and organisation are optional. The data is used to follow up your inquiry as described in the Privacy Policy.",
  },
  {
    sortOrder: 8,
    questionId: "Bisakah saya meminta data saya dihapus?",
    questionEn: "Can I ask for my data to be deleted?",
    answerId:
      "Bisa. Ajukan permintaan penghapusan melalui halaman Kebijakan Privasi. Setelah diproses, data pribadi pada inquiry Anda akan dianonimkan.",
    answerEn:
      "Yes. Submit a deletion request from the Privacy Policy page. Once it is processed, the personal details in your inquiries will be anonymised.",
  },
  {
    sortOrder: 9,
    questionId: "Apakah investor perorangan atau UMKM bisa berinvestasi?",
    questionEn: "Can individuals and small businesses invest?",
    answerId:
      "Bisa. Banyak peluang berskala kecil yang cocok untuk perorangan, koperasi, atau kelompok usaha. Gunakan filter kisaran nilai untuk menemukannya.",
    answerEn:
      "Yes. Many small-scale opportunities suit individuals, cooperatives or business groups. Use the investment range filter to find them.",
  },
  {
    sortOrder: 10,
    questionId: "Apakah situs ini tersedia dalam bahasa Inggris?",
    questionEn: "Is this site available in English?",
    answerId:
      "Ya. Gunakan pilihan bahasa ID | EN di bagian atas halaman untuk beralih bahasa.",
    answerEn:
      "Yes. Use the ID | EN switch at the top of the page to change language.",
  },
];
