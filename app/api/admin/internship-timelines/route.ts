import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const timelines = await prisma.internshipTimeline.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(timelines);
  } catch (error) {
    console.error("Failed to fetch internship timelines:", error);
    return NextResponse.json({ error: "Failed to fetch internship timelines" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const timeline = await prisma.internshipTimeline.create({ data: body });
    return NextResponse.json(timeline, { status: 201 });
  } catch (error) {
    console.error("Failed to create internship timeline:", error);
    return NextResponse.json({ error: "Failed to create internship timeline" }, { status: 500 });
  }
}
