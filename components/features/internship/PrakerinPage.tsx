"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CompanyCard, Icon, CompanyDetail, LoadingOverlay} from "@/components";
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
  // const selectedPlace = prakerinData.find((p) => p.id === selectedId);
  const [selectedPlace, setSelectedPlace] = useState<PartnerCompany>()
  const isMobile = useIsMobile();
  const [companies, setCompanies] = useState<PartnerCompany[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      try{
        setLoading(true)
        const response = await fetch(
          "/api/internship/companies"
        )

        if(response.ok) {
          const data = await response.json()
          setCompanies(data)
        }
      }catch (e) {
        console.error("Failed to fetch landing data", e)
      }finally{
        setLoading(false)
      }
    }

    fetchData()
  },[])


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
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const handleView = (companie: PartnerCompany)  => {
    setSelectedPlace(companie)
    setSelectedId(companie.id)
  }

  // Lock body scroll when mobile fullscreen detail is open
  useEffect(() => {
    if (isMobile && selectedId) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
  }, [isMobile, selectedId]);

  const isGridView = !selectedId;

  // MOBILE FULLSCREEN: if mobile and a place selected -> render only fullscreen detail
  if (isMobile && selectedId) {
    return (
      <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-start justify-center p-4">
        <div className="w-full h-full max-h-screen overflow-hidden">
          <CompanyDetail
            company={selectedPlace}
            onClose={() => handleClose()}
            mobileFullscreen
          />
        </div>
      </div>
    );
  }

  // DESKTOP / DEFAULT: original split layout (aside + detail)
  return (
    <div className="max-w-[1440px] mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-500">
      {/* List Sidebar */}
      <aside
        className={cn(
          "flex flex-col h-full overflow-hidden transition-all duration-500 ease-in-out",
          selectedId ? "w-full md:w-1/3" : "w-full max-w-5xl mx-auto"
        )}
      >
        {/* Search & Filters */}
        <header className="mb-6 space-y-4">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Cari perusahaan..."
              className="w-full pl-12 pr-4 py-3 bg-secondary/5 dark:bg-secondary/20 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex justify-center">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full bg-secondary/5 hover:bg-secondary/10 whitespace-nowrap text-xs font-bold transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Company List */}
        <div
          className={cn(
            "relative flex-1 overflow-y-auto pr-2 custom-scrollbar gap-4",
            isGridView && "grid md:grid-cols-2 lg:grid-cols-3 auto-rows-max"
          )}
        >
          <LoadingOverlay visible={loading} />
          {companies.map((place) => (
            <CompanyCard
              key={place.id}
              company={place}
              isSelected={selectedId === place.id}
              isGridView={isGridView}
              onClick={() => handleView(place)}
            />
          ))}
        </div>
      </aside>

      {/* Detail View (desktop) */}
      <section
        className={cn(
          "bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border mb-6 md:mb-0 transition-all duration-500 ease-in-out",
          selectedId ? "flex-1 opacity-100 translate-x-0" : "hidden opacity-0 translate-x-10 w-0"
        )}
      >
        <CompanyDetail company={selectedPlace} onClose={() => handleClose()} />
      </section>
    </div>
  );
}
