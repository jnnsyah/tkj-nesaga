"use client"

import { Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { FAQAccordion } from "@/components/common/faq-accordion";
import { DownloadCard } from "./DownloadCard";
import { TimelineCard } from "./TimelineCard";
import { useEffect, useState } from "react"
import { DownloadableDocument, FAQItem, TimelineItem } from "./types";

export function PanduanPage() {
  const [frequentlyAskedQuestions, setFrequentlyAskedQuestions] = useState<FAQItem[]>([])
  const [downloadableDocuments, setDownloadableDocuments] = useState<DownloadableDocument[]>([])
  const [internshipTimeline, setInternshipTimeline] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "/api/guidance"
        )
        if (response.ok) {
          const data = await response.json()
          setFrequentlyAskedQuestions(data.frequentlyAskedQuestions)
          setDownloadableDocuments(data.downloadableDocuments)
          setInternshipTimeline(data.internshipTimeline)
        }
      } catch {
        console.error("Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 max-w-6xl mx-auto">
      {/* Hero */}
      <section className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-secondary dark:text-primary">
          Panduan Sukses Prakerin TKJ
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Peta jalan, dokumen wajib, dan solusi masalah saat terjun ke industri.
        </p>
      </section>

      {/* Timeline */}
      <section className="mb-32">
        <h2 className="text-2xl font-bold mb-16 text-center text-secondary dark:text-foreground">
          Alur Perjalananmu
        </h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-[40px] left-[10%] right-[10%] h-1 bg-border hidden md:block z-0" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <LoadingOverlay visible={loading} />
            {internshipTimeline && internshipTimeline.length > 0 ? (
              internshipTimeline.map((step, idx) => (
                <TimelineCard
                  key={idx}
                  {...step}
                  isCenter={idx === Math.floor(internshipTimeline.length / 2)}
                />
              ))
            ) : (
              !loading && (
                <EmptyState />
              )
            )}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="mb-32">
        <h2 className="text-2xl font-bold mb-10 text-center text-secondary dark:text-foreground">
          Survival Kit — Download Area
        </h2>
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(280px,320px))] gap-8 justify-center">          <LoadingOverlay visible={loading} />
          {downloadableDocuments && downloadableDocuments.length > 0 ? (
            downloadableDocuments.map((item, idx) => (
              <DownloadCard key={idx} {...item} />
            ))
          ) : (
            !loading && (
              <EmptyState />
            )
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-secondary dark:text-foreground">
          <Icon name="medical_services" className="text-red-500" />
          P3K: Pertolongan Pertama — FAQ
        </h2>
        <div className="relative space-y-4">
          <LoadingOverlay visible={loading} />
          {frequentlyAskedQuestions && frequentlyAskedQuestions.length > 0 ? (
            frequentlyAskedQuestions.map((item, idx) => (
              <FAQAccordion key={idx} {...item} />
            ))
          ) : (
            !loading && (
              <EmptyState />
            )
          )}
        </div>
      </section>
    </div>
  );
}


