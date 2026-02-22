"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Achievement } from "./types";
import { Icon } from "@/components/ui/icon";

interface AchievementCardProps {
    achievement: Achievement;
    isCenter: boolean;
}

export const AchievementCard = ({ achievement, isCenter }: AchievementCardProps) => {
    return (
        <div
            className={cn(
                "relative w-full max-w-[360px] mx-auto transition-all duration-700 ease-out",
                isCenter ? "scale-100 opacity-100 z-10 shadow-xl shadow-purple-900/20" : "scale-90 opacity-40 blur-[1px] shadow-none"
            )}
        >
            <div className={cn(
                "relative rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-border/40",
            )}>
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                    {/* Metadata Row: Level, Category, Year */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center gap-1.5">
                                <Icon name={achievement.level.icon} className="text-sm text-primary" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                    {achievement.level.name}
                                </span>
                            </div>
                            <span className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">
                                {achievement.year}
                            </span>
                        </div>
                        <div
                            className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                            style={{ backgroundColor: achievement.category.color }}
                        >
                            {achievement.category.name}
                        </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-secondary dark:text-white mb-2 sm:mb-3 leading-tight line-clamp-2">
                        {achievement.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {achievement.description}
                    </p>
                </div>

                {/* Decorative elements */}
                {isCenter && (
                    <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10" />
                )}
            </div>
        </div>
    );
};
