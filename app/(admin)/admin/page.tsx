"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { StatsCard, RecentActivity } from "@/components/features/admin";
import Link from "next/link";

interface DashboardData {
  stats: {
    totalPerusahaan: number;
    totalLearningPaths: number;
    totalFaq: number;
    totalDokumen: number;
  };
  recentActivity: {
    name: string;
    module: string;
    updatedAt: string;
  }[];
}

export default function AdminDashboardOverview() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd900]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#301934] p-8 shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#ffd900]/10 to-transparent pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#ffd900]/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-1 text-sm font-medium text-[#ffd900]">Admin Panel v2.0</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
              Halo, {session?.user?.name?.split(" ")[0] || "Admin"}! 👋
            </h2>
            <p className="text-white/70 max-w-lg font-medium leading-relaxed">
              Selamat datang kembali. Kelola mitra, panduan belajar, dan publikasi dengan mudah dari dashboard ini.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-[#ffd900]">calendar_today</span>
            <span className="text-sm font-bold text-white">{today}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/partner-companies"
          className="flex items-center gap-2 rounded-xl bg-[#ffd900] px-5 py-3 text-sm font-bold text-[#301934] shadow-lg shadow-[#ffd900]/20 hover:bg-[#ffd900]/90 hover:-translate-y-0.5 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add_business</span>
          Tambah Mitra
        </Link>
        <Link
          href="/admin/learning-paths"
          className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#301934] hover:border-[#301934]/20 transition-all hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-[20px]">add_road</span>
          Tambah Learning Path
        </Link>
        <Link
          href="/admin/downloadable-documents"
          className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#301934] hover:border-[#301934]/20 transition-all hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-[20px]">upload_file</span>
          Tambah Dokumen
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon="business"
          value={data.stats.totalPerusahaan}
          label="Total Perusahaan Mitra"
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          icon="route"
          value={data.stats.totalLearningPaths}
          label="Total Learning Paths"
          color="bg-[#ffd900]/20 text-[#301934]"
        />
        <StatsCard
          icon="help"
          value={data.stats.totalFaq}
          label="Total FAQ"
          color="bg-purple-50 text-purple-600"
        />
        <StatsCard
          icon="folder_open"
          value={data.stats.totalDokumen}
          label="Total Dokumen Unduhan"
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Activity</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">Aktivitas update data terakhir.</p>
          </div>
        </div>
        <RecentActivity items={data.recentActivity} />
      </div>
    </div>
  );
}
