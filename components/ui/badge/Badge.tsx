import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-secondary/5 text-secondary dark:text-primary",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  primary: "bg-primary/20 text-secondary dark:text-primary",
  secondary: "bg-secondary text-primary"
} as const;

type Variant = keyof typeof variantClasses;

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Badge component with color variants
 */
export function Badge({
  variant = "default",
  children,
  className = ""
}: BadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {children}
    </span>
  );
}
