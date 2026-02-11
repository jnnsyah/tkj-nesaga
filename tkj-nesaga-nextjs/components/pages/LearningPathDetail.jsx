"use client"

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import CheckItem from "@/components/ui/CheckItem";
import TimelineStep from "@/components/sections/TimelineStep";
import ResourceCard from "@/components/cards/ResourceCard";
import { getLearningPathById, learningPaths } from "@/data/learning";
import "./LearningPathDetail.css";

export default function LearningPathDetail({id}) {
    const path = getLearningPathById(id) || learningPaths[0];

    const formatTitle = (pathId) => {
        return pathId ? pathId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Network Engineering';
    };

    const handleViewReference = () => {
        const element = document.getElementById("roadmap");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <section className="mb-12 bg-card p-8 md:p-12 rounded-xl border border-border shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                        <Badge variant="primary" className="mb-4">
                            Curated Learning Path
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary mb-4 leading-tight">
                            Detail Referensi Belajar {formatTitle(id)}
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                            Selamat datang di kurasi sumber belajar eksternal pilihan. Roadmap ini adalah panduan
                            terstruktur yang mengumpulkan referensi terbaik dari berbagai platform edukasi global.
                        </p>
                        {/* Main CTA */}
                        {/* <Button
                            variant="secondary"
                            icon="open_in_new"
                            onClick={handleViewReference}
                            className="w-full md:w-fit mt-4"
                        >
                            Lihat Referensi Belajar
                        </Button> */}
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Timeline */}
                <div className="lg:col-span-8" id="roadmap">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-secondary dark:text-white">
                        <Icon name="map" />
                        Alur Referensi Belajar
                    </h3>
                    <div className="relative ml-4 md:ml-6">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 roadmap-line opacity-30" />
                        {path.steps.map((step, idx) => (
                            <TimelineStep
                                key={idx}
                                {...step}
                                isLast={idx === path.steps.length - 1}
                                onViewReference={() => console.log('View reference:', step.title)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
                    {/* Prerequisites */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <h5 className="text-lg font-bold text-secondary dark:text-primary mb-4 flex items-center gap-2">
                            <Icon name="help_center" />
                            Prasyarat
                        </h5>
                        <ul className="space-y-3">
                            {path.prerequisites.map((prereq, idx) => (
                                <CheckItem key={idx} className="text-sm">
                                    {prereq}
                                </CheckItem>
                            ))}
                        </ul>
                    </div>

                    {/* Documentation */}
                    <div className="bg-secondary text-white p-6 rounded-xl shadow-md overflow-hidden relative">
                        <div className="absolute bottom-0 right-0 opacity-10">
                            <Icon name="link" size="2xl" className="text-8xl" />
                        </div>
                        <h5 className="text-lg font-bold mb-4 relative z-10">Pusat Dokumentasi</h5>
                        <div className="space-y-3 relative z-10">
                            <a
                                href="#"
                                className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                            >
                                Official Documentation
                                <Icon name="open_in_new" size="sm" />
                            </a>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Recommendations Section */}
            {path.recommendations && path.recommendations.length > 0 && (
                <section className="mt-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-secondary dark:text-white">
                                <Icon name="explore" />
                                Rekomendasi Sumber Belajar
                            </h3>
                            <p className="text-muted-foreground mt-1">
                                Referensi terbaik dari komunitas dan platform edukasi pilihan.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {path.recommendations.map((rec, idx) => (
                            <ResourceCard key={idx} {...rec} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
