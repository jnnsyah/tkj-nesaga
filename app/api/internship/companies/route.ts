// Schema migration: Updated Prisma query for new schema.
// - Added isActive filter to only return active companies
// - Changed categories include to go through explicit junction table (PartnerCompanyCategory)

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/internship/companies
 * Mengambil semua perusahaan mitra magang yang aktif.
 */
export async function GET() {
  try {
    const companies = await prisma.partnerCompany.findMany({
      where: { isActive: true },
      include: {
        categories: { include: { category: true } },
        reviews: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch partner companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner companies" },
      { status: 500 }
    );
  }
}
