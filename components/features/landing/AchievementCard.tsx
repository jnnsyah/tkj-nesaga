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
                isCenter ? "scale-100 opacity-100 z-10" : "scale-90 opacity-40 blur-[1px]"
            )}
        >
            <div className={cn(
                "relative rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-border/40 shadow-xl",
                isCenter ? "shadow-purple-900/20" : "shadow-none"
            )}>
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                    />
                    {/* Category Badge */}
                    <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: `${achievement.category.color}CC` }}
                    >
                        {achievement.category.name}
                    </div>
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-secondary dark:text-white text-[10px] font-bold shadow-lg backdrop-blur-md">
                        {achievement.year}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <Icon name={achievement.level.icon} className="text-lg" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Tingkat {achievement.level.name}
                        </span>
                    </div>

                    <h3 className="text-xl font-black text-secondary dark:text-white mb-3 leading-tight line-clamp-2">
                        {achievement.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
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
