export const prakerinData = [
    {
        id: 1,
        name: "PT Telkom Akses",
        category: "ISP",
        verified: true,
        address: "Jl. Merdeka No. 10, Kecamatan Sumur Bandung, Kota Bandung, Jawa Barat 40117",
        phone: "+62 22 123 4567",
        email: "hrd@telkomakses.co.id",
        shortDesc: "Jl. Merdeka No. 10, Pusat Kota Bandung. Menyediakan layanan pemasangan fiber optik...",
        description: "PT Telkom Akses adalah anak perusahaan PT Telkom Indonesia yang bergerak di bidang konstruksi pembangunan dan manage service infrastruktur jaringan.",
        reviews: [
            {
                name: "Aditya Nugraha",
                role: "Angkatan 2022 • Jan - Jun 2023",
                initial: "AN",
                rating: 5,
                text: "Pengalaman luar biasa! Saya belajar banyak tentang troubleshooting fiber optik dan cara kerja ODP. Mentornya sangat sabar membimbing anak-anak TKJ."
            },
            {
                name: "Siti Pertiwi",
                role: "Angkatan 2021 • Jun - Des 2022",
                initial: "SP",
                rating: 5,
                text: "Lingkungan kerjanya profesional banget. Kita diajak langsung ke lapangan buat maintenance rutin."
            }
        ]
    },
    {
        id: 2,
        name: "Global Tech Solutions",
        category: "Service",
        verified: false,
        address: "Kec. Nesaga, Area Industri.",
        phone: "+62 21 555 1234",
        email: "contact@globaltech.id",
        shortDesc: "Kec. Nesaga, Area Industri. Fokus pada perbaikan hardware dan perakitan server...",
        description: "Global Tech Solutions melayani perbaikan perangkat keras komputer, laptop, dan server dengan standar industri.",
        reviews: []
    },
    {
        id: 3,
        name: "Dinas Kominfo Jabar",
        category: "Instansi",
        verified: false,
        address: "Bandung, Jawa Barat",
        phone: "(022) 123456",
        email: "info@jabarprov.go.id",
        shortDesc: "Kompleks Perkantoran Pemerintah. Pengelolaan jaringan pemerintahan dan data center...",
        description: "Instansi pemerintah yang mengelola teknologi informasi dan komunikasi di Jawa Barat.",
        reviews: []
    },
    {
        id: 4,
        name: "Indo Retail Digital",
        category: "Retail",
        verified: false,
        address: "Jakarta Selatan",
        phone: "(021) 987654",
        email: "retail@indo.id",
        shortDesc: "Pusat Perbelanjaan Lantai 2. IT Support untuk sistem kasir dan inventaris...",
        description: "Perusahaan retail yang membutuhkan support IT untuk maintenance POS dan jaringan toko.",
        reviews: []
    }
];

export const filterCategories = ["Semua", "ISP", "Retail", "Service", "Instansi"];
