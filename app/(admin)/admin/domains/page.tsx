"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, IconPicker, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface DomainRecord {
  id: string;
  name: string;
  slug: string;
  icon: string;
  _count?: { learning_paths: number };
  [key: string]: unknown;
}

const columns: Column<DomainRecord>[] = [
  {
    key: "icon",
    label: "Icon",
    render: (item) => (
      <span className="material-symbols-outlined text-[22px] text-slate-600">{item.icon}</span>
    ),
  },
  { key: "name", label: "Nama" },
  { key: "slug", label: "Slug" },
  {
    key: "_count",
    label: "Paths",
    render: (item) => (
      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
        {item._count?.learning_paths ?? 0}
      </span>
    ),
  },
];

const API = "/api/admin/domains";

export default function DomainsPage() {
  const [data, setData] = useState<DomainRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<DomainRecord | null>(null);
  const [deleting, setDeleting] = useState<DomainRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Form state
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formIcon, setFormIcon] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditing(null);
    setFormName("");
    setFormSlug("");
    setFormIcon("");
    setModalOpen(true);
  };

  const openEdit = (item: DomainRecord) => {
    setEditing(item);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormIcon(item.icon);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formName.trim() || !formSlug.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, slug: formSlug, icon: formIcon }),
      });
      if (res.ok) {
        toast.success(editing ? "Domain berhasil diupdate!" : "Domain berhasil ditambahkan!");
        setModalOpen(false);
        setEditing(null);
        fetchData();
      } else {
        toast.error("Gagal menyimpan domain.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
      toast.success("Domain berhasil dihapus!");
      setDeleteOpen(false);
      setDeleting(null);
      fetchData();
    } catch {
      toast.error("Gagal menghapus domain.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Domains"
        description="Kelola domain untuk learning paths"
        actionLabel="Tambah Domain"
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
        title={editing ? "Edit Domain" : "Tambah Domain"}
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        isLoading={saving}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Domain <span className="text-red-500">*</span></label>
            <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Networking" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
            <input type="text" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} placeholder="e.g. networking" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <IconPicker value={formIcon} onChange={setFormIcon} label="Icon" />
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
