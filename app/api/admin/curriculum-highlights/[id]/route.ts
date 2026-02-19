import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const highlight = await prisma.curriculumHighlight.findUnique({ where: { id: parseInt(id, 10) } });
    if (!highlight) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(highlight);
  } catch (error) {
    console.error("Failed to fetch curriculum highlight:", error);
    return NextResponse.json({ error: "Failed to fetch curriculum highlight" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const highlight = await prisma.curriculumHighlight.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(highlight);
  } catch (error) {
    console.error("Failed to update curriculum highlight:", error);
    return NextResponse.json({ error: "Failed to update curriculum highlight" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.curriculumHighlight.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete curriculum highlight:", error);
    return NextResponse.json({ error: "Failed to delete curriculum highlight" }, { status: 500 });
  }
}
