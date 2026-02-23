"use client"

import { LearningPathCard } from "./LearningPathCard";
import { ResourceCard } from "./ResourceCard";
import { LearningPathTabs, type Tab as LearningPathTab } from "./LearningPathTabs";
import { Badge } from "@/components/ui/badge";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LearningPath, LearningLevel, ExternalResource, Domain } from "./types";

export function LearningHubPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [externalResources, setExternalResources] = useState<ExternalResource[]>([]);

  const [activeDomain, setActiveDomain] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");

  const [domains, setDomains] = useState<Domain[]>([]);
  const [learningLevels, setLearningLevels] = useState<LearningLevel[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `/api/learning?domain=${activeDomain}`
      );

      if (!response.ok) {
        throw new Error(`Server merespons dengan status ${response.status}`);
      }

      const data = await response.json();
      setLearningPaths(data.learningPaths);
      setExternalResources(data.externalResources);
      setDomains(data.domains);
      setLearningLevels(data.learningLevels);
    } catch (err) {
      console.error("Failed to fetch learning paths", err);
      setError(
        "Tidak dapat memuat data pembelajaran. Periksa koneksi internet Anda dan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }, [activeDomain]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const domainTabs: LearningPathTab[] = useMemo(() => {
    return domains.map(d => ({
      name: d.name,
      value: d.slug,
      icon: d.icon
    }));
  }, [domains]);

  const levelTabs: LearningPathTab[] = useMemo(() => {
    return learningLevels.map(l => ({
      name: l.name,
      value: l.name,
      icon: l.icon
    }));
  }, [learningLevels]);

  const filteredPaths = useMemo(() => {
    return learningPaths.filter((path) => {
      const matchesLevel = activeLevel === "all" || path.level.name === activeLevel
      return matchesLevel
    });
  }, [activeLevel, learningPaths]);

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

        {/* Filters */}
        <div className="mb-10 px-2 space-y-5">

          {/* Domain Filter */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-secondary/40 dark:text-white/30">
              Bidang Keahlian
            </span>
            <LearningPathTabs
              tabs={domainTabs}
              activeTab={activeDomain}
              onTabChange={setActiveDomain}
              allLabel="Semua"
            />
          </div>

          {/* Subtle divider */}
          <div className="h-px bg-secondary/8 dark:bg-white/8" />

          {/* Level Filter */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-secondary/40 dark:text-white/30">
              Tingkat Kesulitan
            </span>
            <LearningPathTabs
              tabs={levelTabs}
              activeTab={activeLevel}
              onTabChange={setActiveLevel}
              allLabel="Semua"
            />
          </div>

        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoadingOverlay visible={loading} />
          {error ? (
            <ErrorState
              message={error}
              onRetry={fetchData}
            />
          ) : filteredPaths && filteredPaths.length > 0 ? (
            filteredPaths.map(path => (
              <LearningPathCard key={path.id} {...path} />
            ))
          ) : (
            !loading && (
              <EmptyState />
            )
          )}
        </div>
      </section>

      {/* Resource Library */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 px-2 text-secondary dark:text-white">
          Resource Library
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingOverlay visible={loading} />
          {error ? (
            <ErrorState
              message={error}
              onRetry={fetchData}
            />
          ) : externalResources && externalResources.length > 0 ? (
            externalResources.map((resource, idx) => (
              <ResourceCard key={idx} {...resource} />
            ))
          ) : (
            !loading && <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
}
