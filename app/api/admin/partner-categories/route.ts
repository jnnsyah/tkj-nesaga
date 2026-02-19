import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.partnerCategory.findMany({
      orderBy: { id: "asc" },
      include: { _count: { select: { companies: true } } },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch partner categories:", error);
    return NextResponse.json({ error: "Failed to fetch partner categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = await prisma.partnerCategory.create({ data: body });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create partner category:", error);
    return NextResponse.json({ error: "Failed to create partner category" }, { status: 500 });
  }
}
