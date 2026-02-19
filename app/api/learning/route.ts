// Schema migration: Updated Prisma queries for new schema.
// - LearningPath: select level relation instead of enum, topics/prerequisites as relations,
//   domain with icon/levelVariant/actionIcon, added isPublished filter
// - ExternalResource: include category relation for icon/color
// - Domain: added isPublished filter, select icon field

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/learning
 * Mengambil semua learning paths (tanpa nested steps/actions) dan external resources.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("domain");

  let where: Record<string, unknown> = { isPublished: true };

  if (slug && slug !== "all") {
    const domain = await prisma.domain.findUnique({
      where: { slug },
    });

    if (!domain) {
      return Response.json({ message: "Domain not found" }, { status: 404 });
    }

    where = { ...where, domainId: domain.id };
  }
  try {
    const [learningPaths, externalResources, domains] = await Promise.all([
      prisma.learningPath.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          level: { select: { id: true, name: true, color: true } },
          topics: { select: { id: true, topic: true } },
          prerequisites: { select: { id: true, prerequisite: true } },
          domain: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
              levelVariant: true,
              actionIcon: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.externalResource.findMany({
        include: {
          category: {
            select: { id: true, name: true, icon: true, color: true },
          },
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.domain.findMany({
        where: { isPublished: true },
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
