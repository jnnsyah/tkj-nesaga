import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const rec = await prisma.learningRecommendation.findUnique({
            where: { id: Number(id) },
            include: { category: true, learningPath: true },
        });
        if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(rec);
    } catch (error) {
        console.error("Failed to fetch recommendation:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const rec = await prisma.learningRecommendation.update({
            where: { id: Number(id) },
            data: {
                title: body.title,
                description: body.description,
                href: body.href,
                categoryId: Number(body.categoryId),
                learningPathId: body.learningPathId,
            },
        });
        return NextResponse.json(rec);
    } catch (error) {
        console.error("Failed to update recommendation:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.learningRecommendation.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete recommendation:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
