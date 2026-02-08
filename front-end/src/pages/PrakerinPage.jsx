import { useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import CompanyCard from "@/components/prakerin/CompanyCard";
import CompanyDetail from "@/components/prakerin/CompanyDetail";
import { prakerinData, filterCategories } from "@/data/prakerinData";

export default function PrakerinPage() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedPlace = prakerinData.find(p => p.id === selectedId);

    const handleClose = (e) => {
        if (e) e.stopPropagation();
        setSelectedId(null);
    };

    const isGridView = !selectedId;

    return (
        <div className="max-w-[1440px] mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-500">
            {/* List Sidebar */}
            <aside className={cn(
                "flex flex-col h-full overflow-hidden transition-all duration-500 ease-in-out",
                selectedId ? "w-full md:w-1/3" : "w-full max-w-5xl mx-auto"
            )}>
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
                            {filterCategories.map(cat => (
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
                <div className={cn(
                    "flex-1 overflow-y-auto pr-2 custom-scrollbar gap-4",
                    isGridView && "grid md:grid-cols-2 lg:grid-cols-3 auto-rows-max"
                )}>
                    {prakerinData.map(place => (
                        <CompanyCard
                            key={place.id}
                            company={place}
                            isSelected={selectedId === place.id}
                            isGridView={isGridView}
                            onClick={() => setSelectedId(place.id)}
                        />
                    ))}
                </div>
            </aside>

            {/* Detail View */}
            <section className={cn(
                "bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border mb-6 md:mb-0 transition-all duration-500 ease-in-out",
                selectedId
                    ? "flex-1 opacity-100 translate-x-0"
                    : "hidden opacity-0 translate-x-10 w-0"
            )}>
                <CompanyDetail
                    company={selectedPlace}
                    onClose={handleClose}
                />
            </section>
        </div>
    );
}
