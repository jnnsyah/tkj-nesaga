import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resource = await prisma.externalResource.findUnique({ where: { id: parseInt(id, 10) } });
    if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(resource);
  } catch (error) {
    console.error("Failed to fetch external resource:", error);
    return NextResponse.json({ error: "Failed to fetch external resource" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const resource = await prisma.externalResource.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(resource);
  } catch (error) {
    console.error("Failed to update external resource:", error);
    return NextResponse.json({ error: "Failed to update external resource" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.externalResource.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete external resource:", error);
    return NextResponse.json({ error: "Failed to delete external resource" }, { status: 500 });
  }
}
