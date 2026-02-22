"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useToast } from "@/components/features/admin";

const MAX_RAW_SIZE = 10 * 1024 * 1024;
const MAX_COMPRESSED_SIZE = 4 * 1024 * 1024;
const COMPRESS_MAX_WIDTH = 1600;
const COMPRESS_QUALITY = 0.8; 
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ImageUploadProps {
    value?: string;
    onChange: (url: string, publicId: string) => void;
    onRemove: () => void;
    label?: string;
}
const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let { width, height } = img;

            if (width > COMPRESS_MAX_WIDTH) {
                const ratio = COMPRESS_MAX_WIDTH / width;
                width = COMPRESS_MAX_WIDTH;
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Canvas context not available"));
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Compression failed"));
                        return;
                    }
                    resolve(blob);
                },
                "image/jpeg",
                COMPRESS_QUALITY
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image"));
        };

        img.src = objectUrl;
    });
};

const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const ImageUpload = ({ value, onChange, onRemove, label }: ImageUploadProps) => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ACCEPTED_TYPES.includes(file.type)) {
            toast.error("Format tidak didukung. Gunakan JPEG, PNG, atau WebP.");
            return;
        }

        if (file.size > MAX_RAW_SIZE) {
            toast.error(`File terlalu besar (${formatBytes(file.size)}). Maksimal 10MB.`);
            return;
        }

        // Show preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setLoading(true);

        try {
            // --- Client-side compression ---
            const originalSize = file.size;
            const compressedBlob = await compressImage(file);
            const compressedSize = compressedBlob.size;

            const savings = Math.round((1 - compressedSize / originalSize) * 100);
            const info = `${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savings > 0 ? `-${savings}%` : "~sama"})`;

            if (compressedSize > MAX_COMPRESSED_SIZE) {
                toast.error(`File masih terlalu besar setelah kompresi (${formatBytes(compressedSize)}). Coba gunakan foto dengan resolusi lebih kecil.`);
                setPreview(value || null);
                setLoading(false);
                return;
            }

            const compressedFile = new File([compressedBlob], file.name.replace(/\.[^.]+$/, ".jpg"), {
                type: "image/jpeg",
            });

            const formData = new FormData();
            formData.append("file", compressedFile);

            const res = await fetch("/api/admin/achievements/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Upload failed");
            }

            const data = await res.json();
            onChange(data.imageUrl, data.imagePublicId);
            toast.success("Foto berhasil diupload!");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Gagal mengupload foto.");
            setPreview(value || null);
        } finally {
            setLoading(false);
        }
    }, [onChange, toast, value]);

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
                        <span className="text-[10px] text-slate-300">JPEG, PNG, WebP • Maks 10MB</span>
                    </button>
                )}

                {loading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-[#ffd900] border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mengompresi & mengupload...</span>
                        </div>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
            />
        </div>
    );
};
