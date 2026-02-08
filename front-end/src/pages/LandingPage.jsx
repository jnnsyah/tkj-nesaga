import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-secondary border border-primary/20 text-xs font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            SMK Negeri 1 Gantiwarno
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-secondary dark:text-white leading-[1.1] tracking-tighter">
                            Teknik Komputer dan{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600 dark:from-primary dark:to-yellow-300">
                                Jaringan
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Di TKJ SMK Negeri 1 Gantiwarno, siswa belajar merakit komputer,
                            membangun jaringan lokal, hingga mengelola server. Kami fokus pada
                            keterampilan teknis dasar dan menengah yang dibutuhkan di dunia
                            kerja teknologi informasi saat ini.
                        </p>
                    </div>
                    <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
                        <div className="relative w-full aspect-square max-w-lg flex items-center justify-center globe-grid rounded-full">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative z-10 w-4/5 h-4/5 text-secondary dark:text-primary transition-transform hover:scale-105 duration-700">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-20"
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        r="90"
                                        stroke="currentColor"
                                        strokeDasharray="4 2"
                                        strokeWidth="0.5"
                                    ></circle>
                                    <circle
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        r="85"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    ></circle>
                                    <ellipse
                                        className="opacity-60"
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        rx="85"
                                        ry="30"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    ></ellipse>
                                    <ellipse
                                        className="opacity-40"
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        rx="85"
                                        ry="60"
                                        stroke="currentColor"
                                        strokeWidth="0.8"
                                    ></ellipse>
                                    <ellipse
                                        className="opacity-60"
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        rx="30"
                                        ry="85"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    ></ellipse>
                                    <ellipse
                                        className="opacity-40"
                                        cx="100"
                                        cy="100"
                                        fill="none"
                                        rx="60"
                                        ry="85"
                                        stroke="currentColor"
                                        strokeWidth="0.8"
                                    ></ellipse>
                                    <line
                                        className="opacity-60"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        x1="100"
                                        x2="100"
                                        y1="15"
                                        y2="185"
                                    ></line>
                                    <line
                                        className="opacity-60"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        x1="15"
                                        x2="185"
                                        y1="100"
                                        y2="100"
                                    ></line>
                                    <circle cx="100" cy="15" fill="currentColor" r="3"></circle>
                                    <circle cx="100" cy="185" fill="currentColor" r="3"></circle>
                                    <circle cx="15" cy="100" fill="currentColor" r="3"></circle>
                                    <circle cx="185" cy="100" fill="currentColor" r="3"></circle>
                                    <circle cx="145" cy="50" fill="currentColor" r="2.5"></circle>
                                    <circle cx="55" cy="150" fill="currentColor" r="2.5"></circle>
                                    <circle cx="160" cy="140" fill="currentColor" r="2"></circle>
                                    <circle cx="40" cy="60" fill="currentColor" r="2"></circle>
                                    <path
                                        className="opacity-50"
                                        d="M145 50 Q 120 75 100 100"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeDasharray="2 2"
                                        strokeWidth="0.5"
                                    ></path>
                                    <path
                                        className="opacity-50"
                                        d="M55 150 Q 80 125 100 100"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeDasharray="2 2"
                                        strokeWidth="0.5"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-secondary/5 dark:bg-slate-900/30" id="learn">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
                            <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-6">Materi Belajar
                            </h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">Siswa dibekali dengan
                                kompetensi yang relevan dengan kebutuhan industri teknologi informasi saat ini.</p>
                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-4 text-secondary dark:text-slate-200">
                                    <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
                                    <span className="font-semibold">Sesuai Kurikulum SMK</span>
                                </div>
                                <div className="flex items-center gap-4 text-secondary dark:text-slate-200">
                                    <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
                                    <span className="font-semibold">Praktik Lab Komputer</span>
                                </div>
                            </div>
                            <Link className="inline-flex items-center justify-center gap-3 bg-secondary text-primary hover:bg-secondary/90 px-8 py-4 rounded-xl font-black transition-all shadow-lg shadow-purple-900/20 group"
                                to="/learning">
                                Buka Pusat Belajar
                                <span
                                    className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                            <div
                                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all shadow-sm hover:shadow-md">
                                <div
                                    className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined font-bold">lan</span>
                                </div>
                                <h4 className="text-xl font-black text-secondary dark:text-white mb-2">Dasar Jaringan</h4>
                                <p className="text-muted-foreground">Belajar tentang Topologi, IP Address, dan
                                    pengkabelan (Crimping).</p>
                            </div>
                            <div
                                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all shadow-sm hover:shadow-md">
                                <div
                                    className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined font-bold">computer</span>
                                </div>
                                <h4 className="text-xl font-black text-secondary dark:text-white mb-2">Hardware &amp; OS</h4>
                                <p className="text-muted-foreground">Merakit PC, instalasi Windows/Linux, dan
                                    pemeliharaan perangkat.</p>
                            </div>
                            <div
                                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all shadow-sm hover:shadow-md">
                                <div
                                    className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined font-bold">dns</span>
                                </div>
                                <h4 className="text-xl font-black text-secondary dark:text-white mb-2">Administrasi Server
                                </h4>
                                <p className="text-muted-foreground">Konfigurasi Web Server, FTP, dan manajemen
                                    database pada Linux.</p>
                            </div>
                            <div
                                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all shadow-sm hover:shadow-md">
                                <div
                                    className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined font-bold">router</span>
                                </div>
                                <h4 className="text-xl font-black text-secondary dark:text-white mb-2">Mikrotik &amp; Cisco
                                </h4>
                                <p className="text-muted-foreground">Pengaturan Router, Hotspot, dan manajemen
                                    Bandwidth internet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 bg-background border-y border-border/40" id="pkl">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-4">Tempat Prakerin & Mitra Industri</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">Siswa melaksanakan
                            Praktik Kerja Industri (Prakerin) di berbagai instansi dan perusahaan yang relevan untuk pengalaman
                            kerja nyata.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {/* Stats/Categories */}
                        <div className="group p-6 rounded-2xl bg-card text-center border border-border transition-all hover:border-primary hover:shadow-xl cursor-default">
                            <span className="material-symbols-outlined text-secondary dark:text-primary text-3xl mb-3 block">wifi_tethering</span>
                            <h5 className="font-black text-xs uppercase tracking-widest text-secondary dark:text-white">ISP</h5>
                            <p className="text-[10px] text-muted-foreground mt-1">Internet Service Provider</p>
                        </div>
                        <div className="group p-6 rounded-2xl bg-card text-center border border-border transition-all hover:border-primary hover:shadow-xl cursor-default">
                            <span className="material-symbols-outlined text-secondary dark:text-primary text-3xl mb-3 block">storefront</span>
                            <h5 className="font-black text-xs uppercase tracking-widest text-secondary dark:text-white">Retail</h5>
                            <p className="text-[10px] text-muted-foreground mt-1">Toko Komputer & Aksesoris</p>
                        </div>
                        <div className="group p-6 rounded-2xl bg-card text-center border border-border transition-all hover:border-primary hover:shadow-xl cursor-default">
                            <span className="material-symbols-outlined text-secondary dark:text-primary text-3xl mb-3 block">build</span>
                            <h5 className="font-black text-xs uppercase tracking-widest text-secondary dark:text-white">Service</h5>
                            <p className="text-[10px] text-muted-foreground mt-1">Perbaikan Hardware</p>
                        </div>
                        <div className="group p-6 rounded-2xl bg-card text-center border border-border transition-all hover:border-primary hover:shadow-xl cursor-default">
                            <span className="material-symbols-outlined text-secondary dark:text-primary text-3xl mb-3 block">apartment</span>
                            <h5 className="font-black text-xs uppercase tracking-widest text-secondary dark:text-white">Instansi</h5>
                            <p className="text-[10px] text-muted-foreground mt-1">Pemerintahan & Kantor</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
                            <h3 className="text-4xl font-black text-primary mb-2">50+</h3>
                            <p className="font-bold text-secondary dark:text-white">Mitra Industri</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
                            <h3 className="text-4xl font-black text-primary mb-2">100%</h3>
                            <p className="font-bold text-secondary dark:text-white">Tersalurkan</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
                            <h3 className="text-4xl font-black text-primary mb-2">6 Bulan</h3>
                            <p className="font-bold text-secondary dark:text-white">Durasi Magang</p>
                        </div>
                    </div>

                    {/* Featured Partners */}
                    <div className="text-center">
                        <Link to="/prakerin" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Lihat Semua Tempat Prakerin
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
