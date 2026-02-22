// Schema migration: categories now accessed through explicit junction table (c.category)
import { cn } from "@/lib/utils";
import { Icon } from "@/components";
import { ReviewCard } from "@/components";
import { CategoryBadge } from "./CategoryBadge";
import { type PartnerCompany } from "./types";

interface CompanyDetailProps {
  company?: PartnerCompany;
  onClose?: () => void;
  mobileFullscreen?: boolean;
  isDragging?: boolean;
}

import { ContactItem } from "./ContactItem";
import { SectionTitle } from "./SectionTitle";

export function CompanyDetail({ company, onClose, mobileFullscreen = false, isDragging = false }: CompanyDetailProps) {
  if (!company) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center h-full text-muted-foreground",
        mobileFullscreen ? "bg-card rounded-3xl shadow-2xl" : ""
      )}>
        <Icon name="touch_app" size="2xl" className="mb-4 opacity-50" />
        <p>Pilih tempat prakerin untuk melihat detail</p>
      </div>
    );
  }

  const { name, verified, address, phone, email, reviews } = company;
  const rootClass = mobileFullscreen
    ? "w-full h-full bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    : "flex-1 overflow-hidden";

  return (
    <div className={rootClass} role="dialog" aria-modal={mobileFullscreen ? "true" : "false"}>
      {/* Drag Handle */}
      <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
        <div className={cn(
          "h-1.5 rounded-full transition-all",
          isDragging ? "w-16 bg-primary/40" : "w-12 bg-muted-foreground/20"
        )} />
      </div>

      {/* Header Section */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[...company.categories]
                .sort((a, b) => {
                  const idA = a.category?.id ?? 0;
                  const idB = b.category?.id ?? 0;
                  return idA - idB;
                })
                .map((c) => (
                  <CategoryBadge
                    key={c.category?.id || c.category?.title}
                    title={c.category?.title}
                    icon={c.category?.icon}
                  />
                ))}
            </div>

            {/* Company Name + Verified */}
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-2xl font-bold text-foreground">{name}</h2>
              {verified && <Icon name="verified" className="text-primary shrink-0" />}
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-muted-foreground mb-4">
              <Icon name="location_on" size="md" className="shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">{address}</p>
            </div>

            {/* Contact Info + Rute Maps Button */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Rute Maps Button */}
              {company.mapsUrl && (
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full transition-all hover:shadow-md active:scale-95 group"
                >
                  <ContactItem icon="navigation" value="Buka Maps" />
                </a>
              )}

              {/* Phone */}
              {phone && <ContactItem icon="call" value={phone} />}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Reviews Section */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {reviews && reviews.length > 0 ? (
          <div>
            <SectionTitle icon="star" title={`Ulasan (${reviews.length})`} />
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <ReviewCard key={idx} {...review} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground/60 text-sm">
            Kakak kelas belum memberikan ulasan :(
          </div>
        )}
      </div>
    </div>
  );
}
