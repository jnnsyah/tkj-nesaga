import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/internship/companies
 * Mengambil semua perusahaan mitra magang (tanpa reviews untuk performa).
 */
export async function GET() {
  try {
    const companies = await prisma.partnerCompany.findMany({
      include: {
        categories: true,
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
