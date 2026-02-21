# CONTEXT.md — Admin Dashboard Project

> **Baca file ini sebelum mengerjakan task apapun.**
> File ini adalah sumber kebenaran tunggal untuk project ini.

---

## Gambaran Project

Website informasi jurusan **Teknik Komputer dan Jaringan (TKJ)** yang mencakup:
- Halaman publik untuk siswa/pengguna (homepage, learning path, prakerin, dll)
- **Admin dashboard** untuk mengelola semua konten dan data

Dashboard ini adalah **pengganti total** dari admin dashboard lama.
Admin dashboard lama telah dihapus sepenuhnya.

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS — custom utility only, NO component library |
| Database ORM | Prisma |
| Backend | Next.js API Routes (`/app/api/...`) |
| Auth | NextAuth.js / Auth.js |
| Icons | lucide-react dan Material Symbols (icon name as string, e.g. `play_circle`) |

> **Penting:** Tidak ada component library (tidak pakai shadcn, Radix, Headless UI, dll).
> Semua komponen dibuat custom dengan Tailwind CSS.

---

## Struktur Folder

```
├── app
│   ├── (admin)
│   │   ├── admin
│   │   │   ├── layout.tsx                        ← AdminLayout (Sidebar + Topbar)
│   │   │   ├── page.tsx                          ← Dashboard Overview
│   │   │   │
│   │   │   ├── [DATA MASTER]
│   │   │   ├── domains
│   │   │   │   └── page.tsx
│   │   │   ├── learning-levels                   ← BARU (belum ada, perlu dibuat)
│   │   │   │   └── page.tsx
│   │   │   ├── resource-categories               ← BARU (belum ada, perlu dibuat)
│   │   │   │   └── page.tsx
│   │   │   ├── partner-categories
│   │   │   │   └── page.tsx
│   │   │   ├── downloadable-documents
│   │   │   │   └── page.tsx
│   │   │   ├── external-resources
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── [LEARNING]
│   │   │   ├── learning-paths
│   │   │   │   └── page.tsx
│   │   │   ├── learning-steps                    ← BARU (split panel manager)
│   │   │   │   └── page.tsx
│   │   │   ├── learning-recommendations          ← BARU
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── [PRAKERIN]
│   │   │   ├── partner-companies
│   │   │   │   └── page.tsx
│   │   │   ├── company-reviews
│   │   │   │   └── page.tsx
│   │   │   ├── faqs
│   │   │   │   └── page.tsx
│   │   │   ├── internship-stats
│   │   │   │   └── page.tsx
│   │   │   ├── internship-timelines
│   │   │   │   └── page.tsx
│   │   │   ├── program-features
│   │   │   │   └── page.tsx
│   │   │   └── curriculum-highlights
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api
│   │   ├── admin
│   │   │   ├── domains
│   │   │   │   ├── route.ts                      ← GET list, POST create
│   │   │   │   └── [id]
│   │   │   │       └── route.ts                  ← GET detail, PUT, DELETE
│   │   │   ├── learning-levels                   ← BARU
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── resource-categories               ← BARU
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── partner-categories
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── downloadable-documents
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── external-resources
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── learning-paths
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── learning-steps                    ← BARU
│   │   │   │   ├── route.ts
│   │   │   │   ├── reorder
│   │   │   │   │   └── route.ts                  ← PUT bulk reorder
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── learning-step-actions             ← BARU
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── learning-recommendations          ← BARU
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── partner-companies
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── company-reviews
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── faqs
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── internship-stats
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── internship-timelines
│   │   │   │   ├── route.ts
│   │   │   │   ├── reorder
│   │   │   │   │   └── route.ts                  ← PUT bulk reorder
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── program-features
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── curriculum-highlights
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   └── dashboard
│   │   │       └── route.ts                      ← BARU: overview stats endpoint
│   │   │
│   │   └── auth / learning / internship / ...    ← API publik (jangan diubah)
│   │
│   ├── learning / prakerin / login / ...         ← Halaman publik (jangan diubah)
│   └── globals.css / layout.tsx / ...
│
├── components
│   ├── features
│   │   └── admin
│   │       ├── AdminCard.tsx                     ← sudah ada
│   │       ├── AdminPageHeader.tsx               ← sudah ada
│   │       ├── AdminSidebar.tsx                  ← sudah ada, akan diganti total
│   │       ├── DataTable.tsx                     ← sudah ada, akan diupdate
│   │       ├── DeleteConfirmDialog.tsx           ← sudah ada
│   │       ├── FormModal.tsx                     ← sudah ada, akan diupdate
│   │       ├── index.ts
│   │       ├── Topbar.tsx                        ← BARU
│   │       ├── IconPicker.tsx                    ← BARU
│   │       ├── TagInput.tsx                      ← BARU
│   │       ├── Dropdown.tsx                      ← BARU
│   │       ├── StatusBadge.tsx                   ← BARU
│   │       ├── Toast.tsx                         ← BARU
│   │       ├── BulkActionBar.tsx                 ← BARU
│   │       ├── StatsCard.tsx                     ← BARU
│   │       └── RecentActivity.tsx                ← BARU
│   │
│   ├── common / layout / providers / ...         ← Komponen publik (jangan diubah)
│   │
│   └── ui
│       ├── EmptyState.tsx                        ← sudah ada, reuse untuk admin
│       ├── Badge.tsx                             ← sudah ada, reuse untuk admin
│       ├── Button.tsx                            ← sudah ada, reuse untuk admin
│       └── ...                                   ← komponen UI lain (jangan diubah)
│
├── auth.ts                                       ← NextAuth config (sudah ada)
├── refer
│   ├── html                                      ← Export HTML dari Stitch (READ ONLY)
│   │   ├── dashboard-overview.html
│   │   ├── data-table.html
│   │   ├── form-page.html
│   │   └── learning-step-manager.html
│   └── CONTEXT.md                                ← File ini
└── prisma
    └── schema.prisma
```

> **Keterangan:**
> - `← BARU` = belum ada, perlu dibuat
> - `← sudah ada` = file sudah ada, perhatikan apakah perlu diupdate atau cukup reuse
> - Folder/file tanpa keterangan = sudah ada dan tidak perlu diubah
> - **Jangan sentuh** halaman publik (`/learning`, `/prakerin`, dll) dan API publik (`/api/learning`, `/api/internship`, dll)

---

## Referensi UI

Folder `/refer/html/` berisi file HTML export dari Google Stitch sebagai referensi visual.

**Cara menggunakan referensi:**
- Style SideBar mengikuti admin_dashboard_overview.html
- Ikuti layout, warna, spacing, dan komponen yang ada di file HTML tersebut
- Sesuaikan dengan style Tailwind yang sudah ada di project
- **Jangan implementasi elemen UI yang tidak ada datanya di schema** (hapus/abaikan saja)
- File HTML ini adalah referensi visual, bukan kode yang harus di-copy

---

## Database Schema (Ringkasan Relasi)

```
domains
  └── learning_paths (domainId)
        ├── learning_path_topics (learningPathId)
        ├── learning_path_prerequisites (learningPathId)
        ├── learning_recommendations (learningPathId)
        └── learning_steps (learningPathId)
              └── learning_step_actions (learningStepId)

learning_levels
  └── learning_paths (levelId)

resource_categories
  ├── external_resources (categoryId)
  ├── learning_recommendations (categoryId)
  └── learning_step_actions (categoryId)

partner_companies
  ├── partner_company_categories (companyId) ← many-to-many dengan partner_categories
  └── company_reviews (partnerCompanyId)

-- Tabel standalone (tidak ada relasi parent):
domains, learning_levels, resource_categories, partner_categories,
frequently_asked_questions, internship_stats, internship_timelines,
program_features, curriculum_highlights, downloadable_documents
```

> **Selalu cek relasi ini sebelum membuat form atau API route.**
> Pastikan field foreign key terisi dengan benar dan ada dropdown/select yang sesuai.

---

## Aturan Pengerjaan

1. **Baca file ini lebih dulu** sebelum mengerjakan task apapun
2. **Cek `prisma/schema.prisma`** untuk memastikan field yang diimplementasi sesuai
3. **Reuse komponen admin** dari `/components/features/admin/` — jangan buat ulang
4. **Reuse komponen UI umum** dari `/components/ui/` (Badge, Button, EmptyState, dll) bila relevan
5. **Jangan sentuh** halaman publik dan komponen di luar folder `admin`
6. **Jangan install package baru** tanpa konfirmasi eksplisit
7. **API Routes admin** semua di bawah `/app/api/admin/` mengikuti pola REST di struktur folder
8. **Tidak ada hardcoded data** — semua data dari database via Prisma
9. **Tailwind only** — tidak ada inline style kecuali untuk nilai dinamis (warna dari DB, dll)
10. **Setiap form harus validasi** field required sebelum submit
11. Jika ada bagian dari referensi UI Stitch yang **tidak relevan dengan schema**, abaikan saja

---

## Progress Pengerjaan

### ✅ Tahap 0 — Setup & Layout Shell
- [x] Hapus folder admin lama
- [x] Buat struktur folder baru
- [x] Buat AdminLayout (Sidebar + Topbar)
- [x] Buat reusable UI components (DataTable, FormModal, IconPicker, dll)
- [x] Dashboard Overview page
- [x] Test layout & routing

### ✅ Tahap 1 — Data Master
- [x] Domains
- [x] Learning Levels
- [x] Resource Categories
- [x] Partner Categories
- [x] External Resources
- [x] Downloadable Documents

### ✅ Tahap 2 — Learning Path (All Menu)
- [x] Learning Paths CRUD
- [x] Learning Step Manager (split panel)
- [x] Step Actions (drawer/modal)
- [x] Learning Path Topics & Prerequisites (tag input)
- [x] Learning Recommendations

### 🔲 Tahap 3 — Prakerin & Company
- [ ] Partner Companies
- [ ] Partner Company Categories (many-to-many)
- [ ] Company Reviews
- [ ] FAQ
- [ ] Internship Stats
- [ ] Internship Timelines
- [ ] Program Features
- [ ] Curriculum Highlights

---

## Catatan Tambahan

- Icon field di beberapa tabel menyimpan **nama icon Material Symbols** sebagai string (contoh: `play_circle`, `rocket_launch`, `cable`). Gunakan komponen `IconPicker` untuk field ini.
- Field `color` di beberapa tabel menyimpan nama warna sebagai string (contoh: `blue`, `green`, `red`). Render sebagai color swatch + text.
- Tabel `partner_company_categories` adalah junction table many-to-many — kelola lewat halaman Partner Companies dengan multi-select checkbox.
- `learning_steps` punya field `order` (integer) — harus bisa di-reorder dengan drag and drop.
- `internship_timelines` juga punya field `order` — sama, harus bisa di-reorder.