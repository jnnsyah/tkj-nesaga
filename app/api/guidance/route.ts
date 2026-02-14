import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/guidance
 * Mengambil data untuk halaman Panduan Prakerin:
 * - Internship timeline (ordered)
 * - Downloadable documents
 * - Frequently asked questions
 */
export async function GET() {
  try {
    const [internshipTimeline, downloadableDocuments, frequentlyAskedQuestions] =
      await Promise.all([
        prisma.internshipTimeline.findMany({
          orderBy: { order: "asc" },
        }),
        prisma.downloadableDocument.findMany({
          orderBy: { createdAt: "asc" },
        }),
        prisma.frequentlyAskedQuestion.findMany({
          orderBy: { id: "asc" },
        }),
      ]);

    return NextResponse.json({
      internshipTimeline,
      downloadableDocuments,
      frequentlyAskedQuestions,
    });
  } catch (error) {
    console.error("Failed to fetch guidance data:", error);
    return NextResponse.json(
      { error: "Failed to fetch guidance data" },
      { status: 500 }
    );
  }
}
