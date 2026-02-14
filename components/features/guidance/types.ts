export interface DownloadableDocument {
  title: string;
  ext: string;
  icon: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export interface TimelineItem {
  icon: string;
  title: string;
  description: string;
  size: 'normal' | 'large';
  highlight?: boolean;
}
