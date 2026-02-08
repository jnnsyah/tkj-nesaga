import { cn } from "@/lib/utils";

const variantClasses = {
    default: "bg-secondary/5 text-secondary dark:text-primary",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    primary: "bg-primary/20 text-secondary dark:text-primary",
    secondary: "bg-secondary text-primary"
};

/**
 * Badge component with color variants
 * @param {string} variant - Color variant: default, blue, green, orange, primary, secondary
 * @param {string} children - Badge content
 */
export default function Badge({
    variant = "default",
    children,
    className = ""
}) {
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
