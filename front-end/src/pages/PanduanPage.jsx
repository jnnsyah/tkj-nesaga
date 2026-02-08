import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function PanduanPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 max-w-6xl mx-auto">
            <section className="text-center mb-24">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-secondary dark:text-primary">Panduan Sukses Prakerin TKJ</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Peta jalan, dokumen wajib, dan solusi masalah saat terjun ke industri.
                </p>
            </section>

            <section className="mb-32">
                <h2 className="text-2xl font-bold mb-16 text-center text-secondary dark:text-foreground">Alur Perjalananmu</h2>
                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute top-[40px] left-[10%] right-[10%] h-1 bg-border hidden md:block z-0"></div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        <div className="flex flex-col items-center text-center px-4 group">
                            <div className="w-20 h-20 rounded-full bg-card border-4 border-secondary flex items-center justify-center mb-6 shadow-lg z-10 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-secondary font-bold text-3xl">assignment</span>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-secondary dark:text-primary">Pra-Prakerin</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Fase persiapan meliputi pencarian mitra industri yang relevan, penyusunan CV & Portofolio yang menarik, serta pengurusan surat administrasi sekolah.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4 group">
                            <div className="w-24 h-24 rounded-full bg-primary border-4 border-secondary flex items-center justify-center mb-6 shadow-xl z-10 md:-mt-2 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-secondary font-bold text-4xl">engineering</span>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-secondary dark:text-primary">Pelaksanaan</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Menjalankan tugas harian di industri, rutin mengisi jurnal kegiatan (logbook), dan senantiasa menjaga etika profesi serta budaya kerja industri.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4 group">
                            <div className="w-20 h-20 rounded-full bg-card border-4 border-secondary flex items-center justify-center mb-6 shadow-lg z-10 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-secondary font-bold text-3xl">school</span>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-secondary dark:text-primary">Pasca-Prakerin</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Penyusunan laporan akhir secara sistematis, presentasi hasil kerja di hadapan mentor industri, dan menempuh ujian sidang prakerin di sekolah.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-32">
                <h2 className="text-2xl font-bold mb-10 text-center text-secondary dark:text-foreground">Survival Kit — Download Area</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Template Laporan", ext: ".DOCX", icon: "description" },
                        { title: "Contoh CV ATS", ext: ".DOCX", icon: "description" },
                        { title: "Catatan Kegiatan", ext: ".DOCX", icon: "description" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-card p-8 rounded-3xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-xl hover:border-primary/50 transition-all group">
                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-secondary dark:text-white">{item.title}</h3>
                            <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold">{item.ext}</p>
                            <button className="w-full bg-primary text-secondary font-bold py-3 rounded-xl hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                <span className="material-symbols-outlined text-lg">download</span>
                                Unduh
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-secondary dark:text-foreground">
                    <span className="material-symbols-outlined text-red-500">medical_services</span>
                    P3K: Pertolongan Pertama — FAQ
                </h2>
                <div className="space-y-4">
                    <div className="border border-primary/30 rounded-2xl overflow-hidden bg-card">
                        <button className="w-full p-6 text-left flex justify-between items-center bg-primary/10">
                            <span className="font-bold text-lg text-secondary dark:text-white">Saya tidak sengaja merusak alat kantor, harus bagaimana?</span>
                            <span className="material-symbols-outlined">expand_less</span>
                        </button>
                        <div className="p-6 bg-card dark:bg-secondary/10">
                            <p className="leading-relaxed text-muted-foreground">
                                Jangan panik. Segera lapor ke pembimbing lapangan di perusahaan secara jujur. Sampaikan permintaan maaf dan tanyakan prosedur penggantian atau perbaikan. Kejujuran Anda lebih dihargai daripada mencoba menyembunyikannya. Setelah itu, lapor juga ke guru pembimbing sekolah.
                            </p>
                        </div>
                    </div>
                    {[
                        "Bagaimana jika pekerjaan tidak sesuai kompetensi TKJ?",
                        "Cara izin jika mendadak sakit di tempat kerja?"
                    ].map((q, idx) => (
                        <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-card">
                            <button className="w-full p-6 text-left flex justify-between items-center hover:bg-secondary/5 transition-colors">
                                <span className="font-bold text-lg text-secondary dark:text-white">{q}</span>
                                <span className="material-symbols-outlined text-muted-foreground">expand_more</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
