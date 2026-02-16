"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CompanyCard, Icon, CompanyDetail, LoadingOverlay } from "@/components";
// import { partnerCompanies } from "@/data/internship";
import { INTERNSHIP_FILTER_OPTIONS as filterCategories } from "@/data/config/internshipFilters";
import { PartnerCompany } from "./types"
// Alias for backward compatibility
// const prakerinData = partnerCompanies;

/**
 * Simple hook to detect mobile (matches Tailwind's md breakpoint ~ 768px)
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767.98px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767.98px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);

  return isMobile;
}

export default function PrakerinPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PartnerCompany>()
  // Remove simple mobile check, we'll use CSS media queries for layout but keep JS for conditional logic if needed
  // For this pattern, keeping selectedId state is enough to toggle the sheet

  const [companies, setCompanies] = useState<PartnerCompany[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "/api/internship/companies"
        )

        if (response.ok) {
          const data = await response.json()
          setCompanies(data)
        }
      } catch (e) {
        console.error("Failed to fetch landing data", e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const handleClose = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    setSelectedId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (selectedId) {
      window.addEventListener("keydown", handleKeyDown);
      // Disable body scroll when sheet is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const handleView = (companie: PartnerCompany) => {
    setSelectedPlace(companie)
    setSelectedId(companie.id)
  }

  return (
    <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-140px)] p-4 md:p-6 lg:p-8">
      {/* Search & Filters */}
      <header className="mb-8 space-y-4 max-w-4xl mx-auto">
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Cari perusahaan..."
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none px-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 whitespace-nowrap text-sm font-medium transition-colors border border-transparent hover:border-secondary/20"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Company Grid */}
      <main className="relative">
        <LoadingOverlay visible={loading} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {companies.map((place) => (
            <CompanyCard
              key={place.id}
              company={place}
              isSelected={selectedId === place.id}
              isGridView={true}
              onClick={() => handleView(place)}
            />
          ))}
        </div>
      </main>

      {/* Unified Overlay / Bottom Sheet */}
      {selectedId && selectedPlace && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
            onClick={(e) => handleClose(e)}
          />

          {/* Sheet Container */}
          <div
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none"
            style={{ height: '100%' }} // Full height container to allow centering on desktop
          >
            {/* The Sheet */}
            <div
              className={cn(
                "bg-background w-full pointer-events-auto flex flex-col shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom",
                // Mobile: Bottom sheet
                "h-[85vh] rounded-t-[2rem] absolute bottom-0",
                // Desktop: Floating modal/sheet
                "md:relative md:h-[80vh] md:max-w-2xl md:rounded-2xl md:top-1/2 md:-translate-y-1/2"
              )}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="absolute right-4 top-4 z-10 md:hidden">
                <button
                  onClick={(e) => handleClose(e)}
                  className="p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                  <Icon name="x" className="w-5 h-5 text-foreground" />
                </button>
              </div>
              {/* Close button for desktop, maybe outside or top right inside. 
                   Let's put a nice close button top-right inside for both consistency 
                   or rely on backdrop/esc. Let's add a clear close button.
               */}
              <div className="absolute right-4 top-4 z-20 hidden md:block">
                <button
                  onClick={(e) => handleClose(e)}
                  className="p-2 bg-secondary/10 hover:bg-secondary/20 rounded-full transition-colors"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              <CompanyDetail
                company={selectedPlace}
                // onClose is now handled by the wrapper buttons/backdrop, 
                // but we can pass it if CompanyDetail uses it. 
                // Our refactored CompanyDetail removed the back button in header, so it's fine.
                mobileFullscreen={true} // Reusing styling from CompanyDetail
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
