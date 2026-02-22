import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/internship/companies/:id
 * Mengambil detail satu perusahaan mitra berdasarkan ID, termasuk reviews.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = parseInt(id, 10);

    if (isNaN(companyId)) {
      return NextResponse.json(
        { error: "Invalid company ID" },
        { status: 400 }
      );
    }

    const company = await prisma.partnerCompany.findUnique({
      where: { id: companyId },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Failed to fetch company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}
