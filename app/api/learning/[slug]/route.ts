// Schema migration: Updated Prisma queries for new schema.
// - Added level, topics, prerequisites, domain includes
// - Actions now include category relation (replaces direct icon field)
// - Recommendations now include category relation (replaces direct icon/color fields)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/learning/:slug
 * Mengambil detail satu learning path berdasarkan slug,
 * termasuk steps (dengan actions) dan recommendations.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const learningPath = await prisma.learningPath.findUnique({
      where: { slug },
      include: {
        level: true,
        topics: true,
        prerequisites: true,
        domain: true,
        steps: {
          orderBy: { order: "asc" },
          include: {
            actions: { include: { category: true } },
          },
        },
        recommendations: { include: { category: true } },
      },
    });

    if (!learningPath) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Failed to fetch learning path:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning path" },
      { status: 500 }
    );
  }
}
