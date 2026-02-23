"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface ContentItem {
    name: string;
    value: number;
    color: string;
}

interface ContentDonutChartProps {
    data: ContentItem[];
}

function CustomTooltip({
    active,
    payload,
}: {
    active?: boolean;
    payload?: Array<{ payload: ContentItem }>;
}) {
    if (!active || !payload || !payload[0]) return null;
    const item = payload[0].payload;
    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
                <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-bold text-slate-800">{item.name}</span>
            </div>
            <p className="text-xs text-slate-500">
                Jumlah: <span className="font-bold text-slate-700">{item.value}</span>
            </p>
        </div>
    );
}

export function ContentDonutChart({ data }: ContentDonutChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <p className="text-sm">Belum ada data konten.</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full" style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-slate-800">{total}</span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Total
                    </span>
                </div>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-medium text-slate-600">
                            {item.name}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                            ({item.value})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
