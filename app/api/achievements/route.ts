import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const achievements = await prisma.studentAchievement.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
            include: {
                category: true,
                level: true,
            },
        });
        return NextResponse.json(achievements);
    } catch (error: any) {
        console.error("Failed to fetch public achievements:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
