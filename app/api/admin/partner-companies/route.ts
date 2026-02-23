// Schema migration: Updated for explicit junction table PartnerCompanyCategory.
// - GET: categories now include through junction table
// - POST: uses create on junction table instead of connect on implicit m2m

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const companies = await prisma.partnerCompany.findMany({
      orderBy: { id: "asc" },
      include: {
        categories: { include: { category: true } },
        _count: { select: { reviews: true } },
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch partner companies:", error);
    return NextResponse.json({ error: "Failed to fetch partner companies" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const { categoryIds, ...data } = await req.json();
    const company = await prisma.partnerCompany.create({
      data: {
        ...data,
        categories: categoryIds?.length
          ? { create: categoryIds.map((id: number) => ({ categoryId: id })) }
          : undefined,
      },
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Failed to create partner company:", error);
    return NextResponse.json({ error: "Failed to create partner company" }, { status: 500 });
  }
}
