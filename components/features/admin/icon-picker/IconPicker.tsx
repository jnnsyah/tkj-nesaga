"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
    label?: string;
}

const DEFAULT_ICONS = [
    "play_circle", "article", "code", "description", "cable", "router", "hub",
    "rocket_launch", "computer", "lan", "wifi_tethering", "storefront", "build",
    "apartment", "school", "assignment", "list_alt", "bolt", "touch_app",
    "dashboard", "settings", "person", "group", "folder", "file_copy",
    "download", "upload", "link", "search", "add", "edit", "delete", "close",
    "check", "warning", "info", "error", "star", "bookmark", "home", "menu",
    "notifications", "email", "phone", "location_on", "map", "calendar_today",
    "access_time", "refresh", "sync", "cloud", "security", "lock", "key",
    "visibility", "visibility_off", "image", "video_library", "library_books",
    "work", "business", "engineering", "devices", "wifi", "bluetooth"
];

export function IconPicker({ value, onChange, label }: IconPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredIcons = DEFAULT_ICONS.filter(icon =>
        icon.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            {label && <label className="block text-sm font-bold text-slate-700 mb-1.5">{label}</label>}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-[#ffd900]/50 focus-within:border-[#ffd900]"
            >
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                    {value || "search"}
                </span>
                <span className="flex-1 text-sm text-slate-700 truncate font-medium">
                    {value || "Pilih material icon..."}
                </span>
                <span className="material-symbols-outlined text-slate-400">
                    expand_more
                </span>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-slate-100">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Cari nama icon..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="p-3 max-h-[250px] overflow-y-auto styled-scrollbars grid grid-cols-5 gap-2">
                        {filteredIcons.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => {
                                    onChange(icon);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex flex-col items-center justify-center p-2 rounded-xl transition-all aspect-square border",
                                    value === icon
                                        ? "bg-[#ffd900]/10 border-[#ffd900] text-[#301934]"
                                        : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                )}
                                title={icon}
                            >
                                <span className="material-symbols-outlined text-[24px] mb-1 leading-none">{icon}</span>
                                <span className="text-[10px] truncate w-full text-center font-medium">{icon}</span>
                            </button>
                        ))}
                        {filteredIcons.length === 0 && (
                            <div className="col-span-5 py-8 text-center text-slate-500 text-sm">
                                Icon tidak ditemukan
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
