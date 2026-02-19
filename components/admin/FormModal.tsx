"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox" | "tags";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void;
  title: string;
  fields: FieldConfig[];
  initialData?: Record<string, unknown>;
  loading?: boolean;
}

export default function FormModal({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  initialData,
  loading = false,
}: FormModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, unknown> = {};

    fields.forEach((field) => {
      if (field.type === "checkbox") {
        data[field.key] = formData.get(field.key) === "on";
      } else if (field.type === "number") {
        const val = formData.get(field.key);
        data[field.key] = val ? Number(val) : undefined;
      } else if (field.type === "tags") {
        const val = formData.get(field.key) as string;
        data[field.key] = val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
      } else {
        data[field.key] = formData.get(field.key) || "";
      }
    });

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-secondary dark:text-white font-display">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <Icon name="close" size="md" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-secondary dark:text-white mb-1.5 uppercase tracking-wider">
                {field.label}
                {field.required && <span className="text-destructive ml-0.5">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  defaultValue={String(initialData?.[field.key] ?? "")}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.key}
                  defaultValue={String(initialData?.[field.key] ?? "")}
                  required={field.required}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select…</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={field.key}
                    defaultChecked={Boolean(initialData?.[field.key])}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground">{field.placeholder || "Yes"}</span>
                </label>
              ) : field.type === "tags" ? (
                <input
                  type="text"
                  name={field.key}
                  defaultValue={Array.isArray(initialData?.[field.key]) ? (initialData[field.key] as string[]).join(", ") : String(initialData?.[field.key] ?? "")}
                  placeholder={field.placeholder || "Comma-separated values"}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  name={field.key}
                  defaultValue={String(initialData?.[field.key] ?? "")}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              )}
            </div>
          ))}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="check"
            iconPosition="left"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={loading}
          >
            {loading ? "Saving…" : initialData ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
