// Schema migration: Updated types to match refactored Prisma schema.
// - PartnerCompany.categories: now uses explicit junction table PartnerCompanyCategory
// - PartnerCompany.isActive: new field
// - Review: updated to match CompanyReview schema (academicYear, no role/initial/rating)

export interface StatItem {
  value: string;
  label: string;
}

export const internshipStats: StatItem[] = [
  { value: "50+", label: "Mitra Industri" },
  { value: "100%", label: "Tersalurkan" },
  { value: "6 Bulan", label: "Durasi Magang" }
];

export interface PartnerCompany {
  id: number;
  name: string;
  categories: PartnerCompanyCategory[];
  verified: boolean;
  isActive: boolean;
  address: string;
  phone?: string | null;
  email?: string | null;
  mapsUrl?: string | null;
  reviews: Review[];
}

export interface PartnerCompanyCategory {
  companyId: number;
  categoryId: number;
  category: PartnerCategory;
}

export interface Review {
  name: string;
  text: string;
  academicYear: string;
}

export interface PartnerCategory {
  id: number;
  title: string;
  icon: string;
  subtitle: string;
}
