import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const { id } = await params;
        const level = await prisma.learningLevel.findUnique({ where: { id: Number(id) } });
        if (!level) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(level);
    } catch (error) {
        console.error("Failed to fetch learning level:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const { id } = await params;
        const body = await req.json();
        const level = await prisma.learningLevel.update({ where: { id: Number(id) }, data: body });
        return NextResponse.json(level);
    } catch (error) {
        console.error("Failed to update learning level:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const { id } = await params;
        await prisma.learningLevel.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete learning level:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
