import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        void searchParams; // period param reserved for future use

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

        // 2. Learning paths by level (with published/draft counts)
        const learningLevels = await prisma.learningLevel.findMany({
            include: {
                learning_paths: {
                    select: { isPublished: true },
                },
            },
        });
        const learningByLevel = learningLevels.map((lvl) => ({
            level: lvl.name,
            published: lvl.learning_paths.filter((p) => p.isPublished).length,
            draft: lvl.learning_paths.filter((p) => !p.isPublished).length,
            color: lvl.color,
        }));

        // 3. Learning paths by domain
        const domains = await prisma.domain.findMany({
            include: { _count: { select: { learning_paths: true } } },
        });
        const DOMAIN_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4", "#84cc16"];
        const learningByDomain = domains.map((d, i) => ({
            domain: d.name,
            count: d._count.learning_paths,
            color: DOMAIN_COLORS[i % DOMAIN_COLORS.length],
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
            learningByLevel,
            learningByDomain,
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
