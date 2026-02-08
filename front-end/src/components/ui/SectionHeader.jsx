import { cn } from "@/lib/utils";
import Badge from "./Badge";

/**
 * Section header with title, optional subtitle, and badge
 * @param {string} title - Main heading text
 * @param {string} subtitle - Optional description
 * @param {string} badge - Optional badge text
 * @param {boolean} centered - Center align text
 */
export default function SectionHeader({
    title,
    subtitle,
    badge,
    centered = false,
    className = ""
}) {
    return (
        <div className={cn(centered && "text-center", "mb-8", className)}>
            {badge && (
                <Badge variant="default" className="mb-4 inline-block">
                    {badge}
                </Badge>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className={cn(
                    "text-muted-foreground leading-relaxed",
                    centered && "max-w-2xl mx-auto"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
