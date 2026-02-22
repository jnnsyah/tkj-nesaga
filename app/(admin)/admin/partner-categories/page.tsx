"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface PartnerCategoryRecord {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  _count?: { companies: number };
  [key: string]: unknown;
}

const columns: Column<PartnerCategoryRecord>[] = [
  {
    key: "icon",
    label: "Icon",
    render: (item) => (
      <span className="material-symbols-outlined text-[22px] text-slate-600">{item.icon}</span>
    ),
  },
  { key: "title", label: "Judul" },
  { key: "subtitle", label: "Subtitle" },
  {
    key: "_count",
    label: "Perusahaan",
    render: (item) => (
      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
        {item._count?.companies ?? 0}
      </span>
    ),
  },
];

const API = "/api/admin/partner-categories";

export default function PartnerCategoriesPage() {
  const [data, setData] = useState<PartnerCategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerCategoryRecord | null>(null);
  const [deleting, setDeleting] = useState<PartnerCategoryRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
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
    setFormTitle(""); setFormSubtitle(""); setFormIcon("");
    setModalOpen(true);
  };

  const openEdit = (item: PartnerCategoryRecord) => {
    setEditing(item);
    setFormTitle(item.title); setFormSubtitle(item.subtitle); setFormIcon(item.icon);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: formTitle, subtitle: formSubtitle, icon: formIcon }) });
      if (res.ok) {
        toast.success(editing ? "Kategori berhasil diupdate!" : "Kategori berhasil ditambahkan!");
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
      toast.success("Kategori berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchData();
    } catch { toast.error("Gagal menghapus."); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Partner Categories" description="Kelola kategori perusahaan mitra prakerin" actionLabel="Tambah Kategori" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Kategori" : "Tambah Kategori"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. IT Consultant" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Subtitle</label>
            <input type="text" value={formSubtitle} onChange={(e) => setFormSubtitle(e.target.value)} placeholder="e.g. Perusahaan konsultan IT" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
