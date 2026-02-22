import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function getPeriodDate(period: string): Date {
    const now = new Date();
    switch (period) {
        case "7d":
            return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case "30d":
            return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case "3m":
            return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        case "6m":
            return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        case "1y":
            return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        default:
            return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    }
}

function getMonthLabel(date: Date): string {
    return date.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
}

function generateMonthBuckets(since: Date): { label: string; start: Date; end: Date }[] {
    const buckets: { label: string; start: Date; end: Date }[] = [];
    const now = new Date();
    const current = new Date(since.getFullYear(), since.getMonth(), 1);

    while (current <= now) {
        const start = new Date(current);
        const end = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59, 999);
        buckets.push({ label: getMonthLabel(start), start, end });
        current.setMonth(current.getMonth() + 1);
    }
    return buckets;
}

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const period = searchParams.get("period") || "6m";
        const since = getPeriodDate(period);

        // 1. All entity counts
        const [
            totalPerusahaan,
            totalLearningPaths,
            totalFaq,
            totalDokumen,
            totalAchievements,
            totalReviews,
            totalResources,
            totalPartnerCategories,
        ] = await Promise.all([
            prisma.partnerCompany.count(),
            prisma.learningPath.count(),
            prisma.frequentlyAskedQuestion.count(),
            prisma.downloadableDocument.count(),
            prisma.studentAchievement.count(),
            prisma.companyReview.count(),
            prisma.externalResource.count(),
            prisma.partnerCategory.count(),
        ]);

        // Published vs Draft learning paths
        const [publishedPaths, draftPaths] = await Promise.all([
            prisma.learningPath.count({ where: { isPublished: true } }),
            prisma.learningPath.count({ where: { isPublished: false } }),
        ]);

        // 2. Monthly trends — count created items per month
        const monthBuckets = generateMonthBuckets(since);

        const [
            learningPathsByMonth,
            achievementsByMonth,
            resourcesByMonth,
            reviewsByMonth,
        ] = await Promise.all([
            Promise.all(
                monthBuckets.map((b) =>
                    prisma.learningPath.count({
                        where: { createdAt: { gte: b.start, lte: b.end } },
                    })
                )
            ),
            Promise.all(
                monthBuckets.map((b) =>
                    prisma.studentAchievement.count({
                        where: { createdAt: { gte: b.start, lte: b.end } },
                    })
                )
            ),
            Promise.all(
                monthBuckets.map((b) =>
                    prisma.externalResource.count({
                        where: { createdAt: { gte: b.start, lte: b.end } },
                    })
                )
            ),
            Promise.all(
                monthBuckets.map((b) =>
                    prisma.companyReview.count({
                        where: { createdAt: { gte: b.start, lte: b.end } },
                    })
                )
            ),
        ]);

        const monthlyTrends = monthBuckets.map((b, i) => ({
            month: b.label,
            learningPaths: learningPathsByMonth[i],
            achievements: achievementsByMonth[i],
            resources: resourcesByMonth[i],
            reviews: reviewsByMonth[i],
        }));

        // 3. Content composition for donut chart
        const contentComposition = [
            { name: "Learning Paths", value: totalLearningPaths, color: "#8b5cf6" },
            { name: "Prestasi", value: totalAchievements, color: "#f59e0b" },
            { name: "Resources", value: totalResources, color: "#3b82f6" },
            { name: "FAQ", value: totalFaq, color: "#10b981" },
            { name: "Dokumen", value: totalDokumen, color: "#ef4444" },
            { name: "Reviews", value: totalReviews, color: "#ec4899" },
        ].filter((c) => c.value > 0);

        // 4. Achievements by category
        const achievementCategories = await prisma.achievementCategory.findMany({
            include: { _count: { select: { achievements: true } } },
        });
        const achievementsByCategory = achievementCategories.map((cat) => ({
            category: cat.name,
            count: cat._count.achievements,
            color: cat.color,
        }));

        // 5. Achievements by level
        const achievementLevels = await prisma.achievementLevel.findMany({
            include: { _count: { select: { achievements: true } } },
        });
        const achievementsByLevel = achievementLevels.map((lvl) => ({
            level: lvl.name,
            count: lvl._count.achievements,
            icon: lvl.icon,
        }));

        // 6. Recent activity from all modules (10 items max)
        const [
            recentCompanies,
            recentLearningPaths,
            recentAchievements,
            recentResources,
            recentReviews,
            recentDocuments,
        ] = await Promise.all([
            prisma.partnerCompany.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { name: true, updatedAt: true },
            }),
            prisma.learningPath.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { title: true, updatedAt: true },
            }),
            prisma.studentAchievement.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { title: true, updatedAt: true },
            }),
            prisma.externalResource.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { title: true, updatedAt: true },
            }),
            prisma.companyReview.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { name: true, updatedAt: true },
            }),
            prisma.downloadableDocument.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { title: true, updatedAt: true },
            }),
        ]);

        const combinedActivity = [
            ...recentCompanies.map((c) => ({
                name: c.name,
                module: "Perusahaan Mitra",
                updatedAt: c.updatedAt.toISOString(),
            })),
            ...recentLearningPaths.map((lp) => ({
                name: lp.title,
                module: "Learning Path",
                updatedAt: lp.updatedAt.toISOString(),
            })),
            ...recentAchievements.map((a) => ({
                name: a.title,
                module: "Prestasi",
                updatedAt: a.updatedAt.toISOString(),
            })),
            ...recentResources.map((r) => ({
                name: r.title,
                module: "External Resource",
                updatedAt: r.updatedAt.toISOString(),
            })),
            ...recentReviews.map((r) => ({
                name: r.name,
                module: "Review",
                updatedAt: r.updatedAt.toISOString(),
            })),
            ...recentDocuments.map((d) => ({
                name: d.title,
                module: "Dokumen",
                updatedAt: d.updatedAt.toISOString(),
            })),
        ]
            .sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .slice(0, 10);

        return NextResponse.json({
            stats: {
                totalPerusahaan,
                totalLearningPaths,
                totalFaq,
                totalDokumen,
                totalAchievements,
                totalReviews,
                totalResources,
                totalPartnerCategories,
                publishedPaths,
                draftPaths,
            },
            monthlyTrends,
            contentComposition,
            achievementsByCategory,
            achievementsByLevel,
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
