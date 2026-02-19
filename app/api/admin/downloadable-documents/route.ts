import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const docs = await prisma.downloadableDocument.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Failed to fetch downloadable documents:", error);
    return NextResponse.json({ error: "Failed to fetch downloadable documents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const doc = await prisma.downloadableDocument.create({ data: body });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Failed to create downloadable document:", error);
    return NextResponse.json({ error: "Failed to create downloadable document" }, { status: 500 });
  }
}
