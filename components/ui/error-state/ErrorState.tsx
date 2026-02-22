import { cn } from "@/lib/utils";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message = "Terjadi kesalahan saat memuat data.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "col-span-full flex flex-col items-center justify-center gap-4 py-16 px-4 text-center",
        className
      )}
    >
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <span className="material-symbols-outlined text-3xl text-destructive">
          wifi_off
        </span>
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Gagal Memuat Data
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:text-white hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Coba Lagi
        </button>
      )}
    </div>
  );
}
