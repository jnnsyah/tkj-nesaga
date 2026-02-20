// Schema migration: categories now accessed through explicit junction table
"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components";
import type { Column, FieldConfig } from "@/components";

interface CompanyRecord { id: number; name: string; verified: boolean; isActive: boolean; address: string; phone?: string; email?: string; mapsUrl?: string; categories?: { category: { id: number; title: string } }[]; _count?: { reviews: number };[key: string]: unknown; }

const API = "/api/admin/partner-companies";

export default function PartnerCompaniesPage() {
  const [data, setData] = useState<CompanyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<CompanyRecord | null>(null);
  const [deleting, setDeleting] = useState<CompanyRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const columns: Column<CompanyRecord>[] = [
    { key: "name", label: "Name" },
    { key: "address", label: "Address", render: (item) => (item.address?.length > 40 ? item.address.slice(0, 40) + "…" : item.address) },
    { key: "verified", label: "Verified", render: (item) => item.verified ? "✓" : "—" },
    { key: "categories", label: "Categories", render: (item) => item.categories?.map((c) => c.category?.title).join(", ") || "—" },
    { key: "_count", label: "Reviews", render: (item) => String(item._count?.reviews ?? 0) },
  ];

  const fields: FieldConfig[] = [
    { key: "name", label: "Company Name", required: true },
    { key: "address", label: "Address", type: "textarea", required: true },
    { key: "phone", label: "Phone", placeholder: "e.g. +62..." },
    { key: "email", label: "Email", placeholder: "company@email.com" },
    { key: "mapsUrl", label: "Google Maps URL", placeholder: "https://maps.google.com/..." },
    { key: "verified", label: "Verified", type: "checkbox", placeholder: "Mark as verified" },
  ];

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
      <AdminPageHeader title="Partner Companies" description="Manage internship partner companies" actionLabel="Add Company" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Company" : "New Company"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
