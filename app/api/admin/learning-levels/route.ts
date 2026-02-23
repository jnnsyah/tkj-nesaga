import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function GET() {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

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

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const body = await req.json();
        const level = await prisma.learningLevel.create({ data: body });
        return NextResponse.json(level, { status: 201 });
    } catch (error) {
        console.error("Failed to create learning level:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
