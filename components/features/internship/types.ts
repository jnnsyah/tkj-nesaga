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
  categories: PartnerCategory[];
  verified: boolean;
  address: string;
  phone?: string | null;
  email?: string | null;
  mapsUrl?: string | null;
  reviews: Review[];
  // description text removed as requested
}

export interface Review {
  name: string;
  role: string;
  initial: string;
  rating: number;
  text: string;
}

export interface PartnerCategory {
  id: number;
  title: string;
  icon: string;
  subtitle: string;
}
