"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface AchievementCategoryData {
    category: string;
    count: number;
    color: string;
}

interface AchievementChartProps {
    data: AchievementCategoryData[];
}

function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ value: number; payload: AchievementCategoryData }>;
    label?: string;
}) {
    if (!active || !payload || !payload[0]) return null;
    const item = payload[0];
    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
            <p className="text-xs text-slate-500">
                Jumlah prestasi:{" "}
                <span className="font-bold text-slate-700">{item.value}</span>
            </p>
        </div>
    );
}

export function AchievementChart({ data }: AchievementChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-48 text-slate-400">
                <p className="text-sm">Belum ada data prestasi.</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={Math.max(200, data.length * 56)}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                />
                <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 13, fill: "#475569", fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={140}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
                    {data.map((entry, i) => (
                        <Cell key={i} fill={entry.color || "#8b5cf6"} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
