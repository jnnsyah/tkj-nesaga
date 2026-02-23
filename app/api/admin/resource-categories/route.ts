import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const body = await req.json();
        const category = await prisma.resourceCategory.create({ data: body });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Failed to create resource category:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
