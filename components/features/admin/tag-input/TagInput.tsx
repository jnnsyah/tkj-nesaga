"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export function TagInput({ value, onChange, placeholder = "Ketik dan tekan Enter..." }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
            }
            setInputValue("");
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            e.preventDefault();
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="relative flex flex-wrap gap-2 w-full min-h-[48px] px-3 py-2 bg-white border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#ffd900]/50 focus-within:border-[#ffd900] transition-colors">
            {value.map((tag) => (
                <div
                    key={tag}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700 animate-in fade-in zoom-in-95 duration-150"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-slate-300 text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={value.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
        </div>
    );
}
