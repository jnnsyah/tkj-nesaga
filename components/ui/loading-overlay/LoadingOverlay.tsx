import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string; // ClassName for the overlay container
  spinnerClassName?: string; // ClassName for the spinner itself
  size?: "sm" | "md" | "lg" | "xl";
  visible: boolean;
  blur?: boolean; // Option to blur background
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
  xl: "w-16 h-16 border-4",
} as const;

export function LoadingOverlay({
  className,
  spinnerClassName,
  size = "md",
  visible,
  blur = true
}: LoadingProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-background/50",
        blur && "backdrop-blur-sm",
        className
      )}
    >
      <div
        aria-label="Loading"
        role="status"
        className={cn(
          "rounded-full animate-spin border-muted border-t-primary",
          sizeClasses[size],
          spinnerClassName
        )}
      />
    </div>
  );
}
