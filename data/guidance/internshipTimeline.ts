export interface TimelineItem {
  icon: string;
  title: string;
  description: string;
  size: 'normal' | 'large';
  highlight?: boolean;
}

/**
 * Internship phase timeline (pre, during, post internship).
 */
export const internshipTimeline: TimelineItem[] = [
  {
    icon: "assignment",
    title: "Pra-Prakerin",
    description: "Fase persiapan meliputi pencarian mitra industri yang relevan, penyusunan CV & Portofolio yang menarik, serta pengurusan surat administrasi sekolah.",
    size: "normal"
  },
  {
    icon: "engineering",
    title: "Pelaksanaan",
    description: "Menjalankan tugas harian di industri, rutin mengisi jurnal kegiatan (logbook), dan senantiasa menjaga etika profesi serta budaya kerja industri.",
    size: "large",
    highlight: true
  },
  {
    icon: "school",
    title: "Pasca-Prakerin",
    description: "Penyusunan laporan akhir secara sistematis, presentasi hasil kerja di hadapan mentor industri, dan menempuh ujian sidang prakerin di sekolah.",
    size: "normal"
  }
];
