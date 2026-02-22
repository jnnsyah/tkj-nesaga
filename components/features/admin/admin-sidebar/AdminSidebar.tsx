"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: "dashboard" },
    ],
  },
  {
    title: "Homepage",
    items: [
      { label: "Statistik", href: "/admin/internship-stats", icon: "bar_chart" },
      { label: "Fitur Program", href: "/admin/program-features", icon: "star" },
      { label: "Highlight Kur.", href: "/admin/curriculum-highlights", icon: "school" }
    ],
  },
  {
    title: "Learning",
    items: [
      { label: "Learning Paths", href: "/admin/learning-paths", icon: "route" },
      { label: "Kelola Steps", href: "/admin/learning-steps", icon: "format_list_numbered" },
      { label: "Rekomendasi", href: "/admin/learning-recommendations", icon: "recommend" },
      { label: "External Resources", href: "/admin/external-resources", icon: "link" },
      { label: "Domain", href: "/admin/domains", icon: "category" },
      { label: "Level Belajar", href: "/admin/learning-levels", icon: "layers" },
      { label: "Resource Category", href: "/admin/resource-categories", icon: "folder_special" },
    ],
  },
  {
    title: "Prakerin",
    items: [
      { label: "Perusahaan Mitra", href: "/admin/partner-companies", icon: "business" },
      { label: "Ulasan Perusahaan", href: "/admin/company-reviews", icon: "rate_review" },
      { label: "Kategori Mitra", href: "/admin/partner-categories", icon: "label" },
    ],
  },
  {
    title: "Panduan Prakerin",
    items: [
      { label: "FAQ", href: "/admin/faqs", icon: "help" },
      { label: "Timeline", href: "/admin/internship-timelines", icon: "timeline" },
      { label: "Dokumen Unduhan", href: "/admin/downloadable-documents", icon: "description" },
    ],
  },
  {
    title: "Siswa",
    items: [
      { label: "Prestasi Siswa", href: "/admin/achievements", icon: "emoji_events" },
      { label: "Kategori Prestasi", href: "/admin/achievement-categories", icon: "category" },
      { label: "Level Prestasi", href: "/admin/achievement-levels", icon: "military_tech" },
    ],
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#301934] text-white flex flex-col z-40 overflow-y-auto transition-all duration-300 ease-in-out border-r border-[#4a2b50] w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "md:-translate-x-full" : "md:translate-x-0"
        )}
      >
        {/* Header / Logo */}
        <div className="flex h-20 items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-3 overflow-hidden"
            onClick={onMobileClose}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffd900] text-[#301934]">
              <span className="material-symbols-outlined text-2xl">grid_view</span>
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <h1 className="text-white text-lg font-bold leading-none">TKJ Nesaga</h1>
              <p className="text-[#ffd900]/80 text-xs font-medium mt-1">Admin Panel</p>
            </div>
          </Link>
          {/* Close button (mobile only) */}
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation Wrapper */}
        <nav className="flex flex-col gap-1 px-3 py-6 shrink-0 pb-24 sidebar-scrollbars overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onMobileClose}
                      className="group relative"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                          isActive
                            ? "bg-white/10 text-[#ffd900]"
                            : "text-white/70 hover:bg-[#4a2b50] hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "material-symbols-outlined shrink-0",
                            !isActive && "group-hover:text-[#ffd900]"
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium whitespace-nowrap truncate">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
