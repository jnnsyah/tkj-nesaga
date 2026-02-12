import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { type PartnerCompany } from "@/data/internship/partnerCompanies";

interface CompanyCardProps {
  company: PartnerCompany;
  isSelected?: boolean;
  isGridView?: boolean;
  onClick?: () => void;
}

/**
 * Company card for Prakerin list view
 */
export default function CompanyCard({
  company,
  isSelected = false,
  isGridView = false,
  onClick
}: CompanyCardProps) {
  const { name, category, verified, shortDesc } = company;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] group h-fit",
        isSelected
          ? "bg-card border-l-8 border-l-primary shadow-lg border-y-border border-r-border"
          : "bg-card/50 border-border hover:border-primary/50",
        isGridView && "hover:shadow-md bg-card"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <Badge variant="secondary" className="text-[10px]">
          {category}
        </Badge>
        {verified && (
          <Icon
            name="verified"
            className="text-primary"
          />
        )}
      </div>
      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2">
        {shortDesc}
      </p>
    </div>
  );
}
