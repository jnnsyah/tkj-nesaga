import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const levels = await prisma.learningLevel.findMany({
            orderBy: { name: "asc" },
            include: { _count: { select: { learning_paths: true } } },
        });
        return NextResponse.json(levels);
    } catch (error) {
        console.error("Failed to fetch learning levels:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const level = await prisma.learningLevel.create({ data: body });
        return NextResponse.json(level, { status: 201 });
    } catch (error) {
        console.error("Failed to create learning level:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
