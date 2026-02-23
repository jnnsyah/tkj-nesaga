"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  AdminPageHeader,
  DataTable,
  FormModal,
  DeleteConfirmDialog,
  Switch,
  useToast,
} from "@/components/features/admin";
import type { Column } from "@/components/features/admin";

interface UserRecord {
  id: string;
  email: string;
  fullName: string | null;
  role: "ADMIN" | "SUPERADMIN";
  status: "PENDING" | "ACTIVE";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  [key: string]: unknown;
}

const API = "/api/admin/users";

export default function UserManagementPage() {
  const { data: session } = useSession();
  const currentUserRole = (session?.user as { role?: string })?.role;
  const currentUserId = (session?.user as { id?: string })?.id;
  const isSuperAdmin = currentUserRole === "SUPERADMIN";

  const [data, setData] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<UserRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  // Form state
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Helpers ---
  const isSelf = (user: UserRecord) => user.id === currentUserId;

  const canDelete = (user: UserRecord) => {
    if (isSelf(user)) return false;
    if (currentUserRole === "ADMIN" && user.role === "SUPERADMIN") return false;
    return true;
  };

  // --- Handlers ---
  const openCreate = () => {
    setFormEmail("");
    setFormRole("ADMIN");
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formEmail.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formEmail.trim().toLowerCase(), role: formRole }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("User berhasil ditambahkan!");
        setModalOpen(false);
        fetchData();
      } else {
        toast.error(result.error || "Gagal menambahkan user.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/${deleting.id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        toast.success("User berhasil dihapus!");
        setDeleteOpen(false);
        setDeleting(null);
        fetchData();
      } else {
        toast.error(result.error || "Gagal menghapus user.");
      }
    } catch {
      toast.error("Gagal menghapus user.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (user: UserRecord) => {
    try {
      const res = await fetch(`${API}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(`User ${!user.isActive ? "diaktifkan" : "dinonaktifkan"}`);
        fetchData();
      } else {
        toast.error(result.error || "Gagal mengubah status.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    }
  };

  const handleChangeRole = async (user: UserRecord, newRole: "ADMIN" | "SUPERADMIN") => {
    try {
      const res = await fetch(`${API}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(`Role diubah ke ${newRole}`);
        fetchData();
      } else {
        toast.error(result.error || "Gagal mengubah role.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    }
  };

  // --- Columns ---
  const columns: Column<UserRecord>[] = [
    {
      key: "email",
      label: "Email",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{item.email}</span>
          {item.fullName && (
            <span className="text-xs text-slate-500">{item.fullName}</span>
          )}
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (item) => {
        if (isSuperAdmin && !isSelf(item)) {
          return (
            <select
              value={item.role}
              onChange={(e) =>
                handleChangeRole(item, e.target.value as "ADMIN" | "SUPERADMIN")
              }
              className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 cursor-pointer"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </select>
          );
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
              item.role === "SUPERADMIN"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.role}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
            item.status === "ACTIVE"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {item.status}
        </span>
      ),
    },
    ...(isSuperAdmin
      ? ([
          {
            key: "isActive",
            label: "Aktif",
            render: (item: UserRecord) => (
              <Switch
                checked={item.isActive}
                onChange={() => handleToggleActive(item)}
                disabled={isSelf(item)}
              />
            ),
          },
        ] as Column<UserRecord>[])
      : []),
    {
      key: "lastLogin",
      label: "Login Terakhir",
      render: (item) =>
        item.lastLogin ? (
          <span className="text-xs text-slate-500">
            {new Date(item.lastLogin).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        ) : (
          <span className="text-xs text-slate-400 italic">Belum pernah login</span>
        ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="User Management"
        description="Kelola akses admin dashboard"
        actionLabel="Tambah User"
        onAction={openCreate}
      />

      <DataTable
        columns={columns}
        data={data}
        isLoading={loading}
        onDelete={(item) => {
          if (!canDelete(item)) {
            toast.error(
              isSelf(item)
                ? "Tidak dapat menghapus akun sendiri"
                : "ADMIN tidak dapat menghapus SUPERADMIN"
            );
            return;
          }
          setDeleting(item);
          setDeleteOpen(true);
        }}
      />

      {/* Add User Modal */}
      <FormModal
        title="Tambah User"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={saving}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Role
            </label>
            <select
              value={formRole}
              onChange={(e) =>
                setFormRole(e.target.value as "ADMIN" | "SUPERADMIN")
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ffd900]/50 focus:border-[#ffd900] bg-white"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </select>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-amber-500">
                info
              </span>
              User akan berstatus <strong>PENDING</strong> hingga login pertama.
            </p>
          </div>
        </div>
      </FormModal>

      {/* Delete Confirm */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleting(null);
        }}
        onConfirm={handleDelete}
        loading={saving}
      />
    </div>
  );
}
