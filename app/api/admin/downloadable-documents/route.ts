import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const documents = await prisma.downloadableDocument.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Failed to fetch downloadable documents:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const body = await req.json();
    const document = await prisma.downloadableDocument.create({ data: body });
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Failed to create downloadable document:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
