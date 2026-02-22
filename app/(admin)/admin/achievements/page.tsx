"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
    AdminPageHeader,
    DataTable,
    FormModal,
    DeleteConfirmDialog,
    useToast,
    StatusBadge,
    Dropdown
} from "@/components/features/admin";
import { ImageUpload } from "@/components/features/admin/image-upload";
import type { Column } from "@/components/features/admin";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface AchievementRecord {
    id: number;
    title: string;
    description: string;
    year: number;
    imageUrl: string;
    imagePublicId: string;
    order: number;
    isActive: boolean;
    categoryId: number;
    levelId: number;
    category: { id: number; name: string; color: string };
    level: { id: number; name: string; icon: string };
    [key: string]: unknown;
}

const API = "/api/admin/achievements";

export default function AchievementsPage() {
    const [data, setData] = useState<AchievementRecord[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [levels, setLevels] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editing, setEditing] = useState<AchievementRecord | null>(null);
    const [deleting, setDeleting] = useState<AchievementRecord | null>(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();

    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formYear, setFormYear] = useState(new Date().getFullYear().toString());
    const [formCategory, setFormCategory] = useState("");
    const [formLevel, setFormLevel] = useState("");
    const [formImageUrl, setFormImageUrl] = useState("");
    const [formImagePublicId, setFormImagePublicId] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [achRes, catRes, lvlRes] = await Promise.all([
                fetch(API),
                fetch("/api/admin/achievement-categories"),
                fetch("/api/admin/achievement-levels")
            ]);
            const [achJson, catJson, lvlJson] = await Promise.all([
                achRes.json(),
                catRes.json(),
                lvlRes.json()
            ]);
            setData(achJson);
            setCategories(catJson);
            setLevels(lvlJson);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const openCreate = () => {
        setEditing(null);
        setFormTitle(""); setFormDesc(""); setFormYear(new Date().getFullYear().toString());
        setFormCategory(""); setFormLevel(""); setFormImageUrl(""); setFormImagePublicId("");
        setModalOpen(true);
    };

    const openEdit = (item: AchievementRecord) => {
        setEditing(item);
        setFormTitle(item.title); setFormDesc(item.description); setFormYear(item.year.toString());
        setFormCategory(item.categoryId.toString()); setFormLevel(item.levelId.toString());
        setFormImageUrl(item.imageUrl); setFormImagePublicId(item.imagePublicId);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formTitle.trim() || !formImageUrl || !formCategory || !formLevel) {
            toast.error("Mohon lengkapi semua field wajib.");
            return;
        }
        setSaving(true);
        try {
            const url = editing ? `${API}/${editing.id}` : API;
            const method = editing ? "PUT" : "POST";
            const body = {
                title: formTitle,
                description: formDesc,
                year: formYear,
                categoryId: formCategory,
                levelId: formLevel,
                imageUrl: formImageUrl,
                imagePublicId: formImagePublicId,
            };
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                toast.success(editing ? "Prestasi berhasil diupdate!" : "Prestasi berhasil ditambahkan!");
                setModalOpen(false); setEditing(null); fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Gagal menyimpan data.");
            }
        } catch { toast.error("Terjadi kesalahan."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        setSaving(true);
        try {
            const res = await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Prestasi berhasil dihapus!");
                setDeleteOpen(false); setDeleting(null); fetchData();
            } else { toast.error("Gagal menghapus."); }
        } catch { toast.error("Gagal menghapus."); }
        finally { setSaving(false); }
    };

    const toggleStatus = async (item: AchievementRecord) => {
        try {
            const res = await fetch(`${API}/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !item.isActive })
            });
            if (res.ok) {
                toast.success(`Status berhasil diubah ke ${!item.isActive ? 'Aktif' : 'Nonaktif'}`);
                fetchData();
            }
        } catch { toast.error("Gagal mengubah status."); }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.findIndex(item => item.id === active.id);
            const newIndex = data.findIndex(item => item.id === over.id);
            const newData = arrayMove(data, oldIndex, newIndex);

            // Update local state immediately
            setData(newData);

            // Save to database
            const items = newData.map((item, index) => ({ id: item.id, order: index + 1 }));
            try {
                const res = await fetch(`${API}/reorder`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items })
                });
                if (!res.ok) throw new Error("Reorder failed");
                toast.success("Urutan berhasil diperbarui!");
            } catch {
                toast.error("Gagal memperbarui urutan.");
                fetchData(); // Reset on error
            }
        }
    };

    const columns: Column<AchievementRecord>[] = [
        {
            key: "imageUrl",
            label: "Foto",
            render: (item) => (
                <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                </div>
            ),
        },
        { key: "title", label: "Judul" },
        {
            key: "category",
            label: "Kategori",
            render: (item) => (
                <span
                    className="inline-flex px-2 px-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: item.category.color }}
                >
                    {item.category.name}
                </span>
            )
        },
        {
            key: "level",
            label: "Level",
            render: (item) => (
                <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="material-symbols-outlined text-sm">{item.level.icon}</span>
                    <span className="text-xs font-semibold">{item.level.name}</span>
                </div>
            )
        },
        { key: "year", label: "Tahun" },
        {
            key: "isActive",
            label: "Status",
            render: (item) => (
                <button onClick={(e) => { e.stopPropagation(); toggleStatus(item); }}>
                    <StatusBadge status={item.isActive ? "active" : "inactive"} />
                </button>
            )
        }
    ];

    return (
        <div>
            <AdminPageHeader
                title="Prestasi Siswa"
                description="Kelola daftar prestasi siswa (Drag & Drop untuk mengurutkan)"
                actionLabel="Tambah Prestasi"
                onAction={openCreate}
            />

            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onEdit={openEdit}
                onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }}
                reorderable
                onReorder={handleDragEnd}
            />

            <FormModal
                title={editing ? "Edit Prestasi" : "Tambah Prestasi"}
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditing(null); }}
                onSubmit={handleSubmit}
                isLoading={saving}
                size="lg"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul Prestasi <span className="text-red-500">*</span></label>
                            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Juara 1 LKS Nasional" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Tahun <span className="text-red-500">*</span></label>
                            <input type="number" value={formYear} onChange={(e) => setFormYear(e.target.value)} placeholder="e.g. 2024" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]">
                                    <option value="">Pilih Kategori</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Level <span className="text-red-500">*</span></label>
                                <select value={formLevel} onChange={(e) => setFormLevel(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]">
                                    <option value="">Pilih Level</option>
                                    {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
                            <textarea rows={4} value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Detail prestasi..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ImageUpload
                            label="Foto Prestasi *"
                            value={formImageUrl}
                            onChange={(url, publicId) => { setFormImageUrl(url); setFormImagePublicId(publicId); }}
                            onRemove={() => { setFormImageUrl(""); setFormImagePublicId(""); }}
                        />
                    </div>
                </div>
            </FormModal>

            <DeleteConfirmDialog
                open={deleteOpen}
                onClose={() => { setDeleteOpen(false); setDeleting(null); }}
                onConfirm={handleDelete}
                loading={saving}
            />
        </div>
    );
}
