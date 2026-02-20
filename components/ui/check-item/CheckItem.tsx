import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

interface CheckItemProps {
  children: React.ReactNode;
  iconColor?: string;
  className?: string;
}

/**
 * Check list item with icon and text
 */
export function CheckItem({
  children,
  iconColor = "text-primary",
  className = ""
}: CheckItemProps) {
  return (
    <li className={cn("flex items-center gap-3 text-muted-foreground", className)}>
      <Icon name="check_circle" className={iconColor} size="md" />
      <span>{children}</span>
    </li>
  );
}
