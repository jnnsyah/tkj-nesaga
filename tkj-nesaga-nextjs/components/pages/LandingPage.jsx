"use client"

import FeatureCard from "@/components/cards/FeatureCard";
import CategoryCard from "@/components/cards/CategoryCard";
import StatCard from "@/components/cards/StatCard";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { programFeatures, curriculumHighlights } from "@/data/program";
import { partnerCategories, internshipStats } from "@/data/internship";

export default function LandingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-6 pb-12 lg:pt-20 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 gap-2 md:gap-8 lg:gap-12 items-center">

                    {/* TEXT CONTENT */}
                    <div className="relative z-10 space-y-3 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary/10 text-secondary border border-primary/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="truncate">SMK N 1 Gantiwarno</span>
                        </div>

                        <h1 className="text-2xl sm:text-5xl lg:text-7xl font-black text-secondary dark:text-white leading-[1.1] tracking-tighter">
                            Teknik Komputer <br className="hidden lg:block" /> & {" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600 dark:from-primary dark:to-yellow-300">
                                Jaringan
                            </span>
                        </h1>

                        <p className="text-xs sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Program keahlian yang membekali siswa dengan kompetensi di bidang jaringan komputer, sistem operasi, dan teknologi informasi untuk siap kerja, berwirausaha, maupun melanjutkan pendidikan.
                        </p>
                    </div>

                    {/* GRAPHIC COMPONENT */}
                    <HeroGraphic />
                </div>
            </section>

            {/* Learning Materials Section */}
            <section className="py-24 bg-secondary/5 dark:bg-slate-900/30" id="learn">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
                            <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-6">
                                Materi Belajar
                            </h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Siswa dibekali dengan kompetensi yang relevan dengan kebutuhan industri teknologi informasi saat ini.
                            </p>
                            <div className="space-y-4 mb-10">
                                {curriculumHighlights.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-secondary dark:text-slate-200">
                                        <Icon name="check_circle" className="text-primary font-bold" />
                                        <span className="font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="secondary"
                                to="/learning"
                                icon="arrow_forward"
                                className="shadow-lg shadow-purple-900/20 group"
                            >
                                Buka Pusat Belajar
                            </Button>
                        </div>
                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                            {programFeatures.map((feature, idx) => (
                                <FeatureCard key={idx} {...feature} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Prakerin Section */}
            <section className="py-24 bg-background border-y border-border/40" id="pkl">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-4">
                            Praktik Kerja Industri
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Siswa melaksanakan Praktik Kerja Industri (Prakerin) di berbagai instansi dan perusahaan yang relevan untuk pengalaman kerja nyata.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {partnerCategories.map((cat, idx) => (
                            <CategoryCard key={idx} {...cat} />
                        ))}
                    </div>

                    {/* <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {stats.map((stat, idx) => (
                            <StatCard key={idx} {...stat} />
                        ))}
                    </div> */}

                    <div className="text-center">
                        <Button
                            variant="secondary"
                            to="/prakerin"
                            icon="arrow_forward"
                            className="rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Lihat Semua Tempat Prakerin
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

// Hero Graphic Component
function HeroGraphic() {
    return (
        // UBAH: Hapus lg:justify-end agar fleksibel, hapus delay jika ingin langsung muncul
        <div className="relative flex justify-center items-center animate-in fade-in zoom-in duration-1000 w-full">
            <div className="relative w-full aspect-square flex items-center justify-center globe-grid rounded-full">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl lg:blur-3xl opacity-50" />

                <div className="relative z-10 w-[90%] h-[90%] text-secondary dark:text-primary transition-transform hover:scale-105 duration-700">
                    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        {/* Isi SVG tetap sama */}
                        <circle className="opacity-20" cx="100" cy="100" fill="none" r="90" stroke="currentColor" strokeDasharray="4 2" strokeWidth="0.5" />
                        <circle cx="100" cy="100" fill="none" r="85" stroke="currentColor" strokeWidth="1.5" />
                        <ellipse className="opacity-60" cx="100" cy="100" fill="none" rx="85" ry="30" stroke="currentColor" strokeWidth="1" />
                        <ellipse className="opacity-40" cx="100" cy="100" fill="none" rx="85" ry="60" stroke="currentColor" strokeWidth="0.8" />
                        <ellipse className="opacity-60" cx="100" cy="100" fill="none" rx="30" ry="85" stroke="currentColor" strokeWidth="1" />
                        <ellipse className="opacity-40" cx="100" cy="100" fill="none" rx="60" ry="85" stroke="currentColor" strokeWidth="0.8" />
                        <line className="opacity-60" stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="15" y2="185" />
                        <line className="opacity-60" stroke="currentColor" strokeWidth="1" x1="15" x2="185" y1="100" y2="100" />
                        <circle cx="100" cy="15" fill="currentColor" r="3" />
                        <circle cx="100" cy="185" fill="currentColor" r="3" />
                        <circle cx="15" cy="100" fill="currentColor" r="3" />
                        <circle cx="185" cy="100" fill="currentColor" r="3" />
                        <circle cx="145" cy="50" fill="currentColor" r="2.5" />
                        <circle cx="55" cy="150" fill="currentColor" r="2.5" />
                        <circle cx="160" cy="140" fill="currentColor" r="2" />
                        <circle cx="40" cy="60" fill="currentColor" r="2" />
                        <path className="opacity-50" d="M145 50 Q 120 75 100 100" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5" />
                        <path className="opacity-50" d="M55 150 Q 80 125 100 100" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
