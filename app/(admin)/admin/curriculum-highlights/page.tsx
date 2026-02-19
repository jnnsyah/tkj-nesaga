"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components/admin";
import type { Column, FieldConfig } from "@/components/admin";

interface HighlightRecord { id: number; text: string; [key: string]: unknown; }

const columns: Column<HighlightRecord>[] = [
  { key: "id", label: "ID" },
  { key: "text", label: "Text" },
];

const fields: FieldConfig[] = [
  { key: "text", label: "Highlight Text", required: true, placeholder: "e.g. Praktik langsung di laboratorium komputer" },
];

const API = "/api/admin/curriculum-highlights";

export default function CurriculumHighlightsPage() {
  const [data, setData] = useState<HighlightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<HighlightRecord | null>(null);
  const [deleting, setDeleting] = useState<HighlightRecord | null>(null);
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
      <AdminPageHeader title="Curriculum Highlights" description="Manage curriculum highlight items" actionLabel="Add Highlight" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Highlight" : "New Highlight"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
