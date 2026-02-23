import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const body = await req.json();
    const domain = await prisma.domain.create({ data: body });
    return NextResponse.json(domain, { status: 201 });
  } catch (error) {
    console.error("Failed to create domain:", error);
    return NextResponse.json({ error: "Failed to create domain" }, { status: 500 });
  }
}
