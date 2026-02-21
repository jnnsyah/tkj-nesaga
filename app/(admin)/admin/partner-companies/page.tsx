"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminPageHeader, DataTable, FormModal, DeleteConfirmDialog, useToast } from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface CategoryOption { id: number; title: string; icon: string; }

interface CompanyRecord {
  id: number;
  name: string;
  verified: boolean;
  isActive: boolean;
  address: string;
  phone: string | null;
  email: string | null;
  mapsUrl: string | null;
  categories: { categoryId: number; category: CategoryOption }[];
  _count?: { reviews: number };
  [key: string]: unknown;
}

const API = "/api/admin/partner-companies";

export default function PartnerCompaniesPage() {
  const [data, setData] = useState<CompanyRecord[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<CompanyRecord | null>(null);
  const [deleting, setDeleting] = useState<CompanyRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [formName, setFormName] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMapsUrl, setFormMapsUrl] = useState("");
  const [formVerified, setFormVerified] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formCategoryIds, setFormCategoryIds] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [compRes, catRes] = await Promise.all([
        fetch(API),
        fetch("/api/admin/partner-categories"),
      ]);
      setData(await compRes.json());
      setAllCategories(await catRes.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns: Column<CompanyRecord>[] = [
    { key: "name", label: "Nama" },
    {
      key: "categories",
      label: "Kategori",
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.categories.map((c) => (
            <span key={c.categoryId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              <span className="material-symbols-outlined text-[12px]">{c.category.icon}</span>
              {c.category.title}
            </span>
          ))}
        </div>
      ),
    },
    { key: "address", label: "Alamat", render: (item) => <span className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{item.address}</span> },
    {
      key: "verified",
      label: "Status",
      render: (item) => (
        <div className="flex flex-col gap-1">
          {item.verified && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-700 bg-blue-50"><span className="material-symbols-outlined text-[12px]">verified</span>Verified</span>}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${item.isActive ? "text-green-700 bg-green-50" : "text-slate-500 bg-slate-100"}`}>
            {item.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      key: "_count",
      label: "Reviews",
      render: (item) => (
        <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
          {item._count?.reviews ?? 0}
        </span>
      ),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setFormName(""); setFormAddress(""); setFormPhone(""); setFormEmail("");
    setFormMapsUrl(""); setFormVerified(false); setFormIsActive(true); setFormCategoryIds([]);
    setModalOpen(true);
  };

  const openEdit = (item: CompanyRecord) => {
    setEditing(item);
    setFormName(item.name); setFormAddress(item.address); setFormPhone(item.phone || "");
    setFormEmail(item.email || ""); setFormMapsUrl(item.mapsUrl || "");
    setFormVerified(item.verified); setFormIsActive(item.isActive);
    setFormCategoryIds(item.categories.map((c) => c.categoryId));
    setModalOpen(true);
  };

  const toggleCategory = (id: number) => {
    setFormCategoryIds((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const handleSubmit = async () => {
    if (!formName.trim() || !formAddress.trim()) return;
    setSaving(true);
    try {
      const url = editing ? `${API}/${editing.id}` : API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName, address: formAddress, phone: formPhone || null,
          email: formEmail || null, mapsUrl: formMapsUrl || null,
          verified: formVerified, isActive: formIsActive, categoryIds: formCategoryIds,
        }),
      });
      if (res.ok) {
        toast.success(editing ? "Perusahaan berhasil diupdate!" : "Perusahaan berhasil ditambahkan!");
        setModalOpen(false); setEditing(null); fetchData();
      } else { toast.error("Gagal menyimpan data."); }
    } catch { toast.error("Terjadi kesalahan."); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
      toast.success("Perusahaan berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchData();
    } catch { toast.error("Gagal menghapus."); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <AdminPageHeader title="Partner Companies" description="Kelola perusahaan mitra prakerin" actionLabel="Tambah Perusahaan" onAction={openCreate} />
      <DataTable columns={columns} data={data} isLoading={loading} onEdit={openEdit} onDelete={(item) => { setDeleting(item); setDeleteOpen(true); }} />
      <FormModal title={editing ? "Edit Perusahaan" : "Tambah Perusahaan"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama <span className="text-red-500">*</span></label>
            <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. PT Telkom Indonesia" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Alamat <span className="text-red-500">*</span></label>
            <textarea value={formAddress} onChange={(e) => setFormAddress(e.target.value)} rows={2} placeholder="Alamat lengkap..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Telepon</label>
              <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="08xx" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
              <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Google Maps URL</label>
            <input type="url" value={formMapsUrl} onChange={(e) => setFormMapsUrl(e.target.value)} placeholder="https://maps.google.com/..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat.id} type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${formCategoryIds.includes(cat.id)
                      ? "bg-[#ffd900]/20 border-[#ffd900] text-[#301934]"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  {cat.title}
                  {formCategoryIds.includes(cat.id) && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={formVerified} onChange={(e) => setFormVerified(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
              <span className="text-sm font-bold text-slate-700">Verified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={formIsActive} onChange={(e) => setFormIsActive(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]" />
              <span className="text-sm font-bold text-slate-700">Active</span>
            </label>
          </div>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
