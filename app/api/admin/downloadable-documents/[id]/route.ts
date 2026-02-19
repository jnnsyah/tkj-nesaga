import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await prisma.downloadableDocument.findUnique({ where: { id: parseInt(id, 10) } });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Failed to fetch downloadable document:", error);
    return NextResponse.json({ error: "Failed to fetch downloadable document" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const doc = await prisma.downloadableDocument.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Failed to update downloadable document:", error);
    return NextResponse.json({ error: "Failed to update downloadable document" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.downloadableDocument.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete downloadable document:", error);
    return NextResponse.json({ error: "Failed to delete downloadable document" }, { status: 500 });
  }
}
