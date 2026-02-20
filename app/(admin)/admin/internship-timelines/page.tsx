"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface TimelineRecord { id: number; icon: string; title: string; description: string; size: string; highlight: boolean; order: number;[key: string]: unknown; }

const columns: Column<TimelineRecord>[] = [
  { key: "order", label: "#" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description", render: (item) => (item.description?.length > 60 ? item.description.slice(0, 60) + "…" : item.description) },
  { key: "size", label: "Size" },
  { key: "highlight", label: "Highlight", render: (item) => item.highlight ? "✓" : "—" },
];

const fields: FieldConfig[] = [
  { key: "title", label: "Title", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "icon", label: "Icon", required: true, placeholder: "Material icon name" },
  { key: "order", label: "Order", type: "number", required: true },
  {
    key: "size", label: "Size", type: "select", required: true, options: [
      { label: "Normal", value: "normal" }, { label: "Large", value: "large" },
    ]
  },
  { key: "highlight", label: "Highlight", type: "checkbox", placeholder: "Highlight this step" },
];

const API = "/api/admin/internship-timelines";

export default function InternshipTimelinesPage() {
  const [data, setData] = useState<TimelineRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<TimelineRecord | null>(null);
  const [deleting, setDeleting] = useState<TimelineRecord | null>(null);
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
      <AdminPageHeader title="Internship Timelines" description="Manage internship phase timeline" actionLabel="Add Timeline" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Timeline" : "New Timeline"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
