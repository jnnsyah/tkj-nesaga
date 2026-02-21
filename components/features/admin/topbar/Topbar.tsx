"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

interface TopbarProps {
    onMobileMenuClick: () => void;
    onSidebarToggle: () => void;
    isSidebarCollapsed: boolean;
}

export function Topbar({ onMobileMenuClick, onSidebarToggle, isSidebarCollapsed }: TopbarProps) {
    const { data: session } = useSession();
    const pathname = usePathname();

    // Generate breadcrumb and page title based on pathname
    const { title, breadcrumbs } = useMemo(() => {
        if (!pathname) return { title: "Overview", breadcrumbs: [] };

        const segments = pathname.split("/").filter(Boolean);
        const breadcrumbs = segments.map((segment, index) => {
            const url = `/${segments.slice(0, index + 1).join("/")}`;
            let label = segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

            // Special cases
            if (label === "Admin") label = "Home";
            if (label === "Faqs") label = "FAQs";

            return { label, url };
        });

        const title = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1].label : "Dashboard Overview";

        return { title, breadcrumbs };
    }, [pathname]);

    return (
        <>
            {/* Mobile Topbar */}
            <div className="md:hidden flex h-16 w-full shrink-0 items-center justify-between bg-[#301934] px-4 text-white z-20">
                <button onClick={onMobileMenuClick} className="flex items-center gap-2">
                    <span className="material-symbols-outlined shrink-0 text-xl">menu</span>
                    <span className="font-bold">TKJ Nesaga</span>
                </button>
                <div className="flex items-center gap-3">
                    {session?.user?.image ? (
                        <img src={session.user.image} alt="User avatar" className="h-8 w-8 rounded-full border border-white/20 object-cover" />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-[#ffd900] border border-white/20 flex items-center justify-center font-bold text-[#301934] text-xs">
                            {session?.user?.name?.charAt(0) || "U"}
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Topbar */}
            <header className="hidden md:flex h-20 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onSidebarToggle}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex items-center justify-center"
                        title={isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
                    >
                        <span className="material-symbols-outlined">
                            {isSidebarCollapsed ? "menu" : "menu_open"}
                        </span>
                    </button>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            {breadcrumbs.map((crumb, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                return (
                                    <div key={crumb.url} className="flex items-center gap-2">
                                        {isLast ? (
                                            <span className="text-slate-800">{crumb.label}</span>
                                        ) : (
                                            <>
                                                <Link href={crumb.url} className="hover:text-[#ffd900] transition-colors">
                                                    {crumb.label}
                                                </Link>
                                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/" target="_blank" className="relative text-slate-400 hover:text-[#301934] transition-colors group flex items-center justify-center tooltip-trigger" title="View Public Site">
                        <span className="material-symbols-outlined">exit_to_app</span>
                    </Link>
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <div className="group relative flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden lg:block">
                            <p className="text-sm font-bold text-slate-800">{session?.user?.name || "Admin User"}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{session?.user?.email || "admin"}</p>
                        </div>
                        {session?.user?.image ? (
                            <img
                                alt="Profile Avatar"
                                className="h-10 w-10 shrink-0 rounded-full border-2 border-slate-100 shadow-sm object-cover"
                                src={session.user.image}
                            />
                        ) : (
                            <div className="h-10 w-10 shrink-0 rounded-full border-2 border-slate-100 bg-[#ffd900] text-[#301934] flex items-center justify-center font-bold">
                                {session?.user?.name?.charAt(0) || "U"}
                            </div>
                        )}

                        {/* Dropdown Menu on Hover */}
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-2 w-48 flex flex-col items-stretch">
                                <button
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                    className="px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
