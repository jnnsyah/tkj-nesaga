import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const feature = await prisma.programFeature.findUnique({ where: { id: parseInt(id, 10) } });
    if (!feature) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(feature);
  } catch (error) {
    console.error("Failed to fetch program feature:", error);
    return NextResponse.json({ error: "Failed to fetch program feature" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const feature = await prisma.programFeature.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(feature);
  } catch (error) {
    console.error("Failed to update program feature:", error);
    return NextResponse.json({ error: "Failed to update program feature" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.programFeature.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete program feature:", error);
    return NextResponse.json({ error: "Failed to delete program feature" }, { status: 500 });
  }
}
