import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface AdminCardProps {
  title: string;
  value: string | number;
  icon: string;
  className?: string;
}

export function AdminCard({ title, value, icon, className }: AdminCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-6 flex items-center gap-4 hover:shadow-md hover:border-primary/50 transition-all",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon name={icon} size="lg" className="text-primary" />
      </div>
      <div>
        <p className="text-2xl font-bold text-secondary dark:text-white font-display">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      </div>
    </div>
  );
}
