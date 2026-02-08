import { Link, useParams } from "react-router-dom";
import "./LearningPathDetail.css";

export default function LearningPathDetail() {
    const { id } = useParams();

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <section className="mb-12 bg-card p-8 md:p-12 rounded-xl border border-border shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-secondary text-xs font-bold mb-4 uppercase tracking-wider">
                            Curated Learning Path
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary mb-4 leading-tight">
                            Detail Referensi Belajar {id ? id.replace(/-/g, ' ') : 'Network Engineering'}
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                            Selamat datang di kurasi sumber belajar eksternal pilihan. Roadmap ini adalah panduan
                            terstruktur yang mengumpulkan referensi terbaik dari berbagai platform edukasi global.
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-secondary dark:text-white">
                        <span className="material-symbols-outlined">map</span>
                        Alur Referensi Belajar
                    </h3>
                    <div className="relative ml-4 md:ml-6">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 roadmap-line opacity-30"></div>

                        {/* Step 1 */}
                        <div className="relative pl-10 pb-12">
                            <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-background z-10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                            </div>
                            <div className="bg-card rounded-xl border-2 border-primary shadow-md p-6 hover:shadow-lg transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-lg w-fit">
                                        REFERENSI TERSEDIA
                                    </span>
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-base">video_library</span> Video & Teks
                                        </span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Fundamental Jaringan & CLI Cisco</h4>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                    Mempelajari dasar-dasar perangkat keras Cisco dan pengenalan antarmuka baris perintah (CLI).
                                </p>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary/5 hover:bg-primary hover:text-secondary transition-colors text-xs font-bold rounded-full">
                                        <span className="material-symbols-outlined text-base">play_circle</span> Panduan Video
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary/5 hover:bg-primary hover:text-secondary transition-colors text-xs font-bold rounded-full">
                                        <span className="material-symbols-outlined text-base">description</span> Panduan Teks
                                    </button>
                                </div>
                                <button className="flex items-center justify-center gap-2 w-full md:w-fit px-6 py-2.5 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary/90 transition-colors">
                                    Lihat Referensi Belajar
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </button>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-10 pb-12">
                            <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-muted border-4 border-white dark:border-background z-10"></div>
                            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <span className="px-3 py-1 bg-primary/20 text-secondary dark:text-primary text-xs font-bold rounded-lg w-fit">
                                        REFERENSI TERSEDIA
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Konfigurasi VLAN & Trunking</h4>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                    Kumpulan tutorial untuk melakukan segmentasi jaringan menggunakan VLAN.
                                </p>
                                <button className="flex items-center justify-center gap-2 w-full md:w-fit px-6 py-2.5 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary/90 transition-colors">
                                    Lihat Referensi Belajar
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </button>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-10">
                            <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-muted border-4 border-white dark:border-background z-10"></div>
                            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Inter-VLAN Routing</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <h5 className="text-lg font-bold text-secondary dark:text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">help_center</span>
                            Prasyarat
                        </h5>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                <span>Konsep dasar Jaringan Komputer</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                                <span>Pengalamatan IP & Subnetting</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-secondary text-white p-6 rounded-xl shadow-md overflow-hidden relative">
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <span className="material-symbols-outlined text-8xl">link</span>
                        </div>
                        <h5 className="text-lg font-bold mb-4 relative z-10">Pusat Dokumentasi</h5>
                        <div className="space-y-3 relative z-10">
                            <a href="#" className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
                                Official Documentation
                                <span className="material-symbols-outlined text-base">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
