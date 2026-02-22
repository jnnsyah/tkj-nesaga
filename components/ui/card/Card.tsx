import { cn } from "@/lib/utils";

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
} as const;

type PaddingSize = keyof typeof paddingClasses;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
  padding?: PaddingSize;
}

/**
 * Base Card component with consistent styling
 */
export function Card({
  children,
  className = "",
  hoverable = true,
  bordered = true,
  padding = "md",
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl transition-all",
        bordered && "border border-border",
        hoverable && "hover:shadow-md hover:border-primary/50",
        onClick && "cursor-pointer",
        paddingClasses[padding] || paddingClasses.md,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
