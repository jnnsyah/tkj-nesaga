import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/**
 * Timeline/Roadmap step for learning path detail
 * @param {string} title - Step title
 * @param {string} description - Step description
 * @param {string} status - Step status: available, current, locked
 * @param {boolean} isLast - Is this the last step
 * @param {Array} actions - Optional action buttons
 * @param {function} onViewReference - Click handler for main CTA
 */
export default function TimelineStep({
    title,
    description,
    status = "available",
    isLast = false,
    actions = [],
    mediaType,
    onViewReference
}) {
    const isActive = status === "current";
    const isAvailable = status === "available" || status === "current";

    return (
        <div className={cn("relative pl-10", !isLast && "pb-12")}>
            {/* Timeline dot */}
            <div className={cn(
                "absolute left-[-11px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-background z-10 flex items-center justify-center",
                isActive ? "bg-primary" : isAvailable ? "bg-primary" : "bg-muted"
            )}>
                {isActive && <div className="w-2 h-2 rounded-full bg-secondary" />}
            </div>

            {/* Content card */}
            <div className={cn(
                "bg-card rounded-xl border p-6",
                isActive ? "border-2 border-primary shadow-md hover:shadow-lg transition-all" : "border-border shadow-sm"
            )}>
                {/* Header */}
                {isAvailable && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <Badge variant={isActive ? "green" : "primary"}>
                            REFERENSI TERSEDIA
                        </Badge>
                        {mediaType && (
                            <div className="flex items-center gap-4 text-muted-foreground text-sm">
                                <span className="flex items-center gap-1">
                                    <Icon name="video_library" size="sm" />
                                    {mediaType}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Title */}
                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">
                    {title}
                </h4>

                {/* Description */}
                {description && (
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Action buttons */}
                {actions.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                        {actions.map((action, idx) => (
                            <button
                                key={idx}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary/5 hover:bg-primary hover:text-secondary transition-colors text-xs font-bold rounded-full"
                            >
                                <Icon name={action.icon} size="sm" />
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Main CTA */}
                {isAvailable && onViewReference && (
                    <Button
                        variant="secondary"
                        icon="open_in_new"
                        onClick={onViewReference}
                        className="w-full md:w-fit"
                    >
                        Lihat Referensi Belajar
                    </Button>
                )}
            </div>
        </div>
    );
}
