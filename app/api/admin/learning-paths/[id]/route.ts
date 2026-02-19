import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const learningPath = await prisma.learningPath.findUnique({
      where: { id },
      include: { domain: true, steps: { orderBy: { order: "asc" }, include: { actions: true } }, recommendations: true },
    });
    if (!learningPath) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Failed to fetch learning path:", error);
    return NextResponse.json({ error: "Failed to fetch learning path" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const learningPath = await prisma.learningPath.update({ where: { id }, data: body });
    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Failed to update learning path:", error);
    return NextResponse.json({ error: "Failed to update learning path" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.learningPath.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete learning path:", error);
    return NextResponse.json({ error: "Failed to delete learning path" }, { status: 500 });
  }
}
