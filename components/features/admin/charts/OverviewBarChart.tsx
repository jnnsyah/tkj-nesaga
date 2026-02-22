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
    Cell,
} from "recharts";

interface LearningByLevelItem {
    level: string;
    published: number;
    draft: number;
    color: string;
}

interface LearningByDomainItem {
    domain: string;
    count: number;
    color: string;
}

interface LearningChartProps {
    byLevel: LearningByLevelItem[];
    byDomain: LearningByDomainItem[];
}

function CustomTooltipLevel({
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
                        {entry.dataKey === "published" ? "Published" : "Draft"}:
                    </span>
                    <span className="font-bold text-slate-800">{entry.value}</span>
                </div>
            ))}
        </div>
    );
}

function CustomTooltipDomain({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: Array<{ value: number; payload: LearningByDomainItem }>;
    label?: string;
}) {
    if (!active || !payload || !payload[0]) return null;
    return (
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
            <p className="text-xs text-slate-500">
                Learning Paths: <span className="font-bold text-slate-700">{payload[0].value}</span>
            </p>
        </div>
    );
}

export function LearningChart({ byLevel, byDomain }: LearningChartProps) {
    const hasLevelData = byLevel && byLevel.length > 0;
    const hasDomainData = byDomain && byDomain.length > 0;

    if (!hasLevelData && !hasDomainData) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400">
                <p className="text-sm">Belum ada data learning path.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Learning Paths by Level — stacked bar */}
            {hasLevelData && (
                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Per Level
                    </p>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={byLevel} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="level"
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
                            <Tooltip content={<CustomTooltipLevel />} />
                            <Legend
                                formatter={(value: string) => (
                                    <span className="text-xs font-semibold text-slate-600">
                                        {value === "published" ? "Published" : "Draft"}
                                    </span>
                                )}
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: 12 }}
                            />
                            <Bar
                                dataKey="published"
                                stackId="a"
                                fill="#10b981"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={48}
                            />
                            <Bar
                                dataKey="draft"
                                stackId="a"
                                fill="#cbd5e1"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={48}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Learning Paths by Domain — horizontal bar */}
            {hasDomainData && (
                <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Per Domain
                    </p>
                    <ResponsiveContainer width="100%" height={Math.max(160, byDomain.length * 48)}>
                        <BarChart
                            data={byDomain}
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
                                dataKey="domain"
                                tick={{ fontSize: 13, fill: "#475569", fontWeight: 600 }}
                                axisLine={false}
                                tickLine={false}
                                width={120}
                            />
                            <Tooltip content={<CustomTooltipDomain />} />
                            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
                                {byDomain.map((entry, i) => (
                                    <Cell key={i} fill={entry.color || "#8b5cf6"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
