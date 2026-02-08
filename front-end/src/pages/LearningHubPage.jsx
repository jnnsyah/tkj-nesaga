import { Link } from "react-router-dom";

export default function LearningHubPage() {
    return (
        <div className="max-w-7xl mx-auto pb-20">
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-secondary dark:text-white mb-4 tracking-tight leading-tight">
                    Pusat Pembelajaran <span className="text-primary bg-secondary px-4 py-1 rounded-2xl">TKJ</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    Temukan panduan belajar, kurikulum terbaru, dan sumber daya teknis untuk mendukung perjalanan
                    Engineering Anda.
                </p>
            </section>

            <section className="mb-24">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Learning Path</h2>
                    <span className="text-sm font-semibold bg-secondary/5 dark:bg-white/10 px-4 py-2 rounded-full border border-secondary/10 dark:border-white/10">
                        Updated Syllabus 2024
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-primary/20 rounded-2xl">
                                <span className="material-symbols-outlined text-primary text-4xl">hub</span>
                            </div>
                            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                Foundation
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Basic Networking</h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Dasar-dasar OSI Model
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Pengkabelan & Topologi
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Konfigurasi SOHO Router
                            </li>
                        </ul>
                        <div className="flex items-center gap-3">
                            <Link to="/learning/path/basic-networking" className="bg-primary text-secondary px-8 py-3 rounded-2xl font-bold flex-1 hover:brightness-105 transition-all text-center">
                                Alur Belajar
                            </Link>
                            <button className="bg-secondary/5 text-secondary dark:text-white p-3 rounded-2xl hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined">menu_book</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-primary/20 rounded-2xl">
                                <span className="material-symbols-outlined text-primary text-4xl">router</span>
                            </div>
                            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                Beginner
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Cisco Networking</h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> IP Addressing & Subnetting
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> VLAN & Inter-VLAN Routing
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Static & Dynamic Routing
                            </li>
                        </ul>
                        <div className="flex items-center gap-3">
                            <Link to="/learning/path/cisco-networking" className="bg-primary text-secondary px-8 py-3 rounded-2xl font-bold flex-1 hover:brightness-105 transition-all text-center">
                                Alur Belajar
                            </Link>
                            <button className="bg-secondary/5 text-secondary dark:text-white p-3 rounded-2xl hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined">play_circle</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 3 (Debian) ... */}
                    <div className="bg-card rounded-3xl p-8 shadow-sm border border-border hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-primary/20 rounded-2xl">
                                <span className="material-symbols-outlined text-primary text-4xl">dns</span>
                            </div>
                            <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                Intermediate
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Debian Sysadmin</h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Linux CLI Fundamentals
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Web Server (Apache/Nginx)
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Database & Mail Configuration
                            </li>
                        </ul>
                        <div className="flex items-center gap-3">
                            <Link to="/learning/path/debian-sysadmin" className="bg-primary text-secondary px-8 py-3 rounded-2xl font-bold flex-1 hover:brightness-105 transition-all text-center">
                                Alur Belajar
                            </Link>
                            <button className="bg-secondary/5 text-secondary dark:text-white p-3 rounded-2xl hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined">terminal</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 px-2 text-secondary dark:text-white">Resource Library</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-card p-6 rounded-3xl border border-border hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-2xl">
                                <span className="material-symbols-outlined text-red-600 text-2xl font-bold">play_circle</span>
                            </div>
                            <a href="#" className="bg-secondary/5 p-2 rounded-full group-hover:bg-primary group-hover:text-secondary transition-all">
                                <span className="material-symbols-outlined text-lg block">arrow_forward</span>
                            </a>
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-secondary dark:text-white">Web Programming UNPAS</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Channel YouTube edukasi pemrograman terbaik di Indonesia.
                        </p>
                    </div>
                    {/* More resources... */}
                </div>
            </section>
        </div>
    );
}
