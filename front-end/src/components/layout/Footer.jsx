import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-border/40 py-10 mt-10 bg-background-light dark:bg-background-dark">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex justify-center gap-6 mb-6">
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                </div>
                <p className="text-muted-foreground text-sm">© 2024 TKJ Nesaga. Curating the best resources for your success.</p>
            </div>
        </footer>
    );
}
