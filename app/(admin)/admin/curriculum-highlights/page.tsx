"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface HighlightRecord { id: number; text: string;[key: string]: unknown; }

const columns: Column<HighlightRecord>[] = [
  { key: "text", label: "Curriculum Highlight" },
];

const API = "/api/admin/curriculum-highlights";

export default function CurriculumHighlightsPage() {
  const [data, setData] = useState<HighlightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<HighlightRecord | null>(null);
  const [deleting, setDeleting] = useState<HighlightRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formText, setFormText] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditing(null); setFormText(""); setModalOpen(true); };
  const openEdit = (item: HighlightRecord) => { setEditing(item); setFormText(item.text); setModalOpen(true); };

  const handleSubmit = async () => {
    if (!formText.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: formText }) });
      if (res.ok) { toast.success(editing ? "Highlight berhasil diupdate!" : "Highlight berhasil ditambahkan!"); setModalOpen(false); setEditing(null); fetchData(); }
      else { toast.error("Gagal menyimpan."); }
    } catch { toast.error("Terjadi kesalahan."); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return; setSaving(true);
    try { await fetch(`${API}/${deleting.id}`, { method: "DELETE" }); toast.success("Highlight berhasil dihapus!"); setDeleteOpen(false); setDeleting(null); fetchData(); }
    catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Curriculum Highlights" description="Kelola highlight kurikulum yang ditampilkan" actionLabel="Tambah Highlight" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Highlight" : "Tambah Highlight"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Teks Highlight <span className="text-red-500">*</span></label>
            <textarea value={formText} onChange={(e) => setFormText(e.target.value)} rows={3} placeholder="e.g. Kurikulum berbasis industri 4.0" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
