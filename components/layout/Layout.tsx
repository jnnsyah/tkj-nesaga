import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-display flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
