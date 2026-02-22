import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await params;
        const id = parseInt(rawId);
        const body = await req.json();

        const {
            title,
            description,
            year,
            imageUrl,
            imagePublicId,
            categoryId,
            levelId,
            isActive,
        } = body;

        const achievement = await prisma.studentAchievement.update({
            where: { id },
            data: {
                title,
                description,
                year: year ? parseInt(year) : undefined,
                imageUrl,
                imagePublicId,
                categoryId: categoryId ? parseInt(categoryId) : undefined,
                levelId: levelId ? parseInt(levelId) : undefined,
                isActive,
            },
            include: {
                category: true,
                level: true,
            },
        });
        return NextResponse.json(achievement);
    } catch (error: any) {
        console.error("Failed to update achievement:", error);
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

        // Get imagePublicId before deleting
        const achievement = await prisma.studentAchievement.findUnique({
            where: { id },
            select: { imagePublicId: true },
        });

        if (achievement?.imagePublicId) {
            await deleteImage(achievement.imagePublicId);
        }

        await prisma.studentAchievement.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Achievement deleted successfully" });
    } catch (error: any) {
        console.error("Failed to delete achievement:", error);
        return NextResponse.json(
            { error: "Failed to delete", details: error.message },
            { status: 500 }
        );
    }
}
