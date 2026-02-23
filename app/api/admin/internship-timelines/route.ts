import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const timelines = await prisma.internshipTimeline.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(timelines);
  } catch (error) {
    console.error("Failed to fetch internship timelines:", error);
    return NextResponse.json({ error: "Failed to fetch internship timelines" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const body = await req.json();
    const timeline = await prisma.internshipTimeline.create({ data: body });
    return NextResponse.json(timeline, { status: 201 });
  } catch (error) {
    console.error("Failed to create internship timeline:", error);
    return NextResponse.json({ error: "Failed to create internship timeline" }, { status: 500 });
  }
}
