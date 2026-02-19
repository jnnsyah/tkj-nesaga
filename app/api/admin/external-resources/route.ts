import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.externalResource.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Failed to fetch external resources:", error);
    return NextResponse.json({ error: "Failed to fetch external resources" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resource = await prisma.externalResource.create({ data: body });
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Failed to create external resource:", error);
    return NextResponse.json({ error: "Failed to create external resource" }, { status: 500 });
  }
}
