// Schema migration: Action.icon replaced with Action.category.icon

import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

interface Action {
  label: string;
  to?: string;
  category?: { icon: string; color: string };
}

interface TimelineStepProps {
  title: string;
  description: string;
  isLast?: boolean;
  actions?: Action[];
  mediaType?: string;
  onViewReference?: () => void;
}

/**
 * Timeline/Roadmap step for learning path detail
 */
export default function TimelineStep({
  title,
  description,
  isLast = false,
  actions = [],
  mediaType,
  onViewReference
}: TimelineStepProps) {

  return (
    <div className={cn("relative pl-10", !isLast && "pb-12")}>
      {/* Timeline dot */}
      <div className={cn(
        "absolute left-[-11px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-background z-10 flex items-center justify-center bg-primary"
      )}>
        <div className="w-2 h-2 rounded-full bg-secondary" />
      </div>

      {/* Content card */}
      <div className={cn(
        "bg-card rounded-xl border p-6 hover:shadow-lg hover:border-primary border-border shadow-sm"
      )}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {mediaType && (
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <Icon name="video_library" size="sm" />
                {mediaType}
              </span>
            </div>
          )}
        </div>

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
                onClick={() => action.to && window.open(action.to, "_blank")}
                className="flex items-center gap-2 px-4 py-2 bg-secondary/5 hover:bg-primary hover:text-secondary transition-colors text-xs font-bold rounded-full"
              >
                <Icon name={action.category?.icon ?? "link"} size="sm" />
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
