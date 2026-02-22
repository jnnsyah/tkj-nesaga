import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Asumsi auth logic NextAuth ada di @/auth atau konvensi NextAuth
import prisma from "@/lib/prisma"; // Menggunakan Prisma export yang benar

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Dapatkan semua stats
        const [
            totalPerusahaan,
            totalLearningPaths,
            totalFaq,
            totalDokumen,
        ] = await Promise.all([
            prisma.partnerCompany.count(),
            prisma.learningPath.count(),
            prisma.frequentlyAskedQuestion.count(),
            prisma.downloadableDocument.count(),
        ]);

        // 2. Dapatkan recent activity (5 terakhir diupdate dari company & learning path)
        const recentCompanies = await prisma.partnerCompany.findMany({
            orderBy: { updatedAt: 'desc' },
            take: 5,
            select: { name: true, updatedAt: true }
        });

        const recentLearningPaths = await prisma.learningPath.findMany({
            orderBy: { updatedAt: 'desc' },
            take: 5,
            select: { title: true, updatedAt: true }
        });

        // Gabungkan dan sort descending, ambil max 5
        const combinedActivity = [
            ...recentCompanies.map((c: { name: string; updatedAt: Date }) => ({
                name: c.name,
                module: "Perusahaan Mitra",
                updatedAt: c.updatedAt.toISOString()
            })),
            ...recentLearningPaths.map((lp: { title: string; updatedAt: Date }) => ({
                name: lp.title,
                module: "Learning Path",
                updatedAt: lp.updatedAt.toISOString()
            }))
        ]
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 5);

        return NextResponse.json({
            stats: {
                totalPerusahaan,
                totalLearningPaths,
                totalFaq,
                totalDokumen,
            },
            recentActivity: combinedActivity,
        });
    } catch (error) {
        console.error("[DASHBOARD_GET]", error);
        return NextResponse.json(
            { error: "Internal Error" },
            { status: 500 }
        );
    }
}
