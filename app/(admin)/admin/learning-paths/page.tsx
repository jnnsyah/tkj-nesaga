"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, Dropdown, useToast, Drawer } from "@/components/features/admin";
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

// Mini CRUD Component for Topics and Prerequisites
interface MiniItemListProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
}

function MiniItemList({ items, onChange, placeholder, label }: MiniItemListProps) {
  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleAdd = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setNewItem("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditingValue(items[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = editingValue.trim();
    if (trimmed) {
      const newItems = [...items];
      newItems[editingIndex] = trimmed;
      onChange(newItems);
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
        >
          Tambah
        </button>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-slate-400 text-sm italic bg-slate-50/50">
            Belum ada {label.toLowerCase()} yang ditambahkan.
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="group px-4 py-3 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              {editingIndex === index ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                    autoFocus
                    className="flex-1 px-3 py-1.5 border border-[#ffd900] rounded-lg text-sm focus:outline-none"
                  />
                  <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-700 font-bold text-xs px-2">Simpan</button>
                  <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-500 font-bold text-xs px-2">Batal</button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-sm font-medium text-slate-700 leading-snug">{item}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => startEdit(index)}
                      className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

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

  // Nested modal inside create/edit Form
  const [formNestedModal, setFormNestedModal] = useState<"topics" | "prerequisites" | null>(null);

  // Quick edit Drawer from data table
  const [quickEditPath, setQuickEditPath] = useState<LearningPathRecord | null>(null);
  const [quickEditType, setQuickEditType] = useState<"topics" | "prerequisites" | null>(null);
  const [quickEditItems, setQuickEditItems] = useState<string[]>([]);
  const [quickEditSaving, setQuickEditSaving] = useState(false);

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

  const openQuickEdit = (item: LearningPathRecord, type: "topics" | "prerequisites") => {
    setQuickEditPath(item);
    setQuickEditType(type);
    if (type === "topics") {
      setQuickEditItems(item.topics.map(t => t.topic));
    } else {
      setQuickEditItems(item.prerequisites.map(p => p.prerequisite));
    }
  };

  const handleQuickEditSave = async () => {
    if (!quickEditPath || !quickEditType) return;
    setQuickEditSaving(true);
    try {
      const payload = {
        title: quickEditPath.title,
        slug: quickEditPath.slug,
        levelId: quickEditPath.levelId,
        domainId: quickEditPath.domainId,
        isPublished: quickEditPath.isPublished,
        ...(quickEditType === "topics" ? { topics: quickEditItems } : {}),
        ...(quickEditType === "prerequisites" ? { prerequisites: quickEditItems } : {}),
      };

      const res = await fetch(`${API}/${quickEditPath.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`${quickEditType === "topics" ? "Topics" : "Prerequisites"} berhasil diupdate!`);
        setQuickEditType(null);
        setQuickEditPath(null);
        fetchData();
      } else {
        toast.error("Gagal menyimpan data.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setQuickEditSaving(false);
    }
  };

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
      key: "topics",
      label: "Topics",
      render: (item) => (
        <button
          onClick={() => openQuickEdit(item, "topics")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 rounded-lg text-xs font-bold transition-colors group"
        >
          <span className="material-symbols-outlined text-[16px]">topic</span>
          {item.topics?.length || 0} Topics
          <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity ml-1">chevron_right</span>
        </button>
      ),
    },
    {
      key: "prerequisites",
      label: "Prerequisites",
      render: (item) => (
        <button
          onClick={() => openQuickEdit(item, "prerequisites")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 rounded-lg text-xs font-bold transition-colors group"
        >
          <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
          {item.prerequisites?.length || 0} Syarat
          <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity ml-1">chevron_right</span>
        </button>
      ),
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

      {/* Create/Edit Form Modal */}
      <FormModal title={editing ? "Edit Learning Path" : "Tambah Learning Path"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Fundamental Jaringan" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
            <input type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} placeholder="e.g. fundamental-jaringan" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Level <span className="text-red-500">*</span></label>
              <Dropdown options={levelOptions} value={formLevelId} onChange={(val) => setFormLevelId(Number(val))} placeholder="Pilih level..." />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Domain <span className="text-slate-400 text-xs">(opsional)</span></label>
              <Dropdown options={domainOptions} value={formDomainId} onChange={(val) => setFormDomainId(val ? String(val) : null)} placeholder="Pilih domain..." nullable />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-2">Konten Spesifik</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormNestedModal("topics")}
                className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all text-left group"
              >
                <div>
                  <div className="text-sm font-bold text-slate-800">Topics</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{formTopics.length} topiks</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormNestedModal("prerequisites")}
                className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all text-left group"
              >
                <div>
                  <div className="text-sm font-bold text-slate-800">Prerequisites</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{formPrerequisites.length} prasyarat</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </div>
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none pt-2">
            <input type="checkbox" checked={formIsPublished} onChange={(e) => setFormIsPublished(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
            <span className="text-sm font-bold text-slate-700">Published</span>
          </label>
        </div>
      </FormModal>

      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />

      {/* Nested Form Modal for Topics/Prerequisites inside Create/Edit context */}
      {formNestedModal && (
        <FormModal
          title={formNestedModal === "topics" ? "Atur Topics" : "Atur Prerequisites"}
          isOpen={true}
          onClose={() => setFormNestedModal(null)}
          onSubmit={() => setFormNestedModal(null)}
        >
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
              <span className="material-symbols-outlined text-blue-500">info</span>
              <p className="text-sm font-medium leading-relaxed">
                {formNestedModal === "topics"
                  ? "Kelola topik utama yang akan dipelajari dalam learning path ini."
                  : "Kelola prasyarat yang dibutuhkan untuk mengambil learning path ini."}
              </p>
            </div>
            <MiniItemList
              label={formNestedModal === "topics" ? "Topics" : "Prerequisites"}
              items={formNestedModal === "topics" ? formTopics : formPrerequisites}
              onChange={formNestedModal === "topics" ? setFormTopics : setFormPrerequisites}
              placeholder={formNestedModal === "topics" ? "e.g. Routing Dasar" : "e.g. Lulus Dasar Jaringan"}
            />
          </div>
        </FormModal>
      )}

      {/* Slide-in Drawer for Quick CRUD direct from DataTable row */}
      <Drawer
        isOpen={quickEditType !== null}
        onClose={() => setQuickEditType(null)}
        title={quickEditType === "topics" ? "Atur Topics Path" : "Atur Prerequisites Path"}
      >
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-800">
            <span className="material-symbols-outlined text-amber-500">bolt</span>
            <p className="text-sm font-medium leading-relaxed">
              Edit cepat untuk "{quickEditPath?.title}". Perubahan akan segera disimpan saat Anda menekan tombol di bawah.
            </p>
          </div>

          <MiniItemList
            label={quickEditType === "topics" ? "Topics" : "Prerequisites"}
            items={quickEditItems}
            onChange={setQuickEditItems}
            placeholder={quickEditType === "topics" ? "e.g. Routing Dasar" : "e.g. Lulus Dasar Jaringan"}
          />

          <button
            type="button"
            onClick={handleQuickEditSave}
            disabled={quickEditSaving}
            className="flex justify-center items-center gap-2 w-full mt-6 py-3 px-4 bg-[#ffd900] text-[#301934] text-sm font-bold rounded-xl hover:bg-[#ffd900]/90 transition-colors shadow-lg shadow-[#ffd900]/20 disabled:opacity-50"
          >
            {quickEditSaving && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
            Simpan Perubahan
          </button>
        </div>
      </Drawer>
    </div>
  );
}

