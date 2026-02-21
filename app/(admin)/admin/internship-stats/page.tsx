"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface StatRecord { id: number; value: string; label: string;[key: string]: unknown; }

const columns: Column<StatRecord>[] = [
  { key: "value", label: "Nilai", render: (item) => <span className="text-lg font-black text-[#301934]">{item.value}</span> },
  { key: "label", label: "Label" },
];

const API = "/api/admin/internship-stats";

export default function InternshipStatsPage() {
  const [data, setData] = useState<StatRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<StatRecord | null>(null);
  const [deleting, setDeleting] = useState<StatRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formValue, setFormValue] = useState("");
  const [formLabel, setFormLabel] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditing(null); setFormValue(""); setFormLabel(""); setModalOpen(true); };
  const openEdit = (item: StatRecord) => { setEditing(item); setFormValue(item.value); setFormLabel(item.label); setModalOpen(true); };

  const handleSubmit = async () => {
    if (!formValue.trim() || !formLabel.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ value: formValue, label: formLabel }) });
      if (res.ok) { toast.success(editing ? "Stat berhasil diupdate!" : "Stat berhasil ditambahkan!"); setModalOpen(false); setEditing(null); fetchData(); }
      else { toast.error("Gagal menyimpan."); }
    } catch { toast.error("Terjadi kesalahan."); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return; setSaving(true);
    try { await fetch(`${API}/${deleting.id}`, { method: "DELETE" }); toast.success("Stat berhasil dihapus!"); setDeleteOpen(false); setDeleting(null); fetchData(); }
    catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Internship Stats" description="Kelola statistik prakerin yang ditampilkan" actionLabel="Tambah Stat" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Stat" : "Tambah Stat"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nilai <span className="text-red-500">*</span></label>
            <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="e.g. 50+" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Label <span className="text-red-500">*</span></label>
            <input type="text" value={formLabel} onChange={(e) => setFormLabel(e.target.value)} placeholder="e.g. Perusahaan Mitra" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
