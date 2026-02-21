"use client";

import { useEffect, useState, useCallback } from "react";
import { FormModal, DeleteConfirmDialog, Dropdown, useToast } from "@/components/features/admin";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface PathItem {
    id: string; title: string; slug: string;
    domain?: { name: string } | null;
    level: { name: string; color: string };
    _count?: { recommendations: number };
}

interface CategoryOption { id: number; name: string; icon: string; color: string; }

interface RecommendationRecord {
    id: number;
    title: string;
    description: string;
    href: string;
    categoryId: number;
    learningPathId: string;
    category?: CategoryOption;
    [key: string]: unknown;
}

/* ── Constants ── */
const PATHS_API = "/api/admin/learning-paths";
const REC_API = "/api/admin/learning-recommendations";

export default function LearningRecommendationsPage() {
    const toast = useToast();

    // ── Path list state ──
    const [paths, setPaths] = useState<PathItem[]>([]);
    const [pathsLoading, setPathsLoading] = useState(true);
    const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // ── Recommendations state ──
    const [recs, setRecs] = useState<RecommendationRecord[]>([]);
    const [recsLoading, setRecsLoading] = useState(false);

    // ── Categories for dropdown ──
    const [categories, setCategories] = useState<CategoryOption[]>([]);

    // ── Modal state ──
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<RecommendationRecord | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState<RecommendationRecord | null>(null);
    const [saving, setSaving] = useState(false);

    // ── Form state ──
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formHref, setFormHref] = useState("");
    const [formCategoryId, setFormCategoryId] = useState<number | null>(null);

    /* ── Fetchers ── */
    const fetchPaths = useCallback(async () => {
        setPathsLoading(true);
        try {
            const res = await fetch(PATHS_API);
            setPaths(await res.json());
        } catch (err) { console.error(err); }
        finally { setPathsLoading(false); }
    }, []);

    const fetchRecs = useCallback(async (pathId: string) => {
        setRecsLoading(true);
        try {
            const res = await fetch(`${REC_API}?learningPathId=${pathId}`);
            setRecs(await res.json());
        } catch (err) { console.error(err); }
        finally { setRecsLoading(false); }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/resource-categories");
            setCategories(await res.json());
        } catch (err) { console.error(err); }
    }, []);

    useEffect(() => { fetchPaths(); fetchCategories(); }, [fetchPaths, fetchCategories]);
    useEffect(() => { if (selectedPathId) fetchRecs(selectedPathId); else setRecs([]); }, [selectedPathId, fetchRecs]);

    /* ── Helpers ── */
    const selectedPath = paths.find((p) => p.id === selectedPathId);
    const filteredPaths = paths.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name, icon: c.icon }));

    /* ── CRUD ── */
    const openCreate = () => {
        setEditing(null);
        setFormTitle(""); setFormDescription(""); setFormHref(""); setFormCategoryId(null);
        setModalOpen(true);
    };

    const openEdit = (rec: RecommendationRecord) => {
        setEditing(rec);
        setFormTitle(rec.title); setFormDescription(rec.description); setFormHref(rec.href);
        setFormCategoryId(rec.categoryId);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formTitle.trim() || !formHref.trim() || !formCategoryId || !selectedPathId) return;
        setSaving(true);
        try {
            const url = editing ? `${REC_API}/${editing.id}` : REC_API;
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formTitle, description: formDescription, href: formHref,
                    categoryId: formCategoryId, learningPathId: selectedPathId,
                }),
            });
            if (res.ok) {
                toast.success(editing ? "Rekomendasi berhasil diupdate!" : "Rekomendasi berhasil ditambahkan!");
                setModalOpen(false); setEditing(null); fetchRecs(selectedPathId); fetchPaths();
            } else { toast.error("Gagal menyimpan data."); }
        } catch { toast.error("Terjadi kesalahan."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleting || !selectedPathId) return;
        setSaving(true);
        try {
            await fetch(`${REC_API}/${deleting.id}`, { method: "DELETE" });
            toast.success("Rekomendasi berhasil dihapus!");
            setDeleteOpen(false); setDeleting(null); fetchRecs(selectedPathId); fetchPaths();
        } catch { toast.error("Gagal menghapus."); }
        finally { setSaving(false); }
    };

    /* ── Render ── */
    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden -mx-6 -mt-6 lg:-mx-8 lg:-mt-8">
            {/* LEFT PANEL — Path List */}
            <div className="w-[35%] min-w-[280px] max-w-md bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-4 border-b border-slate-100 flex gap-2 shrink-0">
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                        <input
                            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari path..."
                            className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#ffd900]/50 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto sidebar-scrollbars p-3 space-y-2">
                    {pathsLoading ? (
                        [...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-slate-100 animate-pulse" />)
                    ) : filteredPaths.length === 0 ? (
                        <p className="text-center text-sm text-slate-400 py-8">Belum ada learning path.</p>
                    ) : filteredPaths.map((path) => (
                        <button
                            key={path.id}
                            onClick={() => setSelectedPathId(path.id)}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl border relative overflow-hidden group transition-all",
                                selectedPathId === path.id
                                    ? "bg-[#301934]/5 border-[#301934]/20"
                                    : "bg-white border-slate-100 hover:border-[#301934]/20"
                            )}
                        >
                            {selectedPathId === path.id && <div className="absolute top-0 left-0 w-1 h-full bg-[#301934]" />}
                            <div className="flex justify-between items-start mb-2">
                                {path.domain ? (
                                    <span className="text-[10px] font-bold tracking-wider text-[#301934] uppercase bg-[#ffd900]/20 px-2 py-0.5 rounded-full">{path.domain.name}</span>
                                ) : <span />}
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#301934] transition-colors text-sm">{path.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-[14px]" style={{ color: path.level.color }}>military_tech</span>
                                    {path.level.name}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">recommend</span>
                                    {path._count?.recommendations ?? 0} Recs
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL — Recommendations */}
            <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden">
                {!selectedPath ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4 block">touch_app</span>
                            <p className="text-slate-400 font-medium">Pilih learning path dari panel kiri</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="px-8 py-6 flex items-end justify-between shrink-0">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {selectedPath.domain && (
                                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#301934] text-white uppercase tracking-wider">{selectedPath.domain.name}</span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-black text-slate-900">{selectedPath.title}</h1>
                                <p className="text-slate-500 text-sm mt-1">Kelola rekomendasi resource untuk learning path ini.</p>
                            </div>
                            <button
                                onClick={openCreate}
                                className="px-4 py-2.5 rounded-xl bg-[#301934] text-white font-semibold text-sm hover:bg-[#301934]/90 shadow-md shadow-[#301934]/20 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                Tambah Rekomendasi
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto styled-scrollbars px-8 pb-8 space-y-3">
                            {recsLoading ? (
                                [...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-white border border-slate-200 animate-pulse" />)
                            ) : recs.length === 0 ? (
                                <div className="text-center py-16">
                                    <span className="material-symbols-outlined text-[48px] text-slate-200 mb-3 block">recommend</span>
                                    <p className="text-slate-400 font-medium">Belum ada rekomendasi. Klik &quot;Tambah Rekomendasi&quot; untuk mulai.</p>
                                </div>
                            ) : recs.map((rec) => (
                                <div
                                    key={rec.id}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 group hover:shadow-md transition-all hover:border-[#301934]/20"
                                >
                                    {/* Category Icon */}
                                    {rec.category && (
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${rec.category.color}15` }}>
                                            <span className="material-symbols-outlined text-[22px]" style={{ color: rec.category.color }}>{rec.category.icon}</span>
                                        </div>
                                    )}
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900">{rec.title}</h4>
                                        {rec.description && <p className="text-slate-500 text-sm mt-0.5 line-clamp-2">{rec.description}</p>}
                                        {rec.href && (
                                            <a href={rec.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 mt-2 hover:underline font-medium">
                                                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                                {rec.href.length > 50 ? rec.href.substring(0, 50) + "…" : rec.href}
                                            </a>
                                        )}
                                    </div>
                                    {/* Category badge */}
                                    {rec.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0" style={{ backgroundColor: `${rec.category.color}15`, color: rec.category.color }}>
                                            {rec.category.name}
                                        </span>
                                    )}
                                    {/* Actions */}
                                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                                        <button onClick={() => openEdit(rec)} className="p-2 rounded-lg text-slate-400 hover:text-[#ffd900] hover:bg-[#ffd900]/10 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <button onClick={() => { setDeleting(rec); setDeleteOpen(true); }} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Modals */}
            <FormModal title={editing ? "Edit Rekomendasi" : "Tambah Rekomendasi"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
                        <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Cisco CCNA Course" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
                        <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Deskripsi singkat..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Link (URL) <span className="text-red-500">*</span></label>
                        <input type="url" value={formHref} onChange={(e) => setFormHref(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                        <Dropdown options={categoryOptions} value={formCategoryId} onChange={(val) => setFormCategoryId(Number(val))} placeholder="Pilih kategori..." />
                    </div>
                </div>
            </FormModal>
            <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
        </div>
    );
}
