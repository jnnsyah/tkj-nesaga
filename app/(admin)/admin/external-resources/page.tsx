"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface ResourceRecord {
  id: number;
  icon: string;
  title: string;
  description: string;
  href: string;
  color: string;
  [key: string]: unknown;
}

const columns: Column<ResourceRecord>[] = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", render: (item) => (item.description?.length > 60 ? item.description.slice(0, 60) + "…" : item.description) },
  { key: "color", label: "Color" },
  { key: "href", label: "URL", render: (item) => <a href={item.href} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs truncate max-w-[200px] block">{item.href}</a> },
];

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon", required: true, placeholder: "Material icon name" },
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "href", label: "URL", required: true, placeholder: "https://..." },
  {
    key: "color", label: "Color", type: "select", required: true, options: [
      { label: "Red", value: "red" }, { label: "Blue", value: "blue" },
      { label: "Green", value: "green" }, { label: "Orange", value: "orange" },
    ]
  },
];

const API = "/api/admin/external-resources";

export default function ExternalResourcesPage() {
  const [data, setData] = useState<ResourceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceRecord | null>(null);
  const [deleting, setDeleting] = useState<ResourceRecord | null>(null);
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
      <AdminPageHeader title="External Resources" description="Manage external learning resources" actionLabel="Add Resource" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Resource" : "New Resource"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
