import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { learning_paths: true } } },
    });
    return NextResponse.json(domains);
  } catch (error) {
    console.error("Failed to fetch domains:", error);
    return NextResponse.json({ error: "Failed to fetch domains" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const domain = await prisma.domain.create({ data: body });
    return NextResponse.json(domain, { status: 201 });
  } catch (error) {
    console.error("Failed to create domain:", error);
    return NextResponse.json({ error: "Failed to create domain" }, { status: 500 });
  }
}
