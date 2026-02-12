import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/internship
 * Mengambil statistik magang dan kategori mitra untuk landing page.
 */
export async function GET() {
  try {
    const [internshipStats, partnerCategories] = await Promise.all([
      prisma.internshipStat.findMany({
        orderBy: { id: "asc" },
      }),
      prisma.partnerCategory.findMany({
        orderBy: { id: "asc" },
      }),
    ]);

    return NextResponse.json({ internshipStats, partnerCategories });
  } catch (error) {
    console.error("Failed to fetch internship data:", error);
    return NextResponse.json(
      { error: "Failed to fetch internship data" },
      { status: 500 }
    );
  }
}
