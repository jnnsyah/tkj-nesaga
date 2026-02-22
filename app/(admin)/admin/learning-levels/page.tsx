"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, ColorPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface LearningLevelRecord {
    id: number;
    name: string;
    color: string;
    icon: string;
    _count?: { learning_paths: number };
    [key: string]: unknown;
}

const columns: Column<LearningLevelRecord>[] = [
    {
        key: "icon",
        label: "Icon",
        render: (item) => (
            <span className="material-symbols-outlined text-[22px]" style={{ color: item.color }}>{item.icon}</span>
        ),
    },
    { key: "name", label: "Nama" },
    {
        key: "color",
        label: "Warna",
        render: (item) => (
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-slate-200 shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-mono text-slate-500">{item.color}</span>
            </div>
        ),
    },
    {
        key: "_count",
        label: "Paths",
        render: (item) => (
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                {item._count?.learning_paths ?? 0}
            </span>
        ),
    },
];

const API = "/api/admin/learning-levels";

export default function LearningLevelsPage() {
    const [data, setData] = useState<LearningLevelRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editing, setEditing] = useState<LearningLevelRecord | null>(null);
    const [deleting, setDeleting] = useState<LearningLevelRecord | null>(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();

    const [formName, setFormName] = useState("");
    const [formColor, setFormColor] = useState("");
    const [formIcon, setFormIcon] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            const json = await res.json();
            setData(json);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const openCreate = () => {
        setEditing(null);
        setFormName(""); setFormColor(""); setFormIcon("");
        setModalOpen(true);
    };

    const openEdit = (item: LearningLevelRecord) => {
        setEditing(item);
        setFormName(item.name); setFormColor(item.color); setFormIcon(item.icon);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formName.trim() || !formColor.trim()) return;
        setSaving(true);
        try {
            const url = editing ? `${API}/${editing.id}` : API;
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: formName, color: formColor, icon: formIcon }) });
            if (res.ok) {
                toast.success(editing ? "Level berhasil diupdate!" : "Level berhasil ditambahkan!");
                setModalOpen(false); setEditing(null); fetchData();
            } else { toast.error("Gagal menyimpan data."); }
        } catch { toast.error("Terjadi kesalahan."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleting) return;
        setSaving(true);
        try {
            await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
            toast.success("Level berhasil dihapus!");
            setDeleteOpen(false); setDeleting(null); fetchData();
        } catch { toast.error("Gagal menghapus."); }
        finally { setSaving(false); }
    };

    return (
        <div>
            <AdminPageHeader title="Learning Levels" description="Kelola tingkat kesulitan learning path" actionLabel="Tambah Level" onAction={openCreate} />
            <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
            <FormModal title={editing ? "Edit Level" : "Tambah Level"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Level <span className="text-red-500">*</span></label>
                        <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Beginner" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
                    </div>
                    <ColorPicker value={formColor} onChange={setFormColor} required />
                    <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
                </div>
            </FormModal>
            <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
        </div>
    );
}
