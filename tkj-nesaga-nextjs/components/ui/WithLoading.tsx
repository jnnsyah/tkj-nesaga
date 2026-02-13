import LoadingOverlay from "./LoadingOverlay";

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
