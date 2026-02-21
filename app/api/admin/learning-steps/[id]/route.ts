import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const step = await prisma.learningStep.findUnique({
            where: { id: Number(id) },
            include: { actions: { include: { category: true } } },
        });
        if (!step) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(step);
    } catch (error) {
        console.error("Failed to fetch step:", error);
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
        const step = await prisma.learningStep.update({
            where: { id: Number(id) },
            data: {
                title: body.title,
                description: body.description,
                mediaType: body.mediaType ?? null,
            },
        });
        return NextResponse.json(step);
    } catch (error) {
        console.error("Failed to update step:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.learningStep.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete step:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
