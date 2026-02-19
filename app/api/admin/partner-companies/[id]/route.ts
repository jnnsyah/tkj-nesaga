import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const company = await prisma.partnerCompany.findUnique({
      where: { id: parseInt(id, 10) },
      include: { categories: true, reviews: { orderBy: { createdAt: "desc" } } },
    });
    if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(company);
  } catch (error) {
    console.error("Failed to fetch partner company:", error);
    return NextResponse.json({ error: "Failed to fetch partner company" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { categoryIds, ...data } = await req.json();
    const company = await prisma.partnerCompany.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...data,
        categories: categoryIds ? { set: categoryIds.map((cid: number) => ({ id: cid })) } : undefined,
      },
    });
    return NextResponse.json(company);
  } catch (error) {
    console.error("Failed to update partner company:", error);
    return NextResponse.json({ error: "Failed to update partner company" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.partnerCompany.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete partner company:", error);
    return NextResponse.json({ error: "Failed to delete partner company" }, { status: 500 });
  }
}
