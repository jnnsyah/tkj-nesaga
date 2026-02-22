"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface DocumentRecord {
  id: number;
  title: string;
  ext: string;
  icon: string;
  href: string;
  [key: string]: unknown;
}

const columns: Column<DocumentRecord>[] = [
  {
    key: "icon",
    label: "Icon",
    render: (item) => (
      <span className="material-symbols-outlined text-[22px] text-slate-600">{item.icon}</span>
    ),
  },
  { key: "title", label: "Judul" },
  {
    key: "ext",
    label: "Format",
    render: (item) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-blue-50 text-blue-700">
        {item.ext}
      </span>
    ),
  },
  {
    key: "href",
    label: "Link",
    render: (item) => (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-medium truncate max-w-[200px] block">
        {item.href}
      </a>
    ),
  },
];

const API = "/api/admin/downloadable-documents";

export default function DownloadableDocumentsPage() {
  const [data, setData] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<DocumentRecord | null>(null);
  const [deleting, setDeleting] = useState<DocumentRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formTitle, setFormTitle] = useState("");
  const [formExt, setFormExt] = useState("");
  const [formIcon, setFormIcon] = useState("");
  const [formHref, setFormHref] = useState("");

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
    setFormTitle(""); setFormExt(""); setFormIcon(""); setFormHref("");
    setModalOpen(true);
  };

  const openEdit = (item: DocumentRecord) => {
    setEditing(item);
    setFormTitle(item.title); setFormExt(item.ext); setFormIcon(item.icon); setFormHref(item.href);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim() || !formExt.trim() || !formHref.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: formTitle, ext: formExt, icon: formIcon, href: formHref }) });
      if (res.ok) {
        toast.success(editing ? "Dokumen berhasil diupdate!" : "Dokumen berhasil ditambahkan!");
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
      toast.success("Dokumen berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchData();
    } catch { toast.error("Gagal menghapus."); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Downloadable Documents" description="Kelola dokumen yang bisa diunduh" actionLabel="Tambah Dokumen" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Dokumen" : "Tambah Dokumen"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Panduan PPDB" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Format File <span className="text-red-500">*</span></label>
            <input type="text" value={formExt} onChange={(e) => setFormExt(e.target.value)} placeholder="e.g. PDF" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Link Download <span className="text-red-500">*</span></label>
            <input type="url" value={formHref} onChange={(e) => setFormHref(e.target.value)} placeholder="https://drive.google.com/..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
