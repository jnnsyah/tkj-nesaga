export interface PartnerCategory {
  icon: string;
  title: string;
  subtitle: string;
}

/**
 * Partner company category definitions with icons and descriptions.
 */
export const partnerCategories: PartnerCategory[] = [
  {
    icon: "wifi_tethering",
    title: "ISP",
    subtitle: "Internet Service Provider"
  },
  {
    icon: "storefront",
    title: "Retail",
    subtitle: "Toko Komputer & Aksesoris"
  },
  {
    icon: "build",
    title: "Service",
    subtitle: "Perbaikan Hardware"
  },
  {
    icon: "apartment",
    title: "Instansi",
    subtitle: "Pemerintahan & Kantor"
  }
];
