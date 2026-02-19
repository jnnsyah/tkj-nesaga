"use client";

import { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete Record",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
  loading = false,
}: DeleteConfirmDialogProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
            <Icon name="warning" size="md" className="text-destructive" />
          </div>
          <h2 className="text-lg font-bold text-secondary dark:text-white font-display">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-destructive text-destructive-foreground hover:brightness-110 shadow-md transition-all disabled:opacity-50"
          >
            <Icon name="delete" size="sm" />
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
