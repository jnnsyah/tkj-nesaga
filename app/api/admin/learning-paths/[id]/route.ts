// Schema migration: Updated for new schema.
// - GET: added level, topics, prerequisites includes; actions include category
// - PUT: handles topics/prerequisites relational updates (deleteMany + create)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const learningPath = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        domain: true,
        level: true,
        topics: true,
        prerequisites: true,
        steps: {
          orderBy: { order: "asc" },
          include: { actions: { include: { category: true } } },
        },
        recommendations: { include: { category: true } },
      },
    });
    if (!learningPath) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Failed to fetch learning path:", error);
    return NextResponse.json({ error: "Failed to fetch learning path" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { topics, prerequisites, ...data } = await req.json();

    // Update core learning path data
    const learningPath = await prisma.learningPath.update({ where: { id }, data });

    // Replace topics if provided
    if (topics) {
      await prisma.learningPathTopic.deleteMany({ where: { learningPathId: id } });
      if (topics.length > 0) {
        await prisma.learningPathTopic.createMany({
          data: topics.map((t: string) => ({ topic: t, learningPathId: id })),
        });
      }
    }

    // Replace prerequisites if provided
    if (prerequisites) {
      await prisma.learningPathPrerequisite.deleteMany({ where: { learningPathId: id } });
      if (prerequisites.length > 0) {
        await prisma.learningPathPrerequisite.createMany({
          data: prerequisites.map((p: string) => ({ prerequisite: p, learningPathId: id })),
        });
      }
    }

    return NextResponse.json(learningPath);
  } catch (error) {
    console.error("Failed to update learning path:", error);
    return NextResponse.json({ error: "Failed to update learning path" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.learningPath.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete learning path:", error);
    return NextResponse.json({ error: "Failed to delete learning path" }, { status: 500 });
  }
}
