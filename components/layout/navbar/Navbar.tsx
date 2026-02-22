"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { Icon } from "@/components/ui/icon";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-bold" : "text-foreground/80 hover:text-primary";
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMobileMenuOpen || isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileOpen]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <nav className="fixed top-6 left-0 right-0 z-[60] flex flex-col items-center px-4 transition-all duration-300">
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Main Container - Add ref here */}
      <div ref={navRef} className="w-full max-w-4xl relative">
        {/* Main Navbar Container */}
        <div className="w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-full px-8 py-3 flex items-center justify-between relative z-[60]">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-secondary font-bold">lan</span>
            </div>
            <h2 className="text-secondary dark:text-primary font-extrabold text-xl tracking-tight">TKJ Nesaga</h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={cn("text-sm font-semibold transition-colors", isActive("/"))}>Home</Link>
            <Link href="/learning" className={cn("text-sm font-semibold transition-colors", isActive("/learning"))}>Belajar</Link>
            <Link href="/prakerin" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin"))}>Prakerin</Link>
            {pathname.startsWith('/prakerin') && (
              <Link href="/prakerin/guide" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin/guide"))}>Panduan</Link>
            )}

            {/* Desktop Auth Profile */}
            {session?.user && (
              <div className="relative border-l border-border/50 pl-6 ml-2">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <img
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? "Avatar"}
                    className="w-8 h-8 rounded-full border border-border group-hover:ring-2 ring-primary/50 transition-all"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-background-dark border border-border shadow-xl rounded-2xl overflow-hidden py-2 origin-top animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-bold text-foreground truncate">{session.user.name}</p>
                      <p className="text-xs text-foreground/60 truncate">{session.user.email}</p>
                    </div>
                    <div className="flex flex-col p-2 space-y-1">
                      <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                        <Icon name="dashboard" size="sm" />
                        Dashboard Admin
                      </Link>
                      <button
                        onClick={() => { closeMenu(); signOut({ callbackUrl: "/login" }); }}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                      >
                        <Icon name="logout" size="sm" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu toggle Button */}
          <button
            className="md:hidden p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-foreground">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={cn(
          "absolute top-full mt-2 w-full bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 origin-top md:hidden",
          isMobileMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}>
          <div className="flex flex-col p-4 gap-2">
            <Link href="/" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/"))}>
              Home
            </Link>
            <Link href="/learning" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/learning"))}>
              Belajar
            </Link>
            <Link href="/prakerin" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/prakerin"))}>
              Prakerin
            </Link>
            {pathname.startsWith('/prakerin') && (
              <Link href="/prakerin/guide" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/prakerin/guide"))}>
                Panduan
              </Link>
            )}

            {/* Mobile Auth Snippet */}
            {session?.user && (
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-primary/5">
                  <img
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? "Avatar"}
                    className="w-10 h-10 rounded-full border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{session.user.name}</p>
                    <p className="text-xs text-foreground/60 truncate">{session.user.email}</p>
                  </div>
                </div>

                <Link href="/admin" onClick={closeMenu} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold text-foreground">
                  <Icon name="dashboard" size="sm" />
                  Dashboard Admin
                </Link>
                <button
                  onClick={() => { closeMenu(); signOut({ callbackUrl: "/login" }); }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-semibold text-red-600 dark:text-red-400 w-full text-left mt-1"
                >
                  <Icon name="logout" size="sm" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
