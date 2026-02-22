"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface LevelRecord {
    id: number;
    name: string;
    icon: string;
    [key: string]: unknown;
}

const columns: Column<LevelRecord>[] = [
    {
        key: "icon",
        label: "Icon",
        render: (item) => (
            <span className="material-symbols-outlined text-[22px] text-slate-600">{item.icon}</span>
        ),
    },
    { key: "name", label: "Nama Level" },
];

const API = "/api/admin/achievement-levels";

export default function AchievementLevelsPage() {
    const [data, setData] = useState<LevelRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editing, setEditing] = useState<LevelRecord | null>(null);
    const [deleting, setDeleting] = useState<LevelRecord | null>(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();

    const [formName, setFormName] = useState("");
    const [formIcon, setFormIcon] = useState("trophy");

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
        setFormName("");
        setFormIcon("trophy");
        setModalOpen(true);
    };

    const openEdit = (item: LevelRecord) => {
        setEditing(item);
        setFormName(item.name);
        setFormIcon(item.icon);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!formName.trim()) return;
        setSaving(true);
        try {
            const url = editing ? `${API}/${editing.id}` : API;
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formName, icon: formIcon })
            });
            if (res.ok) {
                toast.success(editing ? "Level berhasil diupdate!" : "Level berhasil ditambahkan!");
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
                toast.success("Level berhasil dihapus!");
                setDeleteOpen(false); setDeleting(null); fetchData();
            } else {
                const err = await res.json();
                toast.error(err.error || "Gagal menghapus.");
            }
        } catch { toast.error("Gagal menghapus."); }
        finally { setSaving(false); }
    };

    return (
        <div>
            <AdminPageHeader
                title="Level Prestasi"
                description="Kelola tingkat/level prestasi (misal: Nasional, Provinsi)"
                actionLabel="Tambah Level"
                onAction={openCreate}
            />

            <DataTable
                columns={columns}
                data={data}
                isLoading={loading}
                onEdit={openEdit}
                onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }}
            />

            <FormModal
                title={editing ? "Edit Level" : "Tambah Level"}
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditing(null); }}
                onSubmit={handleSubmit}
                isLoading={saving}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Level <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Nasional"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]"
                        />
                    </div>
                    <IconPicker
                        value={formIcon}
                        onChange={setFormIcon}
                        label="Icon"
                    />
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
