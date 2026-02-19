import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const learningPaths = await prisma.learningPath.findMany({
      orderBy: { createdAt: "asc" },
      include: { domain: true, _count: { select: { steps: true, recommendations: true } } },
    });
    return NextResponse.json(learningPaths);
  } catch (error) {
    console.error("Failed to fetch learning paths:", error);
    return NextResponse.json({ error: "Failed to fetch learning paths" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const learningPath = await prisma.learningPath.create({ data: body });
    return NextResponse.json(learningPath, { status: 201 });
  } catch (error) {
    console.error("Failed to create learning path:", error);
    return NextResponse.json({ error: "Failed to create learning path" }, { status: 500 });
  }
}
