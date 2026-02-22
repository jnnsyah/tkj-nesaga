import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stat = await prisma.internshipStat.findUnique({ where: { id: parseInt(id, 10) } });
    if (!stat) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(stat);
  } catch (error) {
    console.error("Failed to fetch internship stat:", error);
    return NextResponse.json({ error: "Failed to fetch internship stat" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const stat = await prisma.internshipStat.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(stat);
  } catch (error) {
    console.error("Failed to update internship stat:", error);
    return NextResponse.json({ error: "Failed to update internship stat" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.internshipStat.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete internship stat:", error);
    return NextResponse.json({ error: "Failed to delete internship stat" }, { status: 500 });
  }
}
