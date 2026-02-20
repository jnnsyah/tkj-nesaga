"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface DomainRecord {
  id: string;
  name: string;
  slug: string;
  _count?: { learning_paths: number };
  [key: string]: unknown;
}

const columns: Column<DomainRecord>[] = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  {
    key: "_count",
    label: "Paths",
    render: (item) => String(item._count?.learning_paths ?? 0),
  },
];

const fields: FieldConfig[] = [
  { key: "name", label: "Name", required: true, placeholder: "e.g. Networking" },
  { key: "slug", label: "Slug", required: true, placeholder: "e.g. networking" },
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

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      setModalOpen(false);
      setEditing(null);
      fetchData();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
      setDeleteOpen(false);
      setDeleting(null);
      fetchData();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Domains"
        description="Manage learning path domains"
        actionLabel="Add Domain"
        onAction={() => { setEditing(null); setModalOpen(true); }}
      />
      {loading ? (
        <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          onEdit={(item) => { setEditing(item); setModalOpen(true); }}
          onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }}
        />
      )}
      <FormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        title={editing ? "Edit Domain" : "New Domain"}
        fields={fields}
        initialData={editing ?? undefined}
        loading={saving}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleting(null); }}
        onConfirm={handleDelete}
        loading={saving}
      />
    </div>
  );
}
