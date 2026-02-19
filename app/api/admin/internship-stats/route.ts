import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.internshipStat.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch internship stats:", error);
    return NextResponse.json({ error: "Failed to fetch internship stats" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const stat = await prisma.internshipStat.create({ data: body });
    return NextResponse.json(stat, { status: 201 });
  } catch (error) {
    console.error("Failed to create internship stat:", error);
    return NextResponse.json({ error: "Failed to create internship stat" }, { status: 500 });
  }
}
