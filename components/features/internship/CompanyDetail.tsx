import { cn } from "@/lib/utils";
import { Icon } from "@/components";
import { ReviewCard } from "@/components";
import { CategoryBadge } from "./CategoryBadge";
import { type PartnerCompany } from "./types";

interface CompanyDetailProps {
  company?: PartnerCompany;
  onClose?: () => void;
  mobileFullscreen?: boolean;
}

/**
 * Company detail view for Prakerin page
 */
export default function CompanyDetail({ company, onClose, mobileFullscreen = false }: CompanyDetailProps) {
  // If no company selected, show placeholder (this can appear in desktop split view)
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

  // Root wrapper classes - jika mobileFullscreen, gunakan full-screen styling
  const rootClass = mobileFullscreen
    ? "w-full h-full bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    : "flex-1 overflow-hidden";

  return (
    <div className={rootClass} role="dialog" aria-modal={mobileFullscreen ? "true" : "false"}>
      {/* Drag Handle (Mobile only visual cue, or for desktop sheet header) */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
      </div>

      {/* Header */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {company.categories.map((cat) => (
                <CategoryBadge key={cat.id} title={cat.title} icon={cat.icon} />
              ))}
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-foreground">
                {name}
              </h2>
              {verified && (
                <Icon
                  name="verified"
                  className="text-primary shrink-0"
                />
              )}
            </div>

            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <Icon name="map-pin" className="w-4 h-4" />
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Actions */}
      <div className="px-6 pb-4 border-b border-border bg-background/95 backdrop-blur z-10 sticky top-0">
        <div className="grid grid-cols-1 gap-3">
          {company.mapsUrl && (
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground font-semibold py-3 px-4 rounded-xl transition-colors border border-secondary/20"
            >
              <Icon name="navigation" className="w-5 h-5" />
              Rute Maps
            </a>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {/* Contact Info */}
        <div className="mb-8 space-y-3">
          {(phone || email) && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-xl border border-border/50">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4" />
                Kontak Kami
              </h4>
              <div className="grid gap-3">
                {phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center border text-muted-foreground">
                      <Icon name="phone" className="w-4 h-4" />
                    </span>
                    <span className="font-medium">{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center border text-muted-foreground">
                      <Icon name="mail" className="w-4 h-4" />
                    </span>
                    <span className="font-medium">{email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reviews */}
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
            Belum ada ulasan untuk tempat ini.
          </div>
        )}
      </div>
    </div>
  );
}

// Helper: Section title with icon
interface SectionTitleProps {
  icon: string;
  title: string;
}

function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <h4 className="font-bold text-md mb-3 flex items-center gap-2 text-foreground">
      <Icon name={icon} className="text-primary" />
      {title}
    </h4>
  );
}
