"use client"

import {LearningPathCard, Badge, ResourceCard, LoadingOverlay, LearningPathTabs} from "@/components";
import type { LearningPathTab } from "@/components";
// import SectionHeader from "@/components/ui/SectionHeader";
import { useEffect, useMemo, useState } from "react";
import { LearningPath, ExternalResource, Domain } from "./types";

const LEARNING_TABS_FILTERING_BY_LEVEL: LearningPathTab[] = [
  { name: "all", icon: "apps" },
  { name: "Foundation", icon: "hub" },
  { name: "Beginner", icon: "rocket_launch" },
  { name: "Intermediate", icon: "trending_up" },
];

export default function LearningHubPage() {
  const [loading, setLoading] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [externalResources, setExternalResources] = useState<ExternalResource[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [domains, setDomains] = useState<Domain[]>([]);

  console.log("ini domains", domains)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "/api/learning"
        );

        if (response.ok) {
          const data = await response.json();
          setLearningPaths(data.learningPaths);
          setExternalResources(data.externalResources)
          setDomains(data.domains)
        }
      } catch (error) {
        console.error("Failed to fetch learning paths", error)
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const filteredPaths = useMemo(() => {
    if (activeTab === "all") return learningPaths;
    return learningPaths.filter((p) => p.level === activeTab);
  }, [activeTab, learningPaths]);

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

        {/* Tab Navigation */}
         <LearningPathTabs
          tabs={domains}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-8 px-2"
        />

        <LearningPathTabs
          tabs={LEARNING_TABS_FILTERING_BY_LEVEL}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-8 px-2"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoadingOverlay visible={loading}/>
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.id} {...path} />
          ))}
        </div>
      </section>

      {/* Resource Library */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 px-2 text-secondary dark:text-white">
          Resource Library
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingOverlay visible={loading}/>
          {externalResources.map((resource, idx) => (
            <ResourceCard key={idx} {...resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
