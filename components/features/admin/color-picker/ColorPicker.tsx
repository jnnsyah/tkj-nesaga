"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
}

const PRESET_COLORS = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308",
    "#84cc16", "#22c55e", "#10b981", "#14b8a6",
    "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
    "#f43f5e", "#64748b", "#78716c", "#000000"
];

export function ColorPicker({ value, onChange, label = "Warna", required = false }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 w-full px-4 py-3 border border-slate-200 bg-white rounded-xl cursor-pointer hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-[#ffd900]/50 focus-within:border-[#ffd900]"
            >
                <div
                    className="w-6 h-6 rounded-md border border-slate-200 shadow-sm shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: value || "transparent" }}
                >
                    {!value && (
                        <div className="w-full h-px bg-red-500 rotate-45 transform origin-center" />
                    )}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000 or blue"
                    className="flex-1 bg-transparent text-sm font-mono text-slate-600 focus:outline-none"
                />
                <span className={cn("material-symbols-outlined text-slate-400 transition-transform", isOpen && "rotate-180")}>
                    expand_more
                </span>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 p-3 w-full bg-white rounded-xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-5 gap-2 mb-3">
                        {PRESET_COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => {
                                    onChange(c);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full aspect-square rounded-lg border border-slate-200 transition-transform hover:scale-110",
                                    value.toLowerCase() === c.toLowerCase() && "ring-2 ring-offset-2 ring-[#ffd900] scale-110"
                                )}
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Custom Color</span>
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 cursor-pointer">
                            <input
                                type="color"
                                value={value.startsWith("#") ? value : "#000000"}
                                onChange={(e) => onChange(e.target.value)}
                                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
