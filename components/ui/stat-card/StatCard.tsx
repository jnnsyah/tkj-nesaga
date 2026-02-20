interface StatCardProps {
  value: string;
  label: string;
}

/**
 * Stat card displaying a metric value and label
 */
export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
      <h3 className="text-4xl font-black text-primary mb-2">{value}</h3>
      <p className="font-bold text-secondary dark:text-white">{label}</p>
    </div>
  );
}
