// Schema migration: prerequisites is now { prerequisite: string }[], recommendations use category relation
"use client"

import { Badge } from "@/components/ui/badge";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ErrorState } from "@/components/ui/error-state";
import { Icon } from "@/components/ui/icon";
import { CheckItem } from "@/components/ui/check-item";
import { TimelineStep } from "@/components/common/timeline-step";
import { ResourceCard } from "./ResourceCard";
import { Button } from "@/components/ui/button";
import "./LearningPathDetail.css";
import { useCallback, useEffect, useState } from "react";
import { LearningPath, Step } from "./types"

interface LearningPathDetailProps {
  id: string;
}

export function LearningPathDetail({ id }: LearningPathDetailProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [module, setModule] = useState<LearningPath>()

  const formatTitle = (pathId?: string) => {
    return pathId ? pathId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Network Engineering';
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/learning/${id}`)

      if (!response.ok) {
        throw new Error(`Server merespons dengan status ${response.status}`);
      }

      const data = await response.json()
      setModule(data)
    } catch (err) {
      console.error("Failed to fetch module", err)
      setError(
        "Tidak dapat memuat detail learning path ini. Periksa koneksi internet Anda dan coba lagi."
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
          </div>
        </div>
      </section>

      {/* Error State — shown when fetch fails */}
      {error ? (
        <div className="flex justify-center py-16">
          <ErrorState
            message={error}
            onRetry={fetchData}
            className="max-w-sm"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Timeline */}
            <div className="lg:col-span-8" id="roadmap">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-secondary dark:text-white">
                <Icon name="map" />
                Alur Referensi Belajar
              </h3>
              <div className="relative ml-4 md:ml-6">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 roadmap-line opacity-30" />
                <LoadingOverlay visible={loading} />
                {module?.steps.map((step, idx) => (
                  <TimelineStep
                    key={idx}
                    {...step}
                    isLast={idx === module.steps.length - 1}
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
                <ul className="relative space-y-3">
                  <LoadingOverlay visible={loading} />
                  {module?.prerequisites.map((prereq, idx) => (
                    <CheckItem key={prereq.id ?? idx} className="text-sm">
                      {prereq.prerequisite}
                    </CheckItem>
                  ))}
                </ul>
              </div>

              {/* Back Button */}
              <Button
                variant="outline"
                to="/learning"
                icon="arrow_back"
                className="w-full rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm border-border font-bold"
              >
                Kembali
              </Button>
            </aside>
          </div>

          {/* Recommendations Section */}
          {module?.recommendations && module?.recommendations.length > 0 && (
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
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoadingOverlay visible={loading} />
                {module.recommendations.map((rec, idx) => (
                  <ResourceCard key={idx} {...rec} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
