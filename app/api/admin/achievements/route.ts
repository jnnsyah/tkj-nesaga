import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const achievements = await prisma.studentAchievement.findMany({
            orderBy: { order: "asc" },
            include: {
                category: true,
                level: true,
            },
        });
        return NextResponse.json(achievements);
    } catch (error: any) {
        console.error("Failed to fetch achievements:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            title,
            description,
            year,
            imageUrl,
            imagePublicId,
            categoryId,
            levelId,
        } = body;

        if (!title || !year || !imageUrl || !categoryId || !levelId) {
            return NextResponse.json(
                { error: "Required fields are missing" },
                { status: 400 }
            );
        }

        // Auto-calculate order: max order + 1
        const maxOrder = await prisma.studentAchievement.aggregate({
            _max: { order: true },
        });

        const achievement = await prisma.studentAchievement.create({
            data: {
                title,
                description: description || "",
                year: parseInt(year),
                imageUrl,
                imagePublicId,
                order: (maxOrder?._max?.order ?? 0) + 1,
                categoryId: parseInt(categoryId),
                levelId: parseInt(levelId),
            },
            include: {
                category: true,
                level: true,
            },
        });
        return NextResponse.json(achievement, { status: 201 });
    } catch (error: any) {
        console.error("Failed to create achievement:", error);
        return NextResponse.json(
            { error: "Failed to create", details: error.message },
            { status: 500 }
        );
    }
}
