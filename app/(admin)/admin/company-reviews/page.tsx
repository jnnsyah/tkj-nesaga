"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog } from "@/components/admin";
import type { Column, FieldConfig } from "@/components/admin";

interface ReviewRecord { id: number; name: string; text: string; academicYear: string; partnerCompanyId: number; partnerCompany?: { id: number; name: string }; [key: string]: unknown; }
interface CompanyOption { id: number; name: string; }

const API = "/api/admin/company-reviews";

export default function CompanyReviewsPage() {
  const [data, setData] = useState<ReviewRecord[]>([]);
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<ReviewRecord | null>(null);
  const [deleting, setDeleting] = useState<ReviewRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reviewsRes, companiesRes] = await Promise.all([fetch(API), fetch("/api/admin/partner-companies")]);
      setData(await reviewsRes.json());
      setCompanies(await companiesRes.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<ReviewRecord>[] = [
    { key: "name", label: "Reviewer" },
    { key: "text", label: "Review", render: (item) => (item.text?.length > 60 ? item.text.slice(0, 60) + "…" : item.text) },
    { key: "academicYear", label: "Year" },
    { key: "partnerCompany", label: "Company", render: (item) => item.partnerCompany?.name ?? "—" },
  ];

  const fields: FieldConfig[] = [
    { key: "name", label: "Reviewer Name", required: true },
    { key: "text", label: "Review Text", type: "textarea", required: true },
    { key: "academicYear", label: "Academic Year", required: true, placeholder: "e.g. 2024/2025" },
    { key: "partnerCompanyId", label: "Company", type: "select", required: true, options: companies.map((c) => ({ label: c.name, value: String(c.id) })) },
  ];

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      const payload = { ...formData, partnerCompanyId: Number(formData.partnerCompanyId) };
      const url = editing ? `${API}/${editing.id}` : API;
      await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
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
      <AdminPageHeader title="Company Reviews" description="Manage student reviews for partner companies" actionLabel="Add Review" onAction={() => { setEditing(null); setModalOpen(true); }} />
      {loading ? <div className="bg-card border border-border rounded-2xl p-12 animate-pulse h-48" /> : (
        <DataTable columns={columns} data={data} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      )}
      <FormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} title={editing ? "Edit Review" : "New Review"} fields={fields} initialData={editing ?? undefined} loading={saving} />
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
