import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/program
 * Mengambil fitur program TKJ dan highlight kurikulum untuk landing page.
 */
export async function GET() {
  try {
    const [programFeatures, curriculumHighlights] = await Promise.all([
      prisma.programFeature.findMany({
        orderBy: { id: "asc" },
      }),
      prisma.curriculumHighlight.findMany({
        orderBy: { id: "asc" },
      }),
    ]);

    return NextResponse.json({ programFeatures, curriculumHighlights });
  } catch (error) {
    console.error("Failed to fetch program data:", error);
    return NextResponse.json(
      { error: "Failed to fetch program data" },
      { status: 500 }
    );
  }
}
