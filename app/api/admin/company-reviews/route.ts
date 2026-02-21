import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const partnerCompanyId = searchParams.get("partnerCompanyId");
    const reviews = await prisma.companyReview.findMany({
      where: partnerCompanyId ? { partnerCompanyId: Number(partnerCompanyId) } : undefined,
      orderBy: { createdAt: "desc" },
      include: { partnerCompany: { select: { id: true, name: true } } },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch company reviews:", error);
    return NextResponse.json({ error: "Failed to fetch company reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await prisma.companyReview.create({ data: body });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create company review:", error);
    return NextResponse.json({ error: "Failed to create company review" }, { status: 500 });
  }
}
