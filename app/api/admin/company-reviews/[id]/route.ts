import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await prisma.companyReview.findUnique({
      where: { id: parseInt(id, 10) },
      include: { partnerCompany: { select: { id: true, name: true } } },
    });
    if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to fetch company review:", error);
    return NextResponse.json({ error: "Failed to fetch company review" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const review = await prisma.companyReview.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to update company review:", error);
    return NextResponse.json({ error: "Failed to update company review" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.companyReview.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete company review:", error);
    return NextResponse.json({ error: "Failed to delete company review" }, { status: 500 });
  }
}
