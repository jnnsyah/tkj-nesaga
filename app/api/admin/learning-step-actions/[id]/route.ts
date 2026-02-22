import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const action = await prisma.learningStepAction.update({
            where: { id: Number(id) },
            data: {
                label: body.label,
                to: body.to || null,
                categoryId: Number(body.categoryId),
            },
            include: { category: true },
        });
        return NextResponse.json(action);
    } catch (error) {
        console.error("Failed to update step action:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.learningStepAction.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete step action:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
