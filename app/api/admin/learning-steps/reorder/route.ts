import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";

export async function PUT(req: NextRequest) {

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    try {
        const { items } = await req.json();
        // items: [{ id: number, order: number }]
        await prisma.$transaction(
            (items as { id: number; order: number }[]).map((item) =>
                prisma.learningStep.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to reorder steps:", error);
        return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
    }
}
