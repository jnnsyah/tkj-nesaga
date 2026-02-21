"use client";

import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    description?: string;
}

interface ToastContextValue {
    toast: (options: Omit<Toast, "id">) => void;
    success: (message: string, description?: string) => void;
    error: (message: string, description?: string) => void;
    info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const value = {
        toast: addToast,
        success: (message: string, description?: string) => addToast({ type: "success", message, description }),
        error: (message: string, description?: string) => addToast({ type: "error", message, description }),
        info: (message: string, description?: string) => addToast({ type: "info", message, description }),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 p-4 pointer-events-none md:bottom-8 md:right-8">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onClose={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: "check_circle",
        error: "error",
        info: "info",
    };

    const colors = {
        success: "bg-white text-green-700 border-green-200 shadow-green-900/10",
        error: "bg-white text-red-700 border-red-200 shadow-red-900/10",
        info: "bg-white text-blue-700 border-blue-200 shadow-blue-900/10",
    };

    return (
        <div
            className={cn(
                "pointer-events-auto flex items-start gap-3 w-full md:w-[380px] p-4 rounded-xl border shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-300",
                colors[toast.type]
            )}
        >
            <span className={cn("material-symbols-outlined shrink-0 text-[24px]",
                toast.type === 'success' && "text-green-500",
                toast.type === 'error' && "text-red-500",
                toast.type === 'info' && "text-blue-500"
            )}>
                {icons[toast.type]}
            </span>
            <div className="flex-1 mt-0.5">
                <h4 className="text-sm font-bold text-slate-800">{toast.message}</h4>
                {toast.description && <p className="text-xs font-medium opacity-80 mt-1">{toast.description}</p>}
            </div>
            <button
                onClick={onClose}
                className="shrink-0 p-1 -mr-2 -mt-2 rounded-lg opacity-50 hover:opacity-100 hover:bg-black/5 transition-all text-slate-600"
            >
                <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
        </div>
    );
}
