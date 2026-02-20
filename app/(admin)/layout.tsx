"use client";

import { useState } from "react";
import { AdminSidebar, Icon } from "@/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-display">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-x-hidden lg:ml-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-primary border-b border-secondary/10 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-secondary/10 text-secondary transition-colors"
          >
            <Icon name="menu" size="md" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/nlc.ico" alt="NLC Logo" className="w-7 h-7 object-contain" />
            <span className="font-bold text-sm text-secondary">TKJ Nesaga</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}
