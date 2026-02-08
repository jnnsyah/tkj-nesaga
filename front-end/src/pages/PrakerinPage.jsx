import { useState } from "react";
import { cn } from "@/lib/utils";

const prakerinData = [
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
            { name: "Aditya Nugraha", role: "Angkatan 2022 • Jan - Jun 2023", initial: "AN", rating: 5, text: "Pengalaman luar biasa! Saya belajar banyak tentang troubleshooting fiber optik dan cara kerja ODP. Mentornya sangat sabar membimbing anak-anak TKJ." },
            { name: "Siti Pertiwi", role: "Angkatan 2021 • Jun - Des 2022", initial: "SP", rating: 5, text: "Lingkungan kerjanya profesional banget. Kita diajak langsung ke lapangan buat maintenance rutin." }
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

export default function PrakerinPage() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedPlace = prakerinData.find(p => p.id === selectedId);

    return (
        <div className="max-w-[1440px] mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-500">
            {/* List Sidebar */}
            <aside className={cn(
                "flex flex-col h-full overflow-hidden transition-all duration-500 ease-in-out",
                selectedId ? "w-full md:w-1/3" : "w-full max-w-5xl mx-auto"
            )}>
                <header className="mb-6 space-y-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
                        <input
                            type="text"
                            placeholder="Cari perusahaan..."
                            className="w-full pl-12 pr-4 py-3 bg-secondary/5 dark:bg-secondary/20 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {["Semua", "ISP", "Retail", "Service", "Instansi"].map(cat => (
                            <button key={cat} className="px-4 py-1.5 rounded-full bg-secondary/5 hover:bg-secondary/10 whitespace-nowrap text-xs font-bold transition-colors">
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>
                <div className={cn(
                    "flex-1 overflow-y-auto pr-2 custom-scrollbar gap-4",
                    !selectedId && "grid md:grid-cols-2 lg:grid-cols-3 auto-rows-max"
                )}>
                    {prakerinData.map(place => (
                        <div
                            key={place.id}
                            onClick={() => setSelectedId(place.id)}
                            className={cn(
                                "p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] group h-fit",
                                selectedId === place.id
                                    ? "bg-card border-l-8 border-l-primary shadow-lg border-y-border border-r-border"
                                    : "bg-card/50 border-border hover:border-primary/50",
                                !selectedId && "hover:shadow-md bg-card"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-3 py-1 bg-secondary text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    {place.category}
                                </span>
                                {place.verified && <span className="material-symbols-outlined text-primary" title="Verified">verified</span>}
                            </div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{place.name}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{place.shortDesc}</p>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Detail View */}
            <section className={cn(
                "bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border mb-6 md:mb-0 transition-all duration-500 ease-in-out",
                selectedId ? "flex-1 opacity-100 translate-x-0" : "hidden opacity-0 translate-x-10 w-0"
            )}>
                {selectedPlace ? (
                    <>
                        <div className="p-8 border-b border-border bg-gradient-to-r from-background to-secondary/5 relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="md:hidden absolute top-4 right-4 p-2 bg-secondary/10 rounded-full hover:bg-secondary/20"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-primary shadow-lg shrink-0">
                                    <span className="material-symbols-outlined text-5xl">business</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h2 className="text-3xl font-bold text-secondary dark:text-white">{selectedPlace.name}</h2>
                                        {selectedPlace.verified && <span className="material-symbols-outlined text-blue-500 fill-1">verified</span>}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <span className="material-symbols-outlined text-lg">location_on</span>
                                            <p className="text-sm">{selectedPlace.address}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-base">call</span>
                                                </div>
                                                <span className="text-sm font-semibold tracking-wide">{selectedPlace.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center shadow-sm">
                                                    <span className="material-symbols-outlined text-base">mail</span>
                                                </div>
                                                <span className="text-sm font-semibold tracking-wide">{selectedPlace.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="mb-10">
                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-secondary dark:text-primary">
                                    <span className="material-symbols-outlined">description</span>
                                    Deskripsi
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">{selectedPlace.description}</p>
                            </div>

                            {/* Mock Map */}
                            <div className="mb-10">
                                <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative border-4 border-card shadow-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-muted-foreground">map</span>
                                    <span className="ml-2 text-muted-foreground font-bold">Map Placeholder</span>
                                </div>
                            </div>

                            {/* Reviews */}
                            {selectedPlace.reviews.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-secondary dark:text-primary">
                                        <span className="material-symbols-outlined">star</span>
                                        Ulasan Kakak Kelas
                                    </h4>
                                    <div className="space-y-6">
                                        {selectedPlace.reviews.map((review, idx) => (
                                            <div key={idx} className="bg-secondary/5 p-6 rounded-2xl border border-border">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center font-bold text-lg shadow-md">
                                                            {review.initial}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-secondary dark:text-white">{review.name}</p>
                                                            <p className="text-xs text-muted-foreground">{review.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex text-primary">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={cn("material-symbols-outlined text-sm fill-1", i < review.rating ? "text-primary" : "text-muted")}>star</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4 py-1">
                                                    "{review.text}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">touch_app</span>
                        <p>Pilih tempat prakerin untuk melihat detail</p>
                    </div>
                )}
            </section>
        </div>
    );
}
