"use client";

import { cn } from "@/lib/utils";

interface BulkActionBarProps {
    selectedCount: number;
    onDelete: () => void;
    isLoading?: boolean;
}

export function BulkActionBar({ selectedCount, onDelete, isLoading = false }: BulkActionBarProps) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="flex items-center gap-4 bg-[#301934] text-white px-6 py-3 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ffd900] text-[#301934] text-xs font-bold leading-none">
                        {selectedCount}
                    </span>
                    <span className="text-sm font-medium">item terpilih</span>
                </div>

                <div className="w-[1px] h-6 bg-white/20" />

                <button
                    onClick={onDelete}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    ) : (
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    )}
                    Hapus Semua
                </button>
            </div>
        </div>
    );
}
