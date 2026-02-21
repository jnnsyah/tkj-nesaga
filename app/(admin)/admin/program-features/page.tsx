"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface FeatureRecord { id: number; icon: string; title: string; description: string;[key: string]: unknown; }

const columns: Column<FeatureRecord>[] = [
  { key: "icon", label: "Icon", render: (item) => <span className="material-symbols-outlined text-[22px] text-[#301934]">{item.icon}</span> },
  { key: "title", label: "Judul" },
  { key: "description", label: "Deskripsi", render: (item) => <span className="text-xs text-slate-500 line-clamp-2 max-w-[300px]">{item.description}</span> },
];

const API = "/api/admin/program-features";

export default function ProgramFeaturesPage() {
  const [data, setData] = useState<FeatureRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<FeatureRecord | null>(null);
  const [deleting, setDeleting] = useState<FeatureRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIcon, setFormIcon] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditing(null); setFormTitle(""); setFormDescription(""); setFormIcon(""); setModalOpen(true); };
  const openEdit = (item: FeatureRecord) => { setEditing(item); setFormTitle(item.title); setFormDescription(item.description); setFormIcon(item.icon); setModalOpen(true); };

  const handleSubmit = async () => {
    if (!formTitle.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: formTitle, description: formDescription, icon: formIcon }) });
      if (res.ok) { toast.success(editing ? "Feature berhasil diupdate!" : "Feature berhasil ditambahkan!"); setModalOpen(false); setEditing(null); fetchData(); }
      else { toast.error("Gagal menyimpan."); }
    } catch { toast.error("Terjadi kesalahan."); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return; setSaving(true);
    try { await fetch(`${API}/${deleting.id}`, { method: "DELETE" }); toast.success("Feature berhasil dihapus!"); setDeleteOpen(false); setDeleting(null); fetchData(); }
    catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Program Features" description="Kelola fitur unggulan program" actionLabel="Tambah Feature" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Feature" : "Tambah Feature"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Sertifikasi Internasional" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
            <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Deskripsi feature..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
