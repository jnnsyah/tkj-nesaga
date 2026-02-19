"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components/admin";
import type { Column, FieldConfig } from "@/components/admin";

interface DocRecord { id: number; title: string; ext: string; icon: string; href: string; [key: string]: unknown; }

const columns: Column<DocRecord>[] = [
  { key: "title", label: "Title" },
  { key: "ext", label: "Extension" },
  { key: "icon", label: "Icon" },
  { key: "href", label: "URL", render: (item) => <a href={item.href} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs truncate max-w-[200px] block">{item.href}</a> },
];

const fields: FieldConfig[] = [
  { key: "title", label: "Title", required: true, placeholder: "e.g. Surat Pengantar PKL" },
  { key: "ext", label: "Extension", required: true, placeholder: "e.g. .DOCX" },
  { key: "icon", label: "Icon", required: true, placeholder: "Material icon name" },
  { key: "href", label: "Download URL", required: true, placeholder: "https://..." },
];

const API = "/api/admin/downloadable-documents";

export default function DownloadableDocumentsPage() {
  const [data, setData] = useState<DocRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<DocRecord | null>(null);
  const [deleting, setDeleting] = useState<DocRecord | null>(null);
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
      <AdminPageHeader title="Downloadable Documents" description="Manage document templates" actionLabel="Add Document" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Document" : "New Document"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
