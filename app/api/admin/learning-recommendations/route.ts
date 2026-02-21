import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const learningPathId = searchParams.get("learningPathId");
        const recommendations = await prisma.learningRecommendation.findMany({
            where: learningPathId ? { learningPathId } : undefined,
            orderBy: { id: "desc" },
            include: {
                category: { select: { id: true, name: true, color: true, icon: true } },
                learningPath: { select: { id: true, title: true } },
            },
        });
        return NextResponse.json(recommendations);
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const recommendation = await prisma.learningRecommendation.create({
            data: {
                title: body.title,
                description: body.description,
                href: body.href,
                categoryId: Number(body.categoryId),
                learningPathId: body.learningPathId,
            },
        });
        return NextResponse.json(recommendation, { status: 201 });
    } catch (error) {
        console.error("Failed to create recommendation:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
