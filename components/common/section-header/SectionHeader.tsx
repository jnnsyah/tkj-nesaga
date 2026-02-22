import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Section header with title, optional subtitle, and badge
 */
export function SectionHeader({
  title,
  subtitle,
  badge,
  centered = false,
  className = ""
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-8", className)}>
      {badge && (
        <Badge variant="default" className="mb-4 inline-block">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <div className={cn(
          "text-muted-foreground leading-relaxed",
          centered && "max-w-2xl mx-auto"
        )}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
