"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, Dropdown, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface CategoryOption { id: number; name: string; color: string; icon: string; }
interface DomainOption { id: string; name: string; }

interface ExternalResourceRecord {
  id: number;
  title: string;
  description: string;
  href: string;
  categoryId: number;
  domainId: string | null;
  category?: CategoryOption;
  domain?: DomainOption | null;
  [key: string]: unknown;
}

const API = "/api/admin/external-resources";

export default function ExternalResourcesPage() {
  const [data, setData] = useState<ExternalResourceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<ExternalResourceRecord | null>(null);
  const [deleting, setDeleting] = useState<ExternalResourceRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Related data for dropdowns
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [domains, setDomains] = useState<DomainOption[]>([]);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formHref, setFormHref] = useState("");
  const [formCategoryId, setFormCategoryId] = useState<number | null>(null);
  const [formDomainId, setFormDomainId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setData(json);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  const fetchRelatedData = useCallback(async () => {
    try {
      const [catRes, domRes] = await Promise.all([
        fetch("/api/admin/resource-categories"),
        fetch("/api/admin/domains"),
      ]);
      const catJson = await catRes.json();
      const domJson = await domRes.json();
      setCategories(catJson);
      setDomains(domJson);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchData(); fetchRelatedData(); }, [fetchData, fetchRelatedData]);

  const columns: Column<ExternalResourceRecord>[] = [
    { key: "title", label: "Judul" },
    {
      key: "description",
      label: "Deskripsi",
      render: (item) => (
        <span className="text-slate-500 text-xs line-clamp-2 max-w-[250px]">{item.description}</span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (item) => item.category ? (
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]" style={{ color: item.category.color }}>{item.category.icon}</span>
          <span className="text-xs font-medium">{item.category.name}</span>
        </div>
      ) : "—",
    },
    {
      key: "domain",
      label: "Domain",
      render: (item) => item.domain ? (
        <span className="text-xs font-medium text-slate-600">{item.domain.name}</span>
      ) : <span className="text-slate-400 text-xs">—</span>,
    },
    {
      key: "href",
      label: "Link",
      render: (item) => (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs font-medium truncate max-w-[150px] block">
          Buka ↗
        </a>
      ),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setFormTitle(""); setFormDescription(""); setFormHref("");
    setFormCategoryId(null); setFormDomainId(null);
    setModalOpen(true);
  };

  const openEdit = (item: ExternalResourceRecord) => {
    setEditing(item);
    setFormTitle(item.title); setFormDescription(item.description); setFormHref(item.href);
    setFormCategoryId(item.categoryId); setFormDomainId(item.domainId);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim() || !formHref.trim() || !formCategoryId) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          href: formHref,
          categoryId: formCategoryId,
          domainId: formDomainId || null,
        }),
      });
      if (res.ok) {
        toast.success(editing ? "Resource berhasil diupdate!" : "Resource berhasil ditambahkan!");
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
      toast.success("Resource berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchData();
    } catch { toast.error("Gagal menghapus."); }
    finally { setSaving(false); }
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name, icon: c.icon }));
  const domainOptions = domains.map((d) => ({ value: d.id, label: d.name }));

  return (
    <div>
      <AdminPageHeader title="External Resources" description="Kelola link resource eksternal" actionLabel="Tambah Resource" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Resource" : "Tambah Resource"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Cisco Packet Tracer Tutorial" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi</label>
            <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} placeholder="Deskripsi singkat resource..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Link (URL) <span className="text-red-500">*</span></label>
            <input type="url" value={formHref} onChange={(e) => setFormHref(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
            <Dropdown
              options={categoryOptions}
              value={formCategoryId}
              onChange={(val) => setFormCategoryId(Number(val))}
              placeholder="Pilih kategori..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Domain <span className="text-slate-400 text-xs">(opsional)</span></label>
            <Dropdown
              options={domainOptions}
              value={formDomainId}
              onChange={(val) => setFormDomainId(val ? String(val) : null)}
              placeholder="Pilih domain..."
              nullable
            />
          </div>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
