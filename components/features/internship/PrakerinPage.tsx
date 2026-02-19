// Schema migration: categories filter now goes through junction table (c.category.title)
"use client"

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { CompanyCard, Icon, CompanyDetail, LoadingOverlay } from "@/components";
import { INTERNSHIP_FILTER_OPTIONS as filterCategories } from "@/data/config/internshipFilters";
import { PartnerCompany } from "./types"

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
  // Selection state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PartnerCompany>()

  // Data state
  const [companies, setCompanies] = useState<PartnerCompany[]>([])
  const [loading, setLoading] = useState(false)

  // Filter & Search state
  const [activeFilter, setActiveFilter] = useState<string>("Semua")
  const [searchQuery, setSearchQuery] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3 columns x 3 rows

  // Drag state for swipe to dismiss
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)

  // Fetch companies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/internship/companies")

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

  // Filter logic: combine category filter + search
  const filteredCompanies = useMemo(() => {
    let filtered = companies

    // Apply category filter
    if (activeFilter !== "Semua") {
      filtered = filtered.filter(company =>
        company.categories.some(c =>
          c.category?.title.toLowerCase().includes(activeFilter.toLowerCase())
        )
      )
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [companies, activeFilter, searchQuery])

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, searchQuery])

  // Pagination calculation
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = useMemo(() =>
    filteredCompanies.slice(startIndex, endIndex),
    [filteredCompanies, startIndex, endIndex]
  )

  // Modal/Sheet handlers
  const handleClose = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    setSelectedId(null);
    setDragY(0);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (selectedId) {
      window.addEventListener("keydown", handleKeyDown);
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

  const handleResetFilters = () => {
    setActiveFilter("Semua")
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Touch handlers for swipe to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentY = e.touches[0].clientY
    const diff = currentY - startY

    // Only allow dragging down (positive diff)
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    // If dragged more than 150px, close modal
    if (dragY > 150) {
      handleClose()
    } else {
      // Reset position with animation
      setDragY(0)
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto min-h-[calc(100vh-140px)] p-4 md:p-6 lg:p-8">
      {/* Search & Filters */}
      <header className="mb-8 space-y-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Cari perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary/20 rounded-full transition-colors"
            >
              <Icon name="x" className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex justify-center">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none px-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all border",
                  activeFilter === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/10 hover:bg-secondary/20 border-transparent hover:border-secondary/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Indicator */}
        {(activeFilter !== "Semua" || searchQuery) && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Filter aktif:</span>
            {activeFilter !== "Semua" && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {activeFilter}
              </span>
            )}
            {searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                "{searchQuery}"
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="ml-2 px-3 py-1 hover:bg-secondary/20 rounded-full transition-colors text-xs font-medium"
            >
              Reset
            </button>
          </div>
        )}

        {/* Result Counter */}
        {!loading && filteredCompanies.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} dari {filteredCompanies.length} perusahaan
          </p>
        )}
      </header>

      {/* Company Grid */}
      <main className="relative">
        <LoadingOverlay visible={loading} />

        {!loading && paginatedCompanies.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <Icon name="search_off" className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Tidak ada hasil</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Tidak ada perusahaan yang sesuai dengan filter atau pencarian Anda.
              Coba ubah kata kunci atau filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedCompanies.map((place) => (
              <CompanyCard
                key={place.id}
                company={place}
                isSelected={selectedId === place.id}
                isGridView={true}
                onClick={() => handleView(place)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Pagination */}
      {!loading && filteredCompanies.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentPage === 1
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:bg-secondary/20"
            )}
          >
            <Icon name="chevron_left" className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage) {
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 py-1 text-muted-foreground">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "min-w-[2.5rem] h-10 px-3 rounded-lg font-medium transition-all",
                    currentPage === page
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-secondary/20"
                  )}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentPage === totalPages
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:bg-secondary/20"
            )}
          >
            <Icon name="chevron_right" className="w-5 h-5" />
          </button>
        </div>
      )}

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
            style={{ height: '100%' }}
          >
            {/* The Sheet */}
            <div
              className={cn(
                "bg-background w-full pointer-events-auto flex flex-col shadow-2xl transition-all",
                // Mobile: Bottom sheet
                "h-[85vh] rounded-t-[2rem] absolute bottom-0",
                // Desktop: Floating modal/sheet
                "md:relative md:h-[80vh] md:max-w-2xl md:rounded-2xl md:top-1/2 md:-translate-y-1/2",
                !isDragging && "duration-300"
              )}
              style={{
                transform: `translateY(${dragY}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close button mobile */}
              <div className="absolute right-4 top-4 z-50 md:hidden">
                <button
                  onClick={(e) => handleClose(e)}
                  className="px-4 py-2 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full transition-colors shadow-sm border border-border text-sm font-medium"
                >
                  Tutup
                </button>
              </div>

              {/* Close button desktop */}
              <div className="absolute right-4 top-4 z-50 hidden md:block">
                <button
                  onClick={(e) => handleClose(e)}
                  className="px-4 py-2 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full transition-colors shadow-sm border border-border text-sm font-medium"
                >
                  Tutup
                </button>
              </div>

              <CompanyDetail
                company={selectedPlace}
                mobileFullscreen={true}
                isDragging={isDragging}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
