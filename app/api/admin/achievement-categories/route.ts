import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.achievementCategory.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error("Failed to fetch categories:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name || !body.color) {
            return NextResponse.json(
                { error: "Name and color are required" },
                { status: 400 }
            );
        }

        const category = await prisma.achievementCategory.create({
            data: {
                name: body.name,
                color: body.color,
            },
        });
        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        console.error("Failed to create category:", error);
        return NextResponse.json(
            { error: "Failed to create", details: error.message },
            { status: 500 }
        );
    }
}
