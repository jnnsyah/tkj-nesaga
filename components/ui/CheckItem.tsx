import { cn } from "@/lib/utils";
import Icon from "./Icon";

interface CheckItemProps {
  children: React.ReactNode;
  iconColor?: string;
  className?: string;
}

/**
 * Check list item with icon and text
 */
export default function CheckItem({
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
