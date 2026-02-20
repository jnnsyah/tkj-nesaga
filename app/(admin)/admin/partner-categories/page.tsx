"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface CategoryRecord { id: number; icon: string; title: string; subtitle: string; _count?: { companies: number };[key: string]: unknown; }

const columns: Column<CategoryRecord>[] = [
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "icon", label: "Icon" },
  { key: "_count", label: "Companies", render: (item) => String(item._count?.companies ?? 0) },
];

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon", required: true, placeholder: "Material icon name" },
  { key: "title", label: "Title", required: true },
  { key: "subtitle", label: "Subtitle", required: true },
];

const API = "/api/admin/partner-categories";

export default function PartnerCategoriesPage() {
  const [data, setData] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRecord | null>(null);
  const [deleting, setDeleting] = useState<CategoryRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(API); setData(await res.json()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      setModalOpen(false); setEditing(null); fetchData();
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
      setDeleteOpen(false); setDeleting(null); fetchData();
    } finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Partner Categories" description="Manage partner company categories" actionLabel="Add Category" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Category" : "New Category"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
