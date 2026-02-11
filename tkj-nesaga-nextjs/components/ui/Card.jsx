import { cn } from "@/lib/utils";

/**
 * Base Card component with consistent styling
 * @param {boolean} hoverable - Enable hover effects
 * @param {boolean} bordered - Add border
 * @param {string} padding - Padding size: sm, md, lg
 */
export default function Card({
    children,
    className = "",
    hoverable = true,
    bordered = true,
    padding = "md",
    onClick,
    ...props
}) {
    const paddingClasses = {
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
    };

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
