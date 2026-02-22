import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { items } = body as { items: { id: number; order: number }[] };

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: "Invalid items" }, { status: 400 });
        }

        await prisma.$transaction(
            items.map((item) =>
                prisma.studentAchievement.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );

        return NextResponse.json({ message: "Order updated successfully" });
    } catch (error: any) {
        console.error("Failed to reorder achievements:", error);
        return NextResponse.json(
            { error: "Failed to reorder", details: error.message },
            { status: 500 }
        );
    }
}
