import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const highlights = await prisma.curriculumHighlight.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(highlights);
  } catch (error) {
    console.error("Failed to fetch curriculum highlights:", error);
    return NextResponse.json({ error: "Failed to fetch curriculum highlights" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const body = await req.json();
    const highlight = await prisma.curriculumHighlight.create({ data: body });
    return NextResponse.json(highlight, { status: 201 });
  } catch (error) {
    console.error("Failed to create curriculum highlight:", error);
    return NextResponse.json({ error: "Failed to create curriculum highlight" }, { status: 500 });
  }
}
