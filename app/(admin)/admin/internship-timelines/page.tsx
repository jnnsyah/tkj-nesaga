"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AdminPageHeader, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";

interface TimelineRecord {
  id: number; icon: string; title: string; description: string;
  highlight: boolean; order: number;
}

const API = "/api/admin/internship-timelines";

export default function InternshipTimelinesPage() {
  const [data, setData] = useState<TimelineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<TimelineRecord | null>(null);
  const [deleting, setDeleting] = useState<TimelineRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formIcon, setFormIcon] = useState("");
  const [formHighlight, setFormHighlight] = useState(false);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditing(null); setFormTitle(""); setFormDescription(""); setFormIcon(""); setFormHighlight(false); setModalOpen(true);
  };

  const openEdit = (item: TimelineRecord) => {
    setEditing(item); setFormTitle(item.title); setFormDescription(item.description); setFormIcon(item.icon); setFormHighlight(item.highlight); setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const body: Record<string, unknown> = { title: formTitle, description: formDescription, icon: formIcon, highlight: formHighlight };
      if (!editing) body.order = data.length + 1;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? "Timeline berhasil diupdate!" : "Timeline berhasil ditambahkan!"); setModalOpen(false); setEditing(null); fetchData(); }
      else { toast.error("Gagal menyimpan."); }
    } catch { toast.error("Terjadi kesalahan."); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return; setSaving(true);
    try { await fetch(`${API}/${deleting.id}`, { method: "DELETE" }); toast.success("Timeline berhasil dihapus!"); setDeleteOpen(false); setDeleting(null); fetchData(); }
    catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  const handleDragStart = (idx: number) => { dragItem.current = idx; };
  const handleDragEnter = (idx: number) => { dragOverItem.current = idx; };
  const handleDragEnd = async () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const reordered = [...data];
    const [removed] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, removed);
    dragItem.current = null; dragOverItem.current = null;
    setData(reordered);
    try {
      await fetch(`${API}/reorder`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: reordered.map((s, i) => ({ id: s.id, order: i + 1 })) }) });
    } catch { toast.error("Gagal menyimpan urutan."); fetchData(); }
  };

  return (
    <div>
      <AdminPageHeader title="Internship Timelines" description="Kelola timeline prakerin (drag untuk reorder)" actionLabel="Tambah Timeline" onAction={openCreate} />

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-white border border-slate-200 animate-pulse" />)}</div>
      ) : data.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[48px] text-slate-200 mb-3 block">timeline</span>
          <p className="text-slate-400 font-medium">Belum ada timeline.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, idx) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`bg-white border rounded-2xl p-4 flex items-center gap-4 group hover:shadow-md transition-all hover:border-[#301934]/20 ${item.highlight ? "border-[#ffd900] bg-[#ffd900]/5" : "border-slate-200"}`}
            >
              <div className="cursor-grab active:cursor-grabbing p-2 text-slate-300 hover:text-slate-500">
                <span className="material-symbols-outlined">drag_indicator</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0 border border-slate-200">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#301934]/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px] text-[#301934]">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
              </div>
              {item.highlight && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ffd900] text-[#301934] shrink-0">Highlight</span>
              )}
              <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-[#ffd900] hover:bg-[#ffd900]/10 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button onClick={() => { setDeleting(item); setDeleteOpen(true); }} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal title={editing ? "Edit Timeline" : "Tambah Timeline"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Pendaftaran" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
            <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Deskripsi tahapan..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={formHighlight} onChange={(e) => setFormHighlight(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
            <span className="text-sm font-bold text-slate-700">Highlight (tahap aktif/penting)</span>
          </label>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
