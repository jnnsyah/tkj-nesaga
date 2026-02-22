import { LoadingOverlay } from "@/components/ui/loading-overlay";

export function WithLoading({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}
