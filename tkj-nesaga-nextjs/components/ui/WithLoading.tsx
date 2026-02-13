import LoadingOverlay from "./LoadingOverlay";

export function WithLoading({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <LoadingOverlay visible={loading} />
    </div>
  );
}
