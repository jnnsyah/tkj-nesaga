"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface FieldConfig {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox" | "tags";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface FormModalBaseProps {
  title: string;
  isLoading?: boolean;
  loading?: boolean; // alias for backwards compat
  onClose: () => void;
}

interface FormModalChildrenProps extends FormModalBaseProps {
  isOpen: boolean;
  onSubmit: (e?: React.FormEvent) => void;
  children: React.ReactNode;
  // Old API props NOT used
  open?: never;
  fields?: never;
  initialData?: never;
}

interface FormModalFieldsProps extends FormModalBaseProps {
  open: boolean;
  onSubmit: (formData: Record<string, unknown>) => void;
  fields: FieldConfig[];
  initialData?: Record<string, unknown>;
  // New API props NOT used
  isOpen?: never;
  children?: never;
}

type FormModalProps = FormModalChildrenProps | FormModalFieldsProps;

export function FormModal(props: FormModalProps) {
  const {
    title,
    onClose,
  } = props;

  const isLoading = props.isLoading ?? props.loading ?? false;
  const isOpen = 'isOpen' in props && props.isOpen !== undefined ? props.isOpen : ('open' in props ? props.open : false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine if using children or fields mode
  if ('fields' in props && props.fields) {
    return <FieldsFormModal {...props} isLoading={isLoading} />;
  }

  // Children mode
  const childrenProps = props as FormModalChildrenProps;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 styled-scrollbars">
          {childrenProps.children}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200/80 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => childrenProps.onSubmit()}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ffd900] text-[#301934] text-sm font-bold shadow-md shadow-[#ffd900]/20 hover:bg-[#ffd900]/90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
            {isLoading ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Old-style FormModal with fields prop
function FieldsFormModal(props: FormModalFieldsProps & { isLoading: boolean }) {
  const { title, onClose, onSubmit, fields, initialData, isLoading } = props;
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      const empty: Record<string, unknown> = {};
      fields.forEach((f) => { empty[f.key] = ""; });
      setFormData(empty);
    }
  }, [initialData, fields]);

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={!isLoading ? onClose : undefined} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} disabled={isLoading} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 styled-scrollbars">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] resize-none"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] bg-white"
                  >
                    <option value="">Pilih...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(formData[field.key])}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#ffd900] focus:ring-[#ffd900]"
                  />
                ) : (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) => handleChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200/80 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button
            type="button"
            onClick={() => onSubmit(formData)}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ffd900] text-[#301934] text-sm font-bold shadow-md shadow-[#ffd900]/20 hover:bg-[#ffd900]/90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
            {isLoading ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
