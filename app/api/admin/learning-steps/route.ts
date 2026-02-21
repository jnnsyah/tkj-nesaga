import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const learningPathId = searchParams.get("learningPathId");
        if (!learningPathId) {
            return NextResponse.json({ error: "learningPathId is required" }, { status: 400 });
        }
        const steps = await prisma.learningStep.findMany({
            where: { learningPathId },
            orderBy: { order: "asc" },
            include: { actions: { include: { category: true } } },
        });
        return NextResponse.json(steps);
    } catch (error) {
        console.error("Failed to fetch steps:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Auto-calculate order: max order + 1
        const maxOrder = await prisma.learningStep.aggregate({
            where: { learningPathId: body.learningPathId },
            _max: { order: true },
        });
        const step = await prisma.learningStep.create({
            data: {
                title: body.title,
                description: body.description,
                mediaType: body.mediaType || null,
                order: (maxOrder._max.order ?? 0) + 1,
                learningPathId: body.learningPathId,
            },
        });
        return NextResponse.json(step, { status: 201 });
    } catch (error) {
        console.error("Failed to create step:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
