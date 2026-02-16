import { cn } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";
import { Icon } from "@/components";
import { type PartnerCompany } from "./types";

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
  const { name, categories, verified } = company;

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-2xl border cursor-pointer transition-all duration-300 group h-fit relative overflow-hidden",
        isSelected
          ? "bg-card border-l-8 border-l-primary shadow-lg border-y-border border-r-border"
          : "bg-card/50 border-border hover:border-primary/50 hover:shadow-md active:scale-95",
        isGridView && "bg-card hover:-translate-y-1"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <CategoryBadge
              key={cat.id || cat.title}
              title={cat.title}
              icon={cat.icon}
            />
          ))}
        </div>
        {verified && (
          <Icon
            name="verified"
            className="text-primary shrink-0 ml-2"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        <Icon
          name="chevron_right"
          className={cn(
            "text-muted-foreground transition-transform duration-300",
            isSelected ? "translate-x-1 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
          )}
        />
      </div>
    </div>
  );
}
