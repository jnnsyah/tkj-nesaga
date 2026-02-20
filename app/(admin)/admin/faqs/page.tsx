"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface FaqRecord { id: number; question: string; answer: string; defaultOpen: boolean;[key: string]: unknown; }

const columns: Column<FaqRecord>[] = [
  { key: "question", label: "Question", render: (item) => (item.question?.length > 80 ? item.question.slice(0, 80) + "…" : item.question) },
  { key: "answer", label: "Answer", render: (item) => (item.answer?.length > 60 ? item.answer.slice(0, 60) + "…" : item.answer) },
  { key: "defaultOpen", label: "Open by Default", render: (item) => item.defaultOpen ? "✓" : "—" },
];

const fields: FieldConfig[] = [
  { key: "question", label: "Question", type: "textarea", required: true },
  { key: "answer", label: "Answer", type: "textarea", required: true },
  { key: "defaultOpen", label: "Default Open", type: "checkbox", placeholder: "Show expanded by default" },
];

const API = "/api/admin/faqs";

export default function FaqsPage() {
  const [data, setData] = useState<FaqRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<FaqRecord | null>(null);
  const [deleting, setDeleting] = useState<FaqRecord | null>(null);
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
      <AdminPageHeader title="FAQs" description="Manage frequently asked questions" actionLabel="Add FAQ" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit FAQ" : "New FAQ"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
