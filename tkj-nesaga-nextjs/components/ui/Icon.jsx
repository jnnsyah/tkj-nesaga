"use client"

import { cn } from "@/lib/utils";

/**
 * Material Symbols icon wrapper with consistent styling
 * @param {string} name - Icon name from Material Symbols
 * @param {string} className - Additional classes
 * @param {string} size - Size variant: 'sm', 'md', 'lg', 'xl'
 */
export default function Icon({
    name,
    className = "",
    size = "md",
    filled = false
}) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-2xl",
        xl: "text-4xl",
        "2xl": "text-5xl"
    };

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
