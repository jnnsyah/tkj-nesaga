import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.partnerCategory.findUnique({
      where: { id: parseInt(id, 10) },
      include: { companies: true },
    });
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    console.error("Failed to fetch partner category:", error);
    return NextResponse.json({ error: "Failed to fetch partner category" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const category = await prisma.partnerCategory.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(category);
  } catch (error) {
    console.error("Failed to update partner category:", error);
    return NextResponse.json({ error: "Failed to update partner category" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.partnerCategory.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete partner category:", error);
    return NextResponse.json({ error: "Failed to delete partner category" }, { status: 500 });
  }
}
