"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

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
    title: "Learning",
    items: [
      { label: "Domains", href: "/admin/domains", icon: "category" },
      { label: "Learning Paths", href: "/admin/learning-paths", icon: "route" },
      { label: "External Resources", href: "/admin/external-resources", icon: "link" },
    ],
  },
  {
    title: "Internship",
    items: [
      { label: "Timelines", href: "/admin/internship-timelines", icon: "timeline" },
      { label: "Stats", href: "/admin/internship-stats", icon: "bar_chart" },
      { label: "Partner Categories", href: "/admin/partner-categories", icon: "label" },
      { label: "Partner Companies", href: "/admin/partner-companies", icon: "business" },
      { label: "Company Reviews", href: "/admin/company-reviews", icon: "rate_review" },
    ],
  },
  {
    title: "Guidance",
    items: [
      { label: "Documents", href: "/admin/downloadable-documents", icon: "description" },
      { label: "FAQs", href: "/admin/faqs", icon: "help" },
    ],
  },
  {
    title: "Program",
    items: [
      { label: "Features", href: "/admin/program-features", icon: "star" },
      { label: "Curriculum", href: "/admin/curriculum-highlights", icon: "school" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-primary text-secondary flex flex-col shrink-0 z-40 overflow-y-auto border-r border-secondary/10">
      {/* Header */}
      <div className="p-6 border-b border-secondary/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center overflow-hidden border-2 border-secondary/10">
            <img src="/nlc.ico" alt="NLC Logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-secondary">TKJ Nesaga</h1>
            <p className="text-[10px] text-secondary/60 uppercase tracking-widest">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="text-[10px] uppercase tracking-widest text-secondary/50 font-semibold px-3 mb-2">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                        isActive
                          ? "bg-secondary text-primary font-semibold shadow-md"
                          : "text-secondary/70 hover:bg-secondary/10 hover:text-secondary"
                      )}
                    >
                      <Icon name={item.icon} size="sm" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-secondary/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-secondary/50 hover:text-secondary transition-colors"
        >
          <Icon name="arrow_back" size="sm" />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
