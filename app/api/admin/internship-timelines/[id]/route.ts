import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const { id } = await params;
    const timeline = await prisma.internshipTimeline.findUnique({ where: { id: parseInt(id, 10) } });
    if (!timeline) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(timeline);
  } catch (error) {
    console.error("Failed to fetch internship timeline:", error);
    return NextResponse.json({ error: "Failed to fetch internship timeline" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const { id } = await params;
    const body = await req.json();
    const timeline = await prisma.internshipTimeline.update({ where: { id: parseInt(id, 10) }, data: body });
    return NextResponse.json(timeline);
  } catch (error) {
    console.error("Failed to update internship timeline:", error);
    return NextResponse.json({ error: "Failed to update internship timeline" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const { id } = await params;
    await prisma.internshipTimeline.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete internship timeline:", error);
    return NextResponse.json({ error: "Failed to delete internship timeline" }, { status: 500 });
  }
}
