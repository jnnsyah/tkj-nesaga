"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { FormModal, DeleteConfirmDialog, Dropdown, useToast } from "@/components/features/admin";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface PathItem {
    id: string; title: string; slug: string;
    domain?: { name: string } | null;
    level: { name: string; color: string };
    _count?: { steps: number };
}

interface StepAction {
    id: number; label: string; to: string | null;
    categoryId: number;
    category: { id: number; name: string; icon: string; color: string };
}

interface StepItem {
    id: number; title: string; description: string;
    mediaType: string | null; order: number;
    learningPathId: string;
    actions: StepAction[];
}

interface CategoryOption { id: number; name: string; icon: string; color: string; }

/* ── Constants ── */
const PATHS_API = "/api/admin/learning-paths";
const STEPS_API = "/api/admin/learning-steps";
const ACTIONS_API = "/api/admin/learning-step-actions";

export default function LearningStepsPage() {
    const toast = useToast();

    // ── Path list state ──
    const [paths, setPaths] = useState<PathItem[]>([]);
    const [pathsLoading, setPathsLoading] = useState(true);
    const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // ── Steps state ──
    const [steps, setSteps] = useState<StepItem[]>([]);
    const [stepsLoading, setStepsLoading] = useState(false);

    // ── Step modal ──
    const [stepModalOpen, setStepModalOpen] = useState(false);
    const [editingStep, setEditingStep] = useState<StepItem | null>(null);
    const [deleteStepOpen, setDeleteStepOpen] = useState(false);
    const [deletingStep, setDeletingStep] = useState<StepItem | null>(null);
    const [saving, setSaving] = useState(false);

    // Step form
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formMediaType, setFormMediaType] = useState("");

    // ── Action drawer ──
    const [drawerStepId, setDrawerStepId] = useState<number | null>(null);
    const [drawerActions, setDrawerActions] = useState<StepAction[]>([]);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [actionLabel, setActionLabel] = useState("");
    const [actionTo, setActionTo] = useState("");
    const [actionCategoryId, setActionCategoryId] = useState<number | null>(null);
    const [actionSaving, setActionSaving] = useState(false);

    // ── Drag state ──
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    /* ── Fetchers ── */
    const fetchPaths = useCallback(async () => {
        setPathsLoading(true);
        try {
            const res = await fetch(PATHS_API);
            setPaths(await res.json());
        } catch (err) { console.error(err); }
        finally { setPathsLoading(false); }
    }, []);

    const fetchSteps = useCallback(async (pathId: string) => {
        setStepsLoading(true);
        try {
            const res = await fetch(`${STEPS_API}?learningPathId=${pathId}`);
            setSteps(await res.json());
        } catch (err) { console.error(err); }
        finally { setStepsLoading(false); }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/resource-categories");
            setCategories(await res.json());
        } catch (err) { console.error(err); }
    }, []);

    useEffect(() => { fetchPaths(); fetchCategories(); }, [fetchPaths, fetchCategories]);
    useEffect(() => { if (selectedPathId) fetchSteps(selectedPathId); else setSteps([]); }, [selectedPathId, fetchSteps]);

    /* ── Selected path info ── */
    const selectedPath = paths.find((p) => p.id === selectedPathId);
    const filteredPaths = paths.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

    /* ── Step CRUD ── */
    const openCreateStep = () => {
        setEditingStep(null);
        setFormTitle(""); setFormDescription(""); setFormMediaType("");
        setStepModalOpen(true);
    };

    const openEditStep = (step: StepItem) => {
        setEditingStep(step);
        setFormTitle(step.title); setFormDescription(step.description); setFormMediaType(step.mediaType || "");
        setStepModalOpen(true);
    };

    const handleStepSubmit = async () => {
        if (!formTitle.trim() || !selectedPathId) return;
        setSaving(true);
        try {
            const url = editingStep ? `${STEPS_API}/${editingStep.id}` : STEPS_API;
            const method = editingStep ? "PUT" : "POST";
            const body: Record<string, unknown> = { title: formTitle, description: formDescription, mediaType: formMediaType || null };
            if (!editingStep) body.learningPathId = selectedPathId;
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
            if (res.ok) {
                toast.success(editingStep ? "Step berhasil diupdate!" : "Step berhasil ditambahkan!");
                setStepModalOpen(false); setEditingStep(null); fetchSteps(selectedPathId); fetchPaths();
            } else { toast.error("Gagal menyimpan step."); }
        } catch { toast.error("Terjadi kesalahan."); }
        finally { setSaving(false); }
    };

    const handleStepDelete = async () => {
        if (!deletingStep || !selectedPathId) return;
        setSaving(true);
        try {
            await fetch(`${STEPS_API}/${deletingStep.id}`, { method: "DELETE" });
            toast.success("Step berhasil dihapus!");
            setDeleteStepOpen(false); setDeletingStep(null); fetchSteps(selectedPathId); fetchPaths();
        } catch { toast.error("Gagal menghapus step."); }
        finally { setSaving(false); }
    };

    /* ── Drag & Drop ── */
    const handleDragStart = (idx: number) => { dragItem.current = idx; };
    const handleDragEnter = (idx: number) => { dragOverItem.current = idx; };
    const handleDragEnd = async () => {
        if (dragItem.current === null || dragOverItem.current === null || !selectedPathId) return;
        const reordered = [...steps];
        const [removed] = reordered.splice(dragItem.current, 1);
        reordered.splice(dragOverItem.current, 0, removed);
        dragItem.current = null;
        dragOverItem.current = null;
        // Optimistic update
        setSteps(reordered);
        // Save to server
        try {
            await fetch(`${STEPS_API}/reorder`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: reordered.map((s, i) => ({ id: s.id, order: i + 1 })) }),
            });
        } catch { toast.error("Gagal menyimpan urutan."); fetchSteps(selectedPathId); }
    };

    /* ── Action Drawer ── */
    const openActionDrawer = (step: StepItem) => {
        setDrawerStepId(step.id);
        setDrawerActions(step.actions);
        setActionLabel(""); setActionTo(""); setActionCategoryId(null);
    };

    const closeActionDrawer = () => { setDrawerStepId(null); setDrawerActions([]); };

    const handleAddAction = async () => {
        if (!actionLabel.trim() || !actionCategoryId || !drawerStepId) return;
        setActionSaving(true);
        try {
            const res = await fetch(ACTIONS_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ label: actionLabel, to: actionTo || null, categoryId: actionCategoryId, learningStepId: drawerStepId }),
            });
            if (res.ok) {
                const action = await res.json();
                setDrawerActions((prev) => [...prev, action]);
                setActionLabel(""); setActionTo(""); setActionCategoryId(null);
                toast.success("Action ditambahkan!");
                if (selectedPathId) fetchSteps(selectedPathId);
            }
        } catch { toast.error("Gagal menambah action."); }
        finally { setActionSaving(false); }
    };

    const handleDeleteAction = async (actionId: number) => {
        try {
            await fetch(`${ACTIONS_API}/${actionId}`, { method: "DELETE" });
            setDrawerActions((prev) => prev.filter((a) => a.id !== actionId));
            toast.success("Action dihapus!");
            if (selectedPathId) fetchSteps(selectedPathId);
        } catch { toast.error("Gagal menghapus action."); }
    };

    const drawerStep = steps.find((s) => s.id === drawerStepId);
    const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name, icon: c.icon }));

    /* ── Render ── */
    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden -mx-6 -mt-6 lg:-mx-8 lg:-mt-8">
            {/* LEFT PANEL — Path List */}
            <div className="w-[35%] min-w-[280px] max-w-md bg-white border-r border-slate-200 flex flex-col shrink-0">
                {/* Search Bar */}
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

                {/* Path Cards */}
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
                                    <span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
                                    {path._count?.steps ?? 0} Steps
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT PANEL — Steps */}
            <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
                {!selectedPath ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4 block">touch_app</span>
                            <p className="text-slate-400 font-medium">Pilih learning path dari panel kiri</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Steps Header */}
                        <div className="px-8 py-6 flex items-end justify-between shrink-0">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {selectedPath.domain && (
                                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#301934] text-white uppercase tracking-wider">{selectedPath.domain.name}</span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-black text-slate-900">{selectedPath.title}</h1>
                                <p className="text-slate-500 text-sm mt-1">Kelola urutan dan konten steps untuk learning path ini.</p>
                            </div>
                            <button
                                onClick={openCreateStep}
                                className="px-4 py-2.5 rounded-xl bg-[#301934] text-white font-semibold text-sm hover:bg-[#301934]/90 shadow-md shadow-[#301934]/20 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                Tambah Step
                            </button>
                        </div>

                        {/* Steps List */}
                        <div className="flex-1 overflow-y-auto styled-scrollbars px-8 pb-8 space-y-3">
                            {stepsLoading ? (
                                [...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-white border border-slate-200 animate-pulse" />)
                            ) : steps.length === 0 ? (
                                <div className="text-center py-16">
                                    <span className="material-symbols-outlined text-[48px] text-slate-200 mb-3 block">playlist_add</span>
                                    <p className="text-slate-400 font-medium">Belum ada steps. Klik &quot;Tambah Step&quot; untuk mulai.</p>
                                </div>
                            ) : steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    draggable
                                    onDragStart={() => handleDragStart(idx)}
                                    onDragEnter={() => handleDragEnter(idx)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => e.preventDefault()}
                                    className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 group hover:shadow-md transition-all hover:border-[#301934]/20"
                                >
                                    {/* Drag Handle */}
                                    <div className="cursor-grab active:cursor-grabbing p-2 text-slate-300 hover:text-slate-500">
                                        <span className="material-symbols-outlined">drag_indicator</span>
                                    </div>
                                    {/* Order Number */}
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0 border border-slate-200">
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 truncate">{step.title}</h4>
                                        <div className="flex items-center gap-4 mt-1">
                                            {step.mediaType && (
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {step.mediaType === "video" ? "play_circle" : step.mediaType === "quiz" ? "quiz" : "article"}
                                                    </span>
                                                    <span className="capitalize">{step.mediaType}</span>
                                                </div>
                                            )}
                                            {step.actions.length > 0 && (
                                                <div className="flex items-center gap-1.5 text-xs text-[#301934]">
                                                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                                                    <span>{step.actions.length} actions</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openActionDrawer(step)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#301934]/10 text-[#301934] hover:bg-[#301934] hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">bolt</span>
                                            Actions
                                        </button>
                                        <button onClick={() => openEditStep(step)} className="p-2 rounded-lg text-slate-400 hover:text-[#ffd900] hover:bg-[#ffd900]/10 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <button onClick={() => { setDeletingStep(step); setDeleteStepOpen(true); }} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ACTION DRAWER — Right slide-in */}
                {drawerStepId !== null && (
                    <>
                        <div className="absolute inset-0 bg-black/10 z-10" onClick={closeActionDrawer} />
                        <div className="absolute inset-y-0 right-0 w-80 bg-white border-l border-slate-200 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-200">
                            {/* Drawer Header */}
                            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h3 className="font-bold text-slate-900">Kelola Actions</h3>
                                    <p className="text-xs text-slate-500 truncate max-w-[180px]">Step: {drawerStep?.title}</p>
                                </div>
                                <button onClick={closeActionDrawer} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Action List */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-3 styled-scrollbars">
                                {drawerActions.length === 0 ? (
                                    <p className="text-sm text-slate-400 text-center py-4">Belum ada actions.</p>
                                ) : drawerActions.map((action) => (
                                    <div key={action.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white group hover:border-[#301934]/20 transition-colors">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${action.category.color}15` }}>
                                            <span className="material-symbols-outlined text-[18px]" style={{ color: action.category.color }}>{action.category.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                                            {action.to && <p className="text-xs text-slate-400 truncate">{action.to}</p>}
                                        </div>
                                        <button onClick={() => handleDeleteAction(action.id)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add Action Form */}
                            <div className="p-5 bg-slate-50 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tambah Action</h4>
                                <div className="space-y-3">
                                    <Dropdown options={categoryOptions} value={actionCategoryId} onChange={(val) => setActionCategoryId(Number(val))} placeholder="Pilih kategori..." />
                                    <input
                                        type="text" value={actionLabel} onChange={(e) => setActionLabel(e.target.value)}
                                        placeholder="Label (e.g. Baca Artikel)"
                                        className="w-full text-sm rounded-xl border border-slate-200 py-2.5 px-3 focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] placeholder:text-slate-400"
                                    />
                                    <input
                                        type="text" value={actionTo} onChange={(e) => setActionTo(e.target.value)}
                                        placeholder="URL / Target (opsional)"
                                        className="w-full text-sm rounded-xl border border-slate-200 py-2.5 px-3 focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] placeholder:text-slate-400"
                                    />
                                    <button
                                        onClick={handleAddAction}
                                        disabled={actionSaving || !actionLabel.trim() || !actionCategoryId}
                                        className="w-full py-2.5 bg-[#301934] text-white rounded-xl text-sm font-bold hover:bg-[#301934]/90 transition-colors disabled:opacity-50"
                                    >
                                        {actionSaving ? "Menyimpan..." : "Tambah Action"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modals */}
            <FormModal title={editingStep ? "Edit Step" : "Tambah Step"} isOpen={stepModalOpen} onClose={() => { setStepModalOpen(false); setEditingStep(null); }} onSubmit={handleStepSubmit} isLoading={saving}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
                        <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Pengenalan Model OSI" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
                        <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Deskripsi step..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Media Type</label>
                        <Dropdown
                            options={[
                                { value: "article", label: "Article" },
                                { value: "video", label: "Video" },
                                { value: "quiz", label: "Quiz" },
                                { value: "interactive", label: "Interactive" },
                            ]}
                            value={formMediaType || null}
                            onChange={(val) => setFormMediaType(val ? String(val) : "")}
                            placeholder="Pilih tipe media..."
                            nullable
                        />
                    </div>
                </div>
            </FormModal>
            <DeleteConfirmDialog open={deleteStepOpen} onClose={() => { setDeleteStepOpen(false); setDeletingStep(null); }} onConfirm={handleStepDelete} loading={saving} />
        </div>
    );
}
