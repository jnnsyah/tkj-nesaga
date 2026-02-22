import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.resourceCategory.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: { externalResources: true, learningRecommendations: true, learningStepActions: true },
                },
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Failed to fetch resource categories:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const category = await prisma.resourceCategory.create({ data: body });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Failed to create resource category:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
