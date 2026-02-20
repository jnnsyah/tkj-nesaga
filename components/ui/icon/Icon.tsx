"use client"

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
  xl: "text-4xl",
  "2xl": "text-5xl"
} as const;

type IconSize = keyof typeof sizeClasses;

interface IconProps {
  name: string;
  className?: string;
  size?: IconSize;
  filled?: boolean;
}

/**
 * Material Symbols icon wrapper with consistent styling
 */
export function Icon({
  name,
  className = "",
  size = "md",
  filled = false
}: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined",
        sizeClasses[size] || sizeClasses.md,
        filled && "fill-1",
        className
      )}
    >
      {name}
    </span>
  );
}
