"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface FAQRecord {
  id: number;
  question: string;
  answer: string;
  defaultOpen: boolean;
  [key: string]: unknown;
}

const columns: Column<FAQRecord>[] = [
  { key: "question", label: "Pertanyaan" },
  { key: "answer", label: "Jawaban", render: (item) => <span className="text-xs text-slate-500 line-clamp-2 max-w-[300px]">{item.answer}</span> },
  {
    key: "defaultOpen",
    label: "Default Open",
    render: (item) => item.defaultOpen ? (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-green-700 bg-green-50">Ya</span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-500 bg-slate-100">Tidak</span>
    ),
  },
];

const API = "/api/admin/faqs";

export default function FAQsPage() {
  const [data, setData] = useState<FAQRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<FAQRecord | null>(null);
  const [deleting, setDeleting] = useState<FAQRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formDefaultOpen, setFormDefaultOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditing(null); setFormQuestion(""); setFormAnswer(""); setFormDefaultOpen(false); setModalOpen(true);
  };

  const openEdit = (item: FAQRecord) => {
    setEditing(item); setFormQuestion(item.question); setFormAnswer(item.answer); setFormDefaultOpen(item.defaultOpen); setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formQuestion.trim() || !formAnswer.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: formQuestion, answer: formAnswer, defaultOpen: formDefaultOpen }) });
      if (res.ok) { toast.success(editing ? "FAQ berhasil diupdate!" : "FAQ berhasil ditambahkan!"); setModalOpen(false); setEditing(null); fetchData(); }
      else { toast.error("Gagal menyimpan data."); }
    } catch { toast.error("Terjadi kesalahan."); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return; setSaving(true);
    try { await fetch(`${API}/${deleting.id}`, { method: "DELETE" }); toast.success("FAQ berhasil dihapus!"); setDeleteOpen(false); setDeleting(null); fetchData(); }
    catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="FAQ" description="Kelola frequently asked questions" actionLabel="Tambah FAQ" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit FAQ" : "Tambah FAQ"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Pertanyaan <span className="text-red-500">*</span></label>
            <input type="text" value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)} placeholder="e.g. Apa itu prakerin?" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Jawaban <span className="text-red-500">*</span></label>
            <textarea value={formAnswer} onChange={(e) => setFormAnswer(e.target.value)} rows={4} placeholder="Tulis jawaban..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={formDefaultOpen} onChange={(e) => setFormDefaultOpen(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
            <span className="text-sm font-bold text-slate-700">Default Open (terbuka saat halaman dibuka)</span>
          </label>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
