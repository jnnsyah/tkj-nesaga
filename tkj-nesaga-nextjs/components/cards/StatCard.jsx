/**
 * Stat card displaying a metric value and label
 * @param {string} value - Stat value (e.g., "50+", "100%")
 * @param {string} label - Stat label
 */
export default function StatCard({ value, label }) {
    return (
        <div className="p-6 rounded-2xl bg-secondary/5 border border-dashed border-secondary/20 flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl font-black text-primary mb-2">{value}</h3>
            <p className="font-bold text-secondary dark:text-white">{label}</p>
        </div>
    );
}
