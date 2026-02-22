import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.externalResource.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, name: true, color: true, icon: true } },
        domain: { select: { id: true, name: true } },
      },
    });
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Failed to fetch external resources:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {
      title: body.title,
      description: body.description,
      href: body.href,
      categoryId: Number(body.categoryId),
    };
    if (body.domainId) {
      data.domainId = body.domainId;
    }
    const resource = await prisma.externalResource.create({ data: data as any });
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Failed to create external resource:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
