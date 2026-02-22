"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
    StatsCard,
    RecentActivity,
    OverviewBarChart,
    ContentDonutChart,
    AchievementChart,
} from "@/components/features/admin";
import Link from "next/link";

// Types
interface DashboardStats {
    totalPerusahaan: number;
    totalLearningPaths: number;
    totalFaq: number;
    totalDokumen: number;
    totalAchievements: number;
    totalReviews: number;
    totalResources: number;
    totalPartnerCategories: number;
    publishedPaths: number;
    draftPaths: number;
}

interface MonthlyTrend {
    month: string;
    learningPaths: number;
    achievements: number;
    resources: number;
    reviews: number;
}

interface ContentCompositionItem {
    name: string;
    value: number;
    color: string;
}

interface AchievementCategoryItem {
    category: string;
    count: number;
    color: string;
}

interface AchievementLevelItem {
    level: string;
    count: number;
    icon: string;
}

interface RecentActivityItem {
    name: string;
    module: string;
    updatedAt: string;
}

interface DashboardData {
    stats: DashboardStats;
    monthlyTrends: MonthlyTrend[];
    contentComposition: ContentCompositionItem[];
    achievementsByCategory: AchievementCategoryItem[];
    achievementsByLevel: AchievementLevelItem[];
    recentActivity: RecentActivityItem[];
}

// Period filter options
const PERIOD_OPTIONS = [
    { label: "7 Hari", value: "7d" },
    { label: "30 Hari", value: "30d" },
    { label: "3 Bulan", value: "3m" },
    { label: "6 Bulan", value: "6m" },
    { label: "1 Tahun", value: "1y" },
];

export default function AdminDashboardOverview() {
    const { data: session } = useSession();
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [period, setPeriod] = useState("6m");

    const fetchDashboardData = useCallback(async (p: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/admin/dashboard?period=${p}`);
            if (response.ok) {
                const result = await response.json();
                setData(result);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData(period);
    }, [period, fetchDashboardData]);

    const today = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (isLoading && !data) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd900]" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-8">
            {/* ============ Welcome Banner ============ */}
            <div className="relative overflow-hidden rounded-[24px] bg-[#301934] p-8 shadow-xl">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#ffd900]/10 to-transparent pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#ffd900]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <p className="mb-1 text-sm font-medium text-[#ffd900]">
                            Admin Panel v2.0
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
                            Halo, {session?.user?.name?.split(" ")[0] || "Admin"}! 👋
                        </h2>
                        <p className="text-white/70 max-w-lg font-medium leading-relaxed">
                            Selamat datang kembali. Kelola mitra, panduan belajar, dan
                            publikasi dengan mudah dari dashboard ini.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md border border-white/10 shadow-sm">
                        <span className="material-symbols-outlined text-[#ffd900]">
                            calendar_today
                        </span>
                        <span className="text-sm font-bold text-white">{today}</span>
                    </div>
                </div>
            </div>

            {/* ============ Quick Actions ============ */}
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/admin/partner-companies"
                    className="flex items-center gap-2 rounded-xl bg-[#ffd900] px-5 py-3 text-sm font-bold text-[#301934] shadow-lg shadow-[#ffd900]/20 hover:bg-[#ffd900]/90 hover:-translate-y-0.5 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        add_business
                    </span>
                    Tambah Mitra
                </Link>
                <Link
                    href="/admin/learning-paths"
                    className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#301934] hover:border-[#301934]/20 transition-all hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        add_road
                    </span>
                    Tambah Learning Path
                </Link>
                <Link
                    href="/admin/downloadable-documents"
                    className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#301934] hover:border-[#301934]/20 transition-all hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        upload_file
                    </span>
                    Tambah Dokumen
                </Link>
                <Link
                    href="/admin/achievements"
                    className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#301934] hover:border-[#301934]/20 transition-all hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        emoji_events
                    </span>
                    Tambah Prestasi
                </Link>
            </div>

            {/* ============ Stats Cards — 2 rows of 4 ============ */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    icon="business"
                    value={data.stats.totalPerusahaan}
                    label="Perusahaan Mitra"
                    color="bg-blue-50 text-blue-600"
                />
                <StatsCard
                    icon="route"
                    value={data.stats.totalLearningPaths}
                    label="Learning Paths"
                    color="bg-[#ffd900]/20 text-[#301934]"
                />
                <StatsCard
                    icon="emoji_events"
                    value={data.stats.totalAchievements}
                    label="Prestasi Siswa"
                    color="bg-amber-50 text-amber-600"
                />
                <StatsCard
                    icon="rate_review"
                    value={data.stats.totalReviews}
                    label="Review Perusahaan"
                    color="bg-pink-50 text-pink-600"
                />
                <StatsCard
                    icon="link"
                    value={data.stats.totalResources}
                    label="External Resources"
                    color="bg-cyan-50 text-cyan-600"
                />
                <StatsCard
                    icon="category"
                    value={data.stats.totalPartnerCategories}
                    label="Kategori Mitra"
                    color="bg-teal-50 text-teal-600"
                />
                <StatsCard
                    icon="help"
                    value={data.stats.totalFaq}
                    label="FAQ"
                    color="bg-purple-50 text-purple-600"
                />
                <StatsCard
                    icon="folder_open"
                    value={data.stats.totalDokumen}
                    label="Dokumen Unduhan"
                    color="bg-orange-50 text-orange-600"
                />
            </div>

            {/* ============ Content Status Row ============ */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-[24px] bg-white p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                        <span className="material-symbols-outlined text-emerald-600 text-[24px]">
                            check_circle
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-800">
                            {data.stats.publishedPaths}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Published Paths
                        </p>
                    </div>
                </div>
                <div className="rounded-[24px] bg-white p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                        <span className="material-symbols-outlined text-slate-500 text-[24px]">
                            edit_note
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-800">
                            {data.stats.draftPaths}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Draft Paths
                        </p>
                    </div>
                </div>
                <div className="rounded-[24px] bg-white p-6 shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                        <span className="material-symbols-outlined text-violet-600 text-[24px]">
                            percent
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-800">
                            {data.stats.totalLearningPaths > 0
                                ? Math.round(
                                      (data.stats.publishedPaths /
                                          data.stats.totalLearningPaths) *
                                          100
                                  )
                                : 0}
                            %
                        </p>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Publish Rate
                        </p>
                    </div>
                </div>
            </div>

            {/* ============ Time Period Filter ============ */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                        Analitik & Grafik
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        Visualisasi data konten dan aktivitas.
                    </p>
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-white border border-slate-200 p-1 shadow-sm">
                    {PERIOD_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setPeriod(option.value)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                period === option.value
                                    ? "bg-[#301934] text-white shadow-md"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ============ Charts: Bar + Donut ============ */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                {/* Bar Chart — 3/5 width */}
                <div className="lg:col-span-3 rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">
                            Trend Pembuatan Konten
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Jumlah data baru per bulan
                        </p>
                    </div>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd900]" />
                        </div>
                    ) : (
                        <OverviewBarChart data={data.monthlyTrends} />
                    )}
                </div>

                {/* Donut Chart — 2/5 width */}
                <div className="lg:col-span-2 rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">
                            Komposisi Konten
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Distribusi tipe data
                        </p>
                    </div>
                    <ContentDonutChart data={data.contentComposition} />
                </div>
            </div>

            {/* ============ Achievement Charts ============ */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* By Category */}
                <div className="rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">
                            Prestasi per Kategori
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Jumlah prestasi berdasarkan kategori
                        </p>
                    </div>
                    <AchievementChart data={data.achievementsByCategory} />
                </div>

                {/* By Level */}
                <div className="rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">
                            Prestasi per Level
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">
                            Distribusi prestasi berdasarkan tingkat
                        </p>
                    </div>
                    {data.achievementsByLevel && data.achievementsByLevel.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {data.achievementsByLevel.map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-slate-100 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all bg-gradient-to-b from-slate-50/50 to-white"
                                >
                                    <span className="text-3xl mb-2 block">
                                        {item.icon}
                                    </span>
                                    <p className="text-2xl font-black text-slate-800">
                                        {item.count}
                                    </p>
                                    <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                                        {item.level}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-48 text-slate-400">
                            <p className="text-sm">Belum ada data level.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ============ Recent Activity ============ */}
            <div className="rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                            Aktivitas Terbaru
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            10 update data terakhir dari semua modul.
                        </p>
                    </div>
                </div>
                <RecentActivity items={data.recentActivity} />
            </div>
        </div>
    );
}
