"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
    icon: string;
    value: string | number;
    label: string;
    color?: string;
}

export function StatsCard({ icon, value, label, color = "bg-[#ffd900] text-[#301934]" }: StatsCardProps) {
    // If color is passed but it's just a hex or named color, we can try to apply it to text/bg. 
    // By default, assuming `color` is a Tailwind class string like "bg-blue-100 text-blue-600".
    // If not provided, defaults to the primary yellow/dark purple combo.

    return (
        <div className="group relative overflow-hidden rounded-[24px] bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        {label}
                    </p>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                        {value}
                    </h3>
                </div>
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner transition-transform duration-300 group-hover:scale-110",
                        color
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">
                        {icon}
                    </span>
                </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-slate-50/50 blur-2xl group-hover:bg-slate-100 transition-colors pointer-events-none" />
        </div>
    );
}
