"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, Dropdown, TagInput, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface LearningPathRecord {
  id: string;
  slug: string;
  title: string;
  levelId: number;
  domainId: string | null;
  isPublished: boolean;
  level: { id: number; name: string; color: string };
  domain?: { id: string; name: string } | null;
  topics: { id: number; topic: string }[];
  prerequisites: { id: number; prerequisite: string }[];
  _count?: { steps: number; recommendations: number };
  [key: string]: unknown;
}

interface LevelOption { id: number; name: string; color: string; }
interface DomainOption { id: string; name: string; }

const API = "/api/admin/learning-paths";

export default function LearningPathsPage() {
  const [data, setData] = useState<LearningPathRecord[]>([]);
  const [levels, setLevels] = useState<LevelOption[]>([]);
  const [domains, setDomains] = useState<DomainOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<LearningPathRecord | null>(null);
  const [deleting, setDeleting] = useState<LearningPathRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formLevelId, setFormLevelId] = useState<number | null>(null);
  const [formDomainId, setFormDomainId] = useState<string | null>(null);
  const [formIsPublished, setFormIsPublished] = useState(false);
  const [formTopics, setFormTopics] = useState<string[]>([]);
  const [formPrerequisites, setFormPrerequisites] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pathsRes, levelsRes, domainsRes] = await Promise.all([
        fetch(API),
        fetch("/api/admin/learning-levels"),
        fetch("/api/admin/domains"),
      ]);
      setData(await pathsRes.json());
      setLevels(await levelsRes.json());
      setDomains(await domainsRes.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<LearningPathRecord>[] = [
    { key: "title", label: "Judul" },
    { key: "slug", label: "Slug" },
    {
      key: "level",
      label: "Level",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${item.level?.color}20`, color: item.level?.color }}>
          {item.level?.name ?? "—"}
        </span>
      ),
    },
    {
      key: "domain",
      label: "Domain",
      render: (item) => <span className="text-xs font-medium text-slate-600">{item.domain?.name ?? "—"}</span>,
    },
    {
      key: "isPublished",
      label: "Status",
      render: (item) => item.isPublished ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold text-green-700 bg-green-50">
          <span className="material-symbols-outlined text-[14px]">check_circle</span> Published
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold text-yellow-700 bg-yellow-50">
          <span className="material-symbols-outlined text-[14px]">edit_note</span> Draft
        </span>
      ),
    },
    {
      key: "_count",
      label: "Steps",
      render: (item) => (
        <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
          {item._count?.steps ?? 0}
        </span>
      ),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setFormTitle(""); setFormSlug(""); setFormLevelId(null); setFormDomainId(null);
    setFormIsPublished(false); setFormTopics([]); setFormPrerequisites([]);
    setModalOpen(true);
  };

  const openEdit = (item: LearningPathRecord) => {
    setEditing(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormLevelId(item.levelId);
    setFormDomainId(item.domainId);
    setFormIsPublished(item.isPublished);
    setFormTopics(item.topics.map((t) => t.topic));
    setFormPrerequisites(item.prerequisites.map((p) => p.prerequisite));
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim() || !formSlug.trim() || !formLevelId) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          slug: formSlug,
          levelId: formLevelId,
          domainId: formDomainId || null,
          isPublished: formIsPublished,
          topics: formTopics,
          prerequisites: formPrerequisites,
        }),
      });
      if (res.ok) {
        toast.success(editing ? "Learning path berhasil diupdate!" : "Learning path berhasil ditambahkan!");
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
      toast.success("Learning path berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchData();
    } catch { toast.error("Gagal menghapus."); }
    finally { setSaving(false); }
  };

  const levelOptions = levels.map((l) => ({ value: l.id, label: l.name }));
  const domainOptions = domains.map((d) => ({ value: d.id, label: d.name }));

  return (
    <div>
      <AdminPageHeader title="Learning Paths" description="Kelola learning paths dan metadata" actionLabel="Tambah Path" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Learning Path" : "Tambah Learning Path"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Fundamental Jaringan" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
            <input type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} placeholder="e.g. fundamental-jaringan" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Level <span className="text-red-500">*</span></label>
            <Dropdown options={levelOptions} value={formLevelId} onChange={(val) => setFormLevelId(Number(val))} placeholder="Pilih level..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Domain <span className="text-slate-400 text-xs">(opsional)</span></label>
            <Dropdown options={domainOptions} value={formDomainId} onChange={(val) => setFormDomainId(val ? String(val) : null)} placeholder="Pilih domain..." nullable />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Topics</label>
            <TagInput value={formTopics} onChange={setFormTopics} placeholder="Ketik topik lalu Enter..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Prerequisites</label>
            <TagInput value={formPrerequisites} onChange={setFormPrerequisites} placeholder="Ketik prasyarat lalu Enter..." />
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={formIsPublished} onChange={(e) => setFormIsPublished(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
            <span className="text-sm font-bold text-slate-700">Published</span>
          </label>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
