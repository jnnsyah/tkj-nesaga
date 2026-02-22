"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface MonthlyTrend {
    month: string;
    learningPaths: number;
    achievements: number;
    resources: number;
    reviews: number;
}

interface OverviewBarChartProps {
    data: MonthlyTrend[];
}

const COLORS = {
    learningPaths: "#8b5cf6",
    achievements: "#f59e0b",
    resources: "#3b82f6",
    reviews: "#ec4899",
};

const LABELS: Record<string, string> = {
    learningPaths: "Learning Paths",
    achievements: "Prestasi",
    resources: "Resources",
    reviews: "Reviews",
};

function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ color: string; dataKey: string; value: number }>;
    label?: string;
}) {
    if (!active || !payload) return null;
    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-2">{label}</p>
            {payload.map((entry, i) => (
                <div key={i} className="flex items-center gap-2 text-xs mb-1">
                    <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-slate-600">
                        {LABELS[entry.dataKey] || entry.dataKey}:
                    </span>
                    <span className="font-bold text-slate-800">{entry.value}</span>
                </div>
            ))}
        </div>
    );
}

export function OverviewBarChart({ data }: OverviewBarChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <p className="text-sm">Belum ada data trend.</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    formatter={(value: string) => (
                        <span className="text-xs font-semibold text-slate-600">
                            {LABELS[value] || value}
                        </span>
                    )}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingTop: 16 }}
                />
                <Bar
                    dataKey="learningPaths"
                    fill={COLORS.learningPaths}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
                <Bar
                    dataKey="achievements"
                    fill={COLORS.achievements}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
                <Bar
                    dataKey="resources"
                    fill={COLORS.resources}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
                <Bar
                    dataKey="reviews"
                    fill={COLORS.reviews}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
