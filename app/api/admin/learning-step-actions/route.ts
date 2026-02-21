import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const learningStepId = searchParams.get("learningStepId");
        if (!learningStepId) {
            return NextResponse.json({ error: "learningStepId is required" }, { status: 400 });
        }
        const actions = await prisma.learningStepAction.findMany({
            where: { learningStepId: Number(learningStepId) },
            include: { category: true },
        });
        return NextResponse.json(actions);
    } catch (error) {
        console.error("Failed to fetch step actions:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const action = await prisma.learningStepAction.create({
            data: {
                label: body.label,
                to: body.to || null,
                categoryId: Number(body.categoryId),
                learningStepId: Number(body.learningStepId),
            },
            include: { category: true },
        });
        return NextResponse.json(action, { status: 201 });
    } catch (error) {
        console.error("Failed to create step action:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
