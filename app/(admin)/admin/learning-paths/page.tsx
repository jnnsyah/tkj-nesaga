// Schema migration: level is now a relation, removed icon/levelVariant/actionIcon/topics/prerequisites from form
"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components/admin";
import type { Column, FieldConfig } from "@/components/admin";
import Badge from "@/components/ui/Badge";

interface LearningPathRecord {
  id: string;
  slug: string;
  title: string;
  level: { id: number; name: string; color: string };
  topics: { id: number; topic: string }[];
  prerequisites: { id: number; prerequisite: string }[];
  isPublished: boolean;
  domainId?: string;
  domain?: { id: string; name: string };
  _count?: { steps: number; recommendations: number };
  [key: string]: unknown;
}

interface DomainOption {
  id: string;
  name: string;
}

const API = "/api/admin/learning-paths";

export default function LearningPathsPage() {
  const [data, setData] = useState<LearningPathRecord[]>([]);
  const [domains, setDomains] = useState<DomainOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<LearningPathRecord | null>(null);
  const [deleting, setDeleting] = useState<LearningPathRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pathsRes, domainsRes] = await Promise.all([
        fetch(API),
        fetch("/api/admin/domains"),
      ]);
      setData(await pathsRes.json());
      setDomains(await domainsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<LearningPathRecord>[] = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    {
      key: "level",
      label: "Level",
      render: (item) => (
        <Badge variant={item.level?.name === "Foundation" ? "primary" : item.level?.name === "Beginner" ? "secondary" : "default"}>
          {item.level?.name ?? "—"}
        </Badge>
      ),
    },
    {
      key: "domain",
      label: "Domain",
      render: (item) => item.domain?.name ?? "—",
    },
    {
      key: "_count",
      label: "Steps",
      render: (item) => String(item._count?.steps ?? 0),
    },
  ];

  const fields: FieldConfig[] = [
    { key: "title", label: "Title", required: true, placeholder: "e.g. Basic Networking" },
    { key: "slug", label: "Slug", required: true, placeholder: "e.g. basic-networking" },
    {
      key: "domainId",
      label: "Domain",
      type: "select",
      options: domains.map((d) => ({ label: d.name, value: d.id })),
    },
    { key: "isPublished", label: "Published", type: "checkbox", placeholder: "Mark as published" },
  ];

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
        title="Learning Paths"
        description="Manage learning paths and their metadata"
        actionLabel="Add Path"
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
        title={editing ? "Edit Learning Path" : "New Learning Path"}
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
