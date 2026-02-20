import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/learning
 * Mengambil semua learning paths (tanpa nested steps/actions), external resources,
 * domains, dan learning levels.
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
    const [learningPaths, externalResources, domains, learningLevels] = await Promise.all([
      prisma.learningPath.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          level: { select: { id: true, name: true, color: true, icon: true } },
          topics: { select: { id: true, topic: true } },
          prerequisites: { select: { id: true, prerequisite: true } },
          domain: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
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
        select: { id: true, name: true, slug: true, icon: true },
        orderBy: { id: "asc" },
      }),
      prisma.learningLevel.findMany({
        select: { id: true, name: true, color: true, icon: true },
        orderBy: { id: "asc" },
      }),
    ]);

    return NextResponse.json({ learningPaths, externalResources, domains, learningLevels });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
