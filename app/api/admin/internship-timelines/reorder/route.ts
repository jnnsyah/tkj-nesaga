import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
    try {
        const { items } = await req.json();
        await prisma.$transaction(
            (items as { id: number; order: number }[]).map((item) =>
                prisma.internshipTimeline.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to reorder timelines:", error);
        return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
    }
}
