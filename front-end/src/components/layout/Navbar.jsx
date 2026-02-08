import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "text-primary font-bold" : "text-foreground/80 hover:text-primary";
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
            <div className="w-full max-w-4xl bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-full px-8 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-secondary font-bold">lan</span>
                    </div>
                    <h2 className="text-secondary dark:text-primary font-extrabold text-xl tracking-tight">TKJ Nesaga</h2>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={cn("text-sm font-semibold transition-colors", isActive("/"))}>Home</Link>
                    <Link to="/prakerin" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin"))}>Prakerin</Link>
                    {location.pathname.startsWith('/prakerin') && (
                        <Link to="/prakerin/panduan" className={cn("text-sm font-semibold transition-colors", isActive("/prakerin/panduan"))}>Panduan</Link>
                    )}
                    <Link to="/learning" className={cn("text-sm font-semibold transition-colors", isActive("/learning"))}>Belajar</Link>
                </div>
                <div className="md:hidden">
                    <span className="material-symbols-outlined text-foreground">menu</span>
                </div>
            </div>
        </nav>
    );
}
