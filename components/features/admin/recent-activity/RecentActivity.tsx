"use client";

interface RecentActivityItem {
    name: string;
    module: string;
    updatedAt: string;
}

interface RecentActivityProps {
    items: RecentActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-50">history</span>
                <p className="text-sm font-medium">Belum ada aktivitas terbaru.</p>
            </div>
        );
    }

    // Define module colors/icons for better UI
    const getModuleStyle = (moduleName: string) => {
        const map: Record<string, { icon: string, bg: string, text: string }> = {
            "Mitra": { icon: "business", bg: "bg-blue-50", text: "text-blue-600" },
            "Learning Path": { icon: "route", bg: "bg-green-50", text: "text-green-600" },
            "Dokumen": { icon: "description", bg: "bg-orange-50", text: "text-orange-600" },
            "FAQ": { icon: "help", bg: "bg-purple-50", text: "text-purple-600" }
        };

        // Default match if no specific style
        for (const key in map) {
            if (moduleName.toLowerCase().includes(key.toLowerCase())) {
                return map[key];
            }
        }

        return { icon: "change_history", bg: "bg-slate-100", text: "text-slate-600" };
    };

    return (
        <div className="overflow-hidden">
            <table className="w-full min-w-[500px] text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100">
                        <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Nama Data
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Modul
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">
                            Terakhir Update
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-600">
                    {items.slice(0, 5).map((item, idx) => {
                        const style = getModuleStyle(item.module);
                        return (
                            <tr
                                key={idx}
                                className="group border-b border-slate-50 hover:bg-slate-50/80 transition-colors last:border-0"
                            >
                                <td className="py-4 px-4 font-bold text-slate-800">
                                    {item.name}
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-md ${style.bg} ${style.text}`}>
                                            <span className="material-symbols-outlined text-[14px]">
                                                {style.icon}
                                            </span>
                                        </span>
                                        <span className="font-medium text-slate-700">
                                            {item.module}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-right text-slate-500 font-medium">
                                    {new Date(item.updatedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }).replace(/\./g, ':')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
