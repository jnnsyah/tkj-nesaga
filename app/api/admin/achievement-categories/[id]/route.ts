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

        if (!body.name || !body.color) {
            return NextResponse.json(
                { error: "Name and color are required" },
                { status: 400 }
            );
        }

        const category = await prisma.achievementCategory.update({
            where: { id },
            data: {
                name: body.name,
                color: body.color,
            },
        });
        return NextResponse.json(category);
    } catch (error: any) {
        console.error("Failed to update category:", error);
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

        // Check if there are achievements using this category
        const achievementCount = await prisma.studentAchievement.count({
            where: { categoryId: id },
        });

        if (achievementCount > 0) {
            return NextResponse.json(
                { error: "Cannot delete category being used by achievements" },
                { status: 400 }
            );
        }

        await prisma.achievementCategory.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error: any) {
        console.error("Failed to delete category:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error.message },
            { status: 500 }
        );
    }
}
