"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Achievement } from "./types";
import { AchievementCard } from "./AchievementCard";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";

export const AchievementSection = () => {
    const [data, setData] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/achievements");
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error("Failed to fetch achievements:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setActiveIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    // Auto-rotate
    useEffect(() => {
        if (!emblaApi || isHovered) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [emblaApi, isHovered]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (loading) return (
        <div className="h-[500px] flex items-center justify-center relative">
            <LoadingOverlay visible={true} />
        </div>
    );

    if (data.length === 0) return null;

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Prestasi Siswa
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-4">
                        Membangun Generasi Juara
                    </h2>
                </div>

                <div className="relative px-12 lg:px-20">
                    <div
                        className="overflow-hidden"
                        ref={emblaRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex -ml-4">
                            {data.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                                >
                                    <AchievementCard achievement={item} isCenter={activeIndex === index} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-border shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors z-20"
                    >
                        <Icon name="chevron_left" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-border shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-colors z-20"
                    >
                        <Icon name="chevron_right" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-12">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                activeIndex === index ? "w-8 bg-primary" : "w-2 bg-slate-200"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
