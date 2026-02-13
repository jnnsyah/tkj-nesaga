export interface StatItem {
  value: string;
  label: string;
}

export const internshipStats: StatItem[] = [
  { value: "50+", label: "Mitra Industri" },
  { value: "100%", label: "Tersalurkan" },
  { value: "6 Bulan", label: "Durasi Magang" }
];

export interface PartnerCategory {
  icon: string;
  title: string;
  subtitle: string;
}

export interface Review {
  name: string;
  role: string;
  initial: string;
  rating: number;
  text: string;
}

export interface PartnerCompany {
  id: number;
  name: string;
  category: string;
  verified: boolean;
  address: string;
  phone: string;
  email: string;
  shortDesc: string;
  description: string;
  reviews: Review[];
  website?: string;
}
