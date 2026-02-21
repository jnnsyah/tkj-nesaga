"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DropdownOption {
    value: string | number;
    label: string;
    icon?: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string | number | null;
    onChange: (value: string | number) => void;
    placeholder?: string;
    nullable?: boolean;
}

export function Dropdown({
    options,
    value,
    onChange,
    placeholder = "Pilih opsi...",
    nullable = false,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

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
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between w-full px-4 py-3 bg-white border rounded-xl transition-all outline-none",
                    isOpen
                        ? "border-[#ffd900] ring-2 ring-[#ffd900]/50"
                        : "border-slate-200 hover:border-slate-300"
                )}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && (
                                <span className="material-symbols-outlined text-slate-500 text-[20px] shrink-0">
                                    {selectedOption.icon}
                                </span>
                            )}
                            <span className="text-sm font-medium text-slate-800 truncate">
                                {selectedOption.label}
                            </span>
                        </>
                    ) : (
                        <span className="text-sm text-slate-400 truncate">{placeholder}</span>
                    )}
                </div>
                <span
                    className={cn(
                        "material-symbols-outlined text-slate-400 transition-transform duration-200 ml-2 shrink-0",
                        isOpen ? "rotate-180" : ""
                    )}
                >
                    expand_more
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="max-h-[250px] overflow-y-auto styled-scrollbars px-1">
                        {nullable && (
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange("");
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-500 hover:bg-slate-50"
                                >
                                    <span className="flex-1 text-left line-clamp-1 italic">Tidak ada (Kosong)</span>
                                </button>
                            </li>
                        )}
                        {options.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <li key={opt.value}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors",
                                            isSelected
                                                ? "bg-[#ffd900]/10 text-[#301934] font-bold"
                                                : "text-slate-700 hover:bg-slate-50 font-medium"
                                        )}
                                    >
                                        {opt.icon && (
                                            <span className={cn("material-symbols-outlined text-[20px] shrink-0", isSelected ? "text-[#301934]" : "text-slate-400")}>
                                                {opt.icon}
                                            </span>
                                        )}
                                        <span className="flex-1 text-left line-clamp-1">{opt.label}</span>
                                        {isSelected && (
                                            <span className="material-symbols-outlined text-[18px] text-[#301934] shrink-0">
                                                check
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
