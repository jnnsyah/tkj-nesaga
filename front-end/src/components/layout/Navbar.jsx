import { useState } from "react"; // 1. Import useState
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const location = useLocation();
    // 2. State untuk mengatur buka/tutup menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? "text-primary font-bold" : "text-foreground/80 hover:text-primary";
    };

    // Fungsi helper untuk menutup menu saat link diklik
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-300">
            {/* Main Navbar Container */}
            <div className="w-full max-w-4xl bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-full px-8 py-3 flex items-center justify-between relative z-50">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-secondary font-bold">lan</span>
                    </div>
                    <h2 className="text-secondary dark:text-primary font-extrabold text-xl tracking-tight">TKJ Nesaga</h2>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={cn("text-sm font-semibold transition-colors", isActive("/"))}>Home</Link>
                    <Link to="/learning" className={cn("text-sm font-semibold transition-colors", isActive("/learning"))}>Belajar</Link>
                    <Link to="/prakerin" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin"))}>Prakerin</Link>
                    {location.pathname.startsWith('/prakerin') && (
                        <Link to="/prakerin/panduan" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin/panduan"))}>Panduan</Link>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
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

            {/* Mobile Menu Dropdown (Component Logic) */}
            <div className={cn(
                "absolute top-full mt-2 w-full max-w-4xl bg-white/90 dark:bg-background-dark/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 origin-top md:hidden",
                isMobileMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            )}>
                <div className="flex flex-col p-4 gap-2">
                    <Link to="/" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/"))}>
                        Home
                    </Link>
                    <Link to="/learning" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/learning"))}>
                        Belajar
                    </Link>
                    <Link to="/prakerin" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/prakerin"))}>
                        Prakerin
                    </Link>
                    {location.pathname.startsWith('/prakerin') && (
                        <Link to="/prakerin/panduan" onClick={closeMenu} className={cn("p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-semibold", isActive("/prakerin/panduan"))}>
                            Panduan
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}