"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminCard from "@/components/admin/AdminCard";
import Icon from "@/components/ui/Icon";

interface EntityCount {
  label: string;
  count: number;
  icon: string;
  href: string;
}

const entityConfigs = [
  { label: "Domains", endpoint: "/api/admin/domains", icon: "category", href: "/admin/domains" },
  { label: "Learning Paths", endpoint: "/api/admin/learning-paths", icon: "route", href: "/admin/learning-paths" },
  { label: "External Resources", endpoint: "/api/admin/external-resources", icon: "link", href: "/admin/external-resources" },
  { label: "Documents", endpoint: "/api/admin/downloadable-documents", icon: "description", href: "/admin/downloadable-documents" },
  { label: "FAQs", endpoint: "/api/admin/faqs", icon: "help", href: "/admin/faqs" },
  { label: "Timelines", endpoint: "/api/admin/internship-timelines", icon: "timeline", href: "/admin/internship-timelines" },
  { label: "Internship Stats", endpoint: "/api/admin/internship-stats", icon: "bar_chart", href: "/admin/internship-stats" },
  { label: "Partner Categories", endpoint: "/api/admin/partner-categories", icon: "label", href: "/admin/partner-categories" },
  { label: "Partner Companies", endpoint: "/api/admin/partner-companies", icon: "business", href: "/admin/partner-companies" },
  { label: "Company Reviews", endpoint: "/api/admin/company-reviews", icon: "rate_review", href: "/admin/company-reviews" },
  { label: "Program Features", endpoint: "/api/admin/program-features", icon: "star", href: "/admin/program-features" },
  { label: "Curriculum Highlights", endpoint: "/api/admin/curriculum-highlights", icon: "school", href: "/admin/curriculum-highlights" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<EntityCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const results = await Promise.all(
          entityConfigs.map(async (cfg) => {
            try {
              const res = await fetch(cfg.endpoint);
              const data = await res.json();
              return {
                label: cfg.label,
                count: Array.isArray(data) ? data.length : 0,
                icon: cfg.icon,
                href: cfg.href,
              };
            } catch {
              return { label: cfg.label, count: 0, icon: cfg.icon, href: cfg.href };
            }
          })
        );
        setCounts(results);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white font-display">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all TKJ Nesaga data from one place.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {counts.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:scale-[1.02] transition-transform">
              <AdminCard title={item.label} value={item.count} icon={item.icon} />
            </Link>
          ))}
        </div>
      )}

      {/* Quick info */}
      <div className="mt-10 bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="info" size="md" className="text-primary" />
          <h2 className="font-bold text-secondary dark:text-white font-display">Quick Guide</h2>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Icon name="arrow_right" size="sm" className="text-primary" />
            Click any card above to manage that entity
          </li>
          <li className="flex items-center gap-2">
            <Icon name="arrow_right" size="sm" className="text-primary" />
            Use the sidebar to navigate between sections
          </li>
          <li className="flex items-center gap-2">
            <Icon name="arrow_right" size="sm" className="text-primary" />
            Each page supports creating, editing, and deleting records
          </li>
        </ul>
      </div>
    </div>
  );
}
