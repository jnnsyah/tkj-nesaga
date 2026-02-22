"use client"

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export interface Tab {
  name: string;
  value?: string;
  icon?: string;
}

interface LearningPathTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
  allLabel?: string;
}

/**
 * Horizontal-scrollable tab navigation component.
 * Consistent with the project design system (primary/secondary colors, rounded-2xl, etc).
 * Supports keyboard navigation, horizontal scroll on overflow, and responsive layout.
 */
export function LearningPathTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  allLabel = "Semua",
}: LearningPathTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [tabs]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  const setActiveTab = (tabValue: string) => {
    onTabChange(tabValue);
  }
  return (
    <div className={cn("relative group/tabs", className)}>
      {/* Left fade + scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll tabs left"
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center
            bg-gradient-to-r from-background via-background/80 to-transparent
            text-secondary dark:text-white transition-opacity opacity-0 group-hover/tabs:opacity-100"
        >
          <Icon name="chevron_left" size="lg" />
        </button>
      )}

      {/* Scrollable tabs container */}
      <div
        ref={scrollRef}
        role="tablist"
        className="flex items-center gap-1 overflow-x-auto pb-1 scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          key={"all"}
          role="tab"
          onClick={() => onTabChange("all")}
          className={cn(
            "relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-lg text-sm font-medium",
            "transition-all duration-150 ease-out select-none shrink-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            activeTab === "all"
              ? "bg-primary/15 text-secondary dark:text-white font-semibold"
              : "text-secondary/50 dark:text-white/40 hover:text-secondary dark:hover:text-white hover:bg-secondary/5 dark:hover:bg-white/5"
          )}
        >
          <Icon
            name="apps"
            size="sm"
            className={cn(
              "transition-colors",
              activeTab === "all"
                ? "text-primary"
                : "text-secondary/30 dark:text-white/30"
            )}
          />
          {allLabel}
        </button>

        {tabs.map((tab) => {
          const isActive = activeTab === (tab.value || tab.name);
          return (
            <button
              key={tab.value || tab.name}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.value || tab.name)}
              className={cn(
                "relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-lg text-sm font-medium",
                "transition-all duration-150 ease-out select-none shrink-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isActive
                  ? "bg-primary/15 text-secondary dark:text-white font-semibold"
                  : "text-secondary/50 dark:text-white/40 hover:text-secondary dark:hover:text-white hover:bg-secondary/5 dark:hover:bg-white/5"
              )}
            >
              {tab.icon && (
                <Icon
                  name={tab.icon}
                  size="sm"
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-secondary/30 dark:text-white/30"
                  )}
                />
              )}
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Right fade + scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll tabs right"
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center
            bg-gradient-to-l from-background via-background/80 to-transparent
            text-secondary dark:text-white transition-opacity opacity-0 group-hover/tabs:opacity-100"
        >
          <Icon name="chevron_right" size="lg" />
        </button>
      )}
    </div>
  );
}
