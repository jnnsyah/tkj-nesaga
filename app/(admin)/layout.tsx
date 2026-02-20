"use client";

import { useState, useEffect } from "react";
import { AdminSidebar, Icon } from "@/components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Jangan render apapun selama ngecek session
  if (status === "loading" || !session) return null;

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

          {/* User info + logout (mobile) */}
          <div className="ml-auto flex items-center gap-2">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-7 h-7 rounded-full"
              />
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 rounded-xl hover:bg-secondary/10 text-secondary transition-colors"
              title="Logout"
            >
              <Icon name="log-out" size="md" />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}