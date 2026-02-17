import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/learning
 * Mengambil semua learning paths (tanpa nested steps/actions) dan external resources.
 */
export async function GET(req: NextRequest) {
  const domainParam = req.nextUrl.searchParams.get("domain");

  const where =
  domainParam && domainParam !== "all"
    ? { DomainId: domainParam}
    : {}; 

  try {
    const [learningPaths, externalResources, domains] = await Promise.all([
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
          domain: true
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.externalResource.findMany({
        orderBy: { createdAt: "asc" },
      }),
      prisma.domain.findMany({
        orderBy: { id: "asc" },
      })
    ]);

    return NextResponse.json({ learningPaths, externalResources, domains });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
