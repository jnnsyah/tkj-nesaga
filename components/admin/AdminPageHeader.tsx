import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: string;
  onAction?: () => void;
}

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  actionIcon = "add",
  onAction,
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary dark:text-white font-display">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" icon={actionIcon} iconPosition="left" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
