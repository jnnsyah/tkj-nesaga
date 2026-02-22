"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useToast } from "@/components/features/admin";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string, publicId: string) => void;
    onRemove: () => void;
    label?: string;
}

export const ImageUpload = ({ value, onChange, onRemove, label }: ImageUploadProps) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/achievements/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.imageUrl, data.imagePublicId);
            toast.success("Foto berhasil diupload!");
        } catch (err) {
            console.error(err);
            toast.error("Gagal mengupload foto.");
            setPreview(value || null); // Reset to old value on error
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onRemove();
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-bold text-slate-700">{label}</label>}

            <div className="relative group w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center transition-all hover:border-[#ffd900]/50">
                {preview ? (
                    <>
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white rounded-full text-slate-700 hover:text-[#fbbf24] transition-colors"
                                title="Ganti Foto"
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-2 bg-white rounded-full text-slate-700 hover:text-red-500 transition-colors"
                                title="Hapus Foto"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                        <span className="text-xs font-medium">Klik untuk upload foto</span>
                    </button>
                )}

                {loading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Uploading...</span>
                        </div>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};
