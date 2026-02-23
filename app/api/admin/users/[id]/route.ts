import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

// PATCH /api/admin/users/:id — Update role or isActive
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Tidak bisa edit diri sendiri
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: "Tidak dapat mengedit akun sendiri" },
        { status: 403 }
      );
    }

    // Hanya SUPERADMIN yang bisa ubah role dan isActive
    if (currentUser.role !== "SUPERADMIN") {
      return NextResponse.json(
        { error: "Hanya SUPERADMIN yang dapat mengubah role dan status aktif" },
        { status: 403 }
      );
    }

    const targetUser = await prisma.adminUser.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Record<string, unknown> = {};

    // Update role jika disediakan
    if (body.role !== undefined) {
      const validRoles = ["ADMIN", "SUPERADMIN"];
      if (!validRoles.includes(body.role)) {
        return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
      }
      updateData.role = body.role;
    }

    // Update isActive jika disediakan
    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Tidak ada data yang diubah" }, { status: 400 });
    }

    const updated = await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/admin/users/:id — Delete a user
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Tidak bisa hapus diri sendiri
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus akun sendiri" },
        { status: 403 }
      );
    }

    const targetUser = await prisma.adminUser.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // ADMIN hanya bisa hapus user dengan role ADMIN
    if (currentUser.role === "ADMIN" && targetUser.role === "SUPERADMIN") {
      return NextResponse.json(
        { error: "ADMIN tidak dapat menghapus SUPERADMIN" },
        { status: 403 }
      );
    }

    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
