import { Badge, Icon } from "@/components";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
    title: string;
    icon: string;
    className?: string;
}

const getCategoryColor = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("isp")) return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900";
    if (lowerTitle.includes("retail")) return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900";
    if (lowerTitle.includes("service")) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900";
    if (lowerTitle.includes("instansi")) return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900";

    // Default fallback
    return "bg-secondary/10 text-secondary-foreground border-border";
};

export function CategoryBadge({ title, icon, className }: CategoryBadgeProps) {
    const colorClass = getCategoryColor(title);

    return (
        <div
            className={cn(
                // Tambahkan flex-shrink-0 pada container jika perlu
                "inline-flex items-center justify-center gap-3 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                colorClass,
                className
            )}
        >
            {/* Pastikan icon memiliki ukuran yang pas, coba naikkan ke w-3.5 */}
            <Icon name={icon} className="w-3.5 h-3.5 flex-shrink-0 relative -top-[4px]" />
            
            {/* Tambahkan leading-none agar teks benar-benar di tengah secara vertikal */}
            <span className="leading-none">{title}</span>
        </div>
    );
}
