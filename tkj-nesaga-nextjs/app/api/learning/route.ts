import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/learning
 * Mengambil semua learning paths (tanpa nested steps/actions) dan external resources.
 */
export async function GET() {
  try {
    const [learningPaths, externalResources] = await Promise.all([
      prisma.learningPath.findMany({
        select: {
          id: true,
          slug: true,
          icon: true,
          title: true,
          level: true,
          levelVariant: true,
          topics: true,
          actionIcon: true,
          prerequisites: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.externalResource.findMany({
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return NextResponse.json({ learningPaths, externalResources });
  } catch (error) {
    console.error("Failed to fetch learning data:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning data" },
      { status: 500 }
    );
  }
}
