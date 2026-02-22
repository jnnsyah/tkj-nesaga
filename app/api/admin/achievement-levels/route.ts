import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const levels = await prisma.achievementLevel.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(levels);
    } catch (error: any) {
        console.error("Failed to fetch levels:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name || !body.icon) {
            return NextResponse.json(
                { error: "Name and icon are required" },
                { status: 400 }
            );
        }

        const level = await prisma.achievementLevel.create({
            data: {
                name: body.name,
                icon: body.icon,
            },
        });
        return NextResponse.json(level, { status: 201 });
    } catch (error: any) {
        console.error("Failed to create level:", error);
        return NextResponse.json(
            { error: "Failed to create", details: error.message },
            { status: 500 }
        );
    }
}
