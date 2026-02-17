"use client"

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

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
}

/**
 * Horizontal-scrollable tab navigation component.
 * Consistent with the project design system (primary/secondary colors, rounded-2xl, etc).
 * Supports keyboard navigation, horizontal scroll on overflow, and responsive layout.
 */
export default function LearningPathTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
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
        className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 scroll-smooth
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          key={"all"}
          role="tab"
          onClick={() => onTabChange("all")}
          className={cn(
            "relative flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold",
            "transition-all duration-200 ease-out select-none shrink-0",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
            activeTab === "all"
              ? "bg-primary text-secondary shadow-sm shadow-primary/20 font-bold"
              : "bg-secondary/5 text-secondary/70 dark:bg-white/5 dark:text-white/60 hover:bg-primary/15 hover:text-secondary dark:hover:bg-white/10 dark:hover:text-white"
          )}
        >
          <Icon
            name="apps"
            size="sm"
            className={cn(
              "transition-colors",
              activeTab === "all"
                ? "text-secondary"
                : "text-secondary/50 dark:text-white/40"
            )}
          />
          all
        </button>

        {tabs.map((tab) => {
          return (
            <button
              key={tab.value || tab.name}
              role="tab"
              aria-selected={activeTab === (tab.value || tab.name)}
              onClick={() => setActiveTab(tab.value || tab.name)}
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold",
                "transition-all duration-200 ease-out select-none shrink-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                activeTab === (tab.value || tab.name)
                  ? "bg-primary text-secondary shadow-sm shadow-primary/20 font-bold"
                  : "bg-secondary/5 text-secondary/70 dark:bg-white/5 dark:text-white/60 hover:bg-primary/15 hover:text-secondary dark:hover:bg-white/10 dark:hover:text-white"
              )}
            >
              {tab.icon && (
                <Icon
                  name={tab.icon}
                  size="sm"
                  className={cn(
                    "transition-colors",
                    activeTab === (tab.value || tab.name)
                      ? "text-secondary"
                      : "text-secondary/50 dark:text-white/40"
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
