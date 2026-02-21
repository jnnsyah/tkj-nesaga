"use client";

import { useEffect, useState, useCallback } from "react";
import { FormModal, DeleteConfirmDialog, useToast } from "@/components/features/admin";
import { cn } from "@/lib/utils";

/* ── Types ── */
interface CompanyItem {
  id: number; name: string; verified: boolean; isActive: boolean;
  address: string;
  categories: { category: { title: string; icon: string } }[];
  _count?: { reviews: number };
}

interface ReviewRecord {
  id: number; name: string; text: string; academicYear: string;
  partnerCompanyId: number;
  [key: string]: unknown;
}

/* ── Constants ── */
const COMPANIES_API = "/api/admin/partner-companies";
const REVIEWS_API = "/api/admin/company-reviews";

export default function CompanyReviewsPage() {
  const toast = useToast();

  // ── Company list ──
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Reviews ──
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // ── Modal ──
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ReviewRecord | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<ReviewRecord | null>(null);
  const [saving, setSaving] = useState(false);

  // ── Form ──
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [formYear, setFormYear] = useState("");

  /* ── Fetchers ── */
  const fetchCompanies = useCallback(async () => {
    setCompaniesLoading(true);
    try { const res = await fetch(COMPANIES_API); setCompanies(await res.json()); }
    catch (err) { console.error(err); } finally { setCompaniesLoading(false); }
  }, []);

  const fetchReviews = useCallback(async (companyId: number) => {
    setReviewsLoading(true);
    try { const res = await fetch(`${REVIEWS_API}?partnerCompanyId=${companyId}`); setReviews(await res.json()); }
    catch (err) { console.error(err); } finally { setReviewsLoading(false); }
  }, []);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);
  useEffect(() => { if (selectedCompanyId) fetchReviews(selectedCompanyId); else setReviews([]); }, [selectedCompanyId, fetchReviews]);

  /* ── Helpers ── */
  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);
  const filteredCompanies = companies.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  /* ── CRUD ── */
  const openCreate = () => { setEditing(null); setFormName(""); setFormText(""); setFormYear(""); setModalOpen(true); };

  const openEdit = (rev: ReviewRecord) => {
    setEditing(rev); setFormName(rev.name); setFormText(rev.text); setFormYear(rev.academicYear); setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formName.trim() || !formText.trim() || !formYear.trim() || !selectedCompanyId) return;
    setSaving(true);
    try {
      const url = editing ? `${REVIEWS_API}/${editing.id}` : REVIEWS_API;
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, text: formText, academicYear: formYear, partnerCompanyId: selectedCompanyId }),
      });
      if (res.ok) {
        toast.success(editing ? "Review berhasil diupdate!" : "Review berhasil ditambahkan!");
        setModalOpen(false); setEditing(null); fetchReviews(selectedCompanyId); fetchCompanies();
      } else { toast.error("Gagal menyimpan data."); }
    } catch { toast.error("Terjadi kesalahan."); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleting || !selectedCompanyId) return;
    setSaving(true);
    try {
      await fetch(`${REVIEWS_API}/${deleting.id}`, { method: "DELETE" });
      toast.success("Review berhasil dihapus!");
      setDeleteOpen(false); setDeleting(null); fetchReviews(selectedCompanyId); fetchCompanies();
    } catch { toast.error("Gagal menghapus."); } finally { setSaving(false); }
  };

  /* ── Render ── */
  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden -mx-6 -mt-6 lg:-mx-8 lg:-mt-8">
      {/* LEFT PANEL — Company List */}
      <div className="w-[35%] min-w-[280px] max-w-md bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 flex gap-2 shrink-0">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari perusahaan..."
              className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#ffd900]/50 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto sidebar-scrollbars p-3 space-y-2">
          {companiesLoading ? (
            [...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-slate-100 animate-pulse" />)
          ) : filteredCompanies.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-8">Belum ada perusahaan.</p>
          ) : filteredCompanies.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border relative overflow-hidden group transition-all",
                selectedCompanyId === company.id
                  ? "bg-[#301934]/5 border-[#301934]/20"
                  : "bg-white border-slate-100 hover:border-[#301934]/20"
              )}
            >
              {selectedCompanyId === company.id && <div className="absolute top-0 left-0 w-1 h-full bg-[#301934]" />}
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#301934] transition-colors">{company.name}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {company.verified && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-blue-700 bg-blue-50">
                    <span className="material-symbols-outlined text-[10px]">verified</span>Verified
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-[14px]">rate_review</span>
                  {company._count?.reviews ?? 0} Reviews
                </span>
              </div>
              {company.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {company.categories.slice(0, 3).map((c, i) => (
                    <span key={i} className="text-[9px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">
                      {c.category.title}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — Reviews */}
      <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden">
        {!selectedCompany ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-[64px] text-slate-200 mb-4 block">touch_app</span>
              <p className="text-slate-400 font-medium">Pilih perusahaan dari panel kiri</p>
            </div>
          </div>
        ) : (
          <>
            <div className="px-8 py-6 flex items-end justify-between shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {selectedCompany.verified && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified</span>Verified
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-black text-slate-900">{selectedCompany.name}</h1>
                <p className="text-slate-500 text-sm mt-1">Kelola ulasan siswa untuk perusahaan ini.</p>
              </div>
              <button
                onClick={openCreate}
                className="px-4 py-2.5 rounded-xl bg-[#301934] text-white font-semibold text-sm hover:bg-[#301934]/90 shadow-md shadow-[#301934]/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Tambah Review
              </button>
            </div>

            <div className="flex-1 overflow-y-auto styled-scrollbars px-8 pb-8 space-y-3">
              {reviewsLoading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-28 rounded-2xl bg-white border border-slate-200 animate-pulse" />)
              ) : reviews.length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-[48px] text-slate-200 mb-3 block">rate_review</span>
                  <p className="text-slate-400 font-medium">Belum ada review. Klik &quot;Tambah Review&quot; untuk mulai.</p>
                </div>
              ) : reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 group hover:shadow-md transition-all hover:border-[#301934]/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#301934]/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-black text-[#301934]">{rev.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{rev.name}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rev.academicYear}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => openEdit(rev)} className="p-2 rounded-lg text-slate-400 hover:text-[#ffd900] hover:bg-[#ffd900]/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={() => { setDeleting(rev); setDeleteOpen(true); }} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <FormModal title={editing ? "Edit Review" : "Tambah Review"} isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSubmit={handleSubmit} isLoading={saving}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Reviewer <span className="text-red-500">*</span></label>
            <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Ahmad Faiz" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Review <span className="text-red-500">*</span></label>
            <textarea value={formText} onChange={(e) => setFormText(e.target.value)} rows={4} placeholder="Tulis review..." className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Tahun Akademik <span className="text-red-500">*</span></label>
            <input type="text" value={formYear} onChange={(e) => setFormYear(e.target.value)} placeholder="e.g. 2024/2025" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]" />
          </div>
        </div>
      </FormModal>
      <DeleteConfirmDialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleting(null); }} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}
