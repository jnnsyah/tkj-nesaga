export interface DownloadableDocument {
  title: string;
  ext: string;
  icon: string;
  href: string;
}

/**
 * Downloadable document templates for internship.
 */
export const downloadableDocuments: DownloadableDocument[] = [
  {
    title: "Template Laporan",
    ext: ".DOCX",
    icon: "description",
    href: "#"
  },
  {
    title: "Contoh CV ATS",
    ext: ".DOCX",
    icon: "description",
    href: "#"
  },
  {
    title: "Catatan Kegiatan",
    ext: ".DOCX",
    icon: "description",
    href: "#"
  }
];
