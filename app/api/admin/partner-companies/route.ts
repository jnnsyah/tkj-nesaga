import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.partnerCompany.findMany({
      orderBy: { id: "asc" },
      include: { categories: true, _count: { select: { reviews: true } } },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch partner companies:", error);
    return NextResponse.json({ error: "Failed to fetch partner companies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { categoryIds, ...data } = await req.json();
    const company = await prisma.partnerCompany.create({
      data: {
        ...data,
        categories: categoryIds?.length ? { connect: categoryIds.map((id: number) => ({ id })) } : undefined,
      },
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Failed to create partner company:", error);
    return NextResponse.json({ error: "Failed to create partner company" }, { status: 500 });
  }
}
