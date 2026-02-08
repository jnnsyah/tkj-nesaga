import LearningPathCard from "@/components/cards/LearningPathCard";
import ResourceCard from "@/components/cards/ResourceCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { learningPaths } from "@/data/learningPaths";
import { resources } from "@/data/resources";

export default function LearningHubPage() {
    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Hero */}
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-secondary dark:text-white mb-4 tracking-tight leading-tight">
                    Pusat Pembelajaran <span className="text-primary bg-secondary px-4 py-1 rounded-2xl">TKJ</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
                    Temukan panduan belajar, kurikulum terbaru, dan sumber daya teknis untuk mendukung perjalanan Engineering Anda.
                </p>
            </section>

            {/* Learning Paths */}
            <section className="mb-24">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">
                        Learning Path
                    </h2>
                    <Badge variant="default" className="border border-secondary/10 dark:border-white/10">
                        Updated Syllabus 2026
                    </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {learningPaths.map((path) => (
                        <LearningPathCard key={path.id} {...path} />
                    ))}
                </div>
            </section>

            {/* Resource Library */}
            <section className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 px-2 text-secondary dark:text-white">
                    Resource Library
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, idx) => (
                        <ResourceCard key={idx} {...resource} />
                    ))}
                </div>
            </section>
        </div>
    );
}
