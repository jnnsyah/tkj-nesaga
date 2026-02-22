"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, ColorPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface CategoryRecord {
    id: number;
    name: string;
    color: string;
    [key: string]: unknown;
}

const columns: Column<CategoryRecord>[] = [
    {
        key: "color",
        label: "Warna",
        render: (item) => (
            <div className="flex items-center gap-2">
                <div
                    className="w-4 h-4 rounded-full border border-slate-200"
                    style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-mono text-slate-500 uppercase">{item.color}</span>
            </div>
        ),
    },
    { key: "name", label: "Nama Kategori" },
];

const API = "/api/admin/achievement-categories";

export default function AchievementCategoriesPage() {
    const [data, setData] = useState<CategoryRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editing, setEditing] = useState<CategoryRecord | null>(null);
    const [deleting, setDeleting] = useState<CategoryRecord | null>(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();

    const [formName, setFormName] = useState("");
    const [formColor, setFormColor] = useState("#fbbf24");

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
        setFormColor("#fbbf24");
        setModalOpen(true);
    };

    const openEdit = (item: CategoryRecord) => {
        setEditing(item);
        setFormName(item.name);
        setFormColor(item.color);
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
                body: JSON.stringify({ name: formName, color: formColor })
            });
            if (res.ok) {
                toast.success(editing ? "Kategori berhasil diupdate!" : "Kategori berhasil ditambahkan!");
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
                toast.success("Kategori berhasil dihapus!");
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
                title="Kategori Prestasi"
                description="Kelola kategori untuk prestasi siswa"
                actionLabel="Tambah Kategori"
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
                title={editing ? "Edit Kategori" : "Tambah Kategori"}
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditing(null); }}
                onSubmit={handleSubmit}
                isLoading={saving}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ">Nama Kategori <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Akademik"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]"
                        />
                    </div>
                    <ColorPicker
                        value={formColor}
                        onChange={setFormColor}
                        label="Warna Badge"
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
