import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const domain = await prisma.domain.findUnique({ where: { id } });
    if (!domain) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(domain);
  } catch (error) {
    console.error("Failed to fetch domain:", error);
    return NextResponse.json({ error: "Failed to fetch domain" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const domain = await prisma.domain.update({ where: { id }, data: body });
    return NextResponse.json(domain);
  } catch (error) {
    console.error("Failed to update domain:", error);
    return NextResponse.json({ error: "Failed to update domain" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.domain.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete domain:", error);
    return NextResponse.json({ error: "Failed to delete domain" }, { status: 500 });
  }
}
