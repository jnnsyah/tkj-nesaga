import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await params;
        const id = parseInt(rawId);
        const body = await req.json();

        if (!body.name || !body.icon) {
            return NextResponse.json(
                { error: "Name and icon are required" },
                { status: 400 }
            );
        }

        const level = await prisma.achievementLevel.update({
            where: { id },
            data: {
                name: body.name,
                icon: body.icon,
            },
        });
        return NextResponse.json(level);
    } catch (error: any) {
        console.error("Failed to update level:", error);
        return NextResponse.json(
            { error: "Failed to update", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await params;
        const id = parseInt(rawId);

        // Check if there are achievements using this level
        const achievementCount = await prisma.studentAchievement.count({
            where: { levelId: id },
        });

        if (achievementCount > 0) {
            return NextResponse.json(
                { error: "Cannot delete level being used by achievements" },
                { status: 400 }
            );
        }

        await prisma.achievementLevel.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Level deleted successfully" });
    } catch (error: any) {
        console.error("Failed to delete level:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error.message },
            { status: 500 }
        );
    }
}
