import { cn } from "@/lib/utils";

type StatusType = 'active' | 'inactive' | 'verified' | 'highlight' | 'published' | 'draft';

interface StatusBadgeProps {
    status: StatusType;
    label?: string; // Optional override for text
}

const statusConfig: Record<StatusType, { bg: string; text: string; label: string; dot: string }> = {
    active: {
        bg: "bg-green-50",
        text: "text-green-700",
        dot: "bg-green-500",
        label: "Active",
    },
    published: {
        bg: "bg-green-50",
        text: "text-green-700",
        dot: "bg-green-500",
        label: "Published",
    },
    verified: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        dot: "bg-blue-500",
        label: "Verified",
    },
    highlight: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        dot: "bg-orange-500",
        label: "Highlight",
    },
    inactive: {
        bg: "bg-slate-100",
        text: "text-slate-600",
        dot: "bg-slate-400",
        label: "Inactive",
    },
    draft: {
        bg: "bg-slate-100",
        text: "text-slate-600",
        dot: "bg-slate-400",
        label: "Draft",
    },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide border border-current/10",
                config.bg,
                config.text
            )}
        >
            <span className={cn("w-1.5 h-1.5 rounded-full shadow-sm", config.dot)} />
            {label || config.label}
        </span>
    );
}
