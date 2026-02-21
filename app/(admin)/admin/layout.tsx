"use client";

import { useState, useEffect } from "react";
import { AdminSidebar, Topbar, ToastProvider } from "@/components/features/admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    if (status === "loading" || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd900]"></div>
            </div>
        );
    }

    return (
        <ToastProvider>
            <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-display text-slate-900">
                <AdminSidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    isMobileOpen={mobileMenuOpen}
                    onMobileClose={() => setMobileMenuOpen(false)}
                />

                <div
                    className={cn(
                        "flex h-screen flex-1 flex-col overflow-hidden transition-all duration-300 relative",
                        sidebarCollapsed ? "md:ml-0" : "md:ml-72"
                    )}
                >
                    <Topbar
                        onMobileMenuClick={() => setMobileMenuOpen(true)}
                        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                        isSidebarCollapsed={sidebarCollapsed}
                    />

                    <main className="flex-1 overflow-y-auto p-4 md:p-8 styled-scrollbars">
                        <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
