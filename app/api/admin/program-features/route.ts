import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const features = await prisma.programFeature.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(features);
  } catch (error) {
    console.error("Failed to fetch program features:", error);
    return NextResponse.json({ error: "Failed to fetch program features" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

  try {
    const body = await req.json();
    const feature = await prisma.programFeature.create({ data: body });
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error("Failed to create program feature:", error);
    return NextResponse.json({ error: "Failed to create program feature" }, { status: 500 });
  }
}
