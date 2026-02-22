"use client"

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { EmptyState } from "@/components/ui/empty-state";
import { FeatureCard } from "./FeatureCard";
import { CategoryCard } from "./CategoryCard";
import { HeroGraphic } from "./HeroGraphic";
import { AchievementSection } from "./AchievementSection";
import { LandingPartnerCategory, ProgramFeature } from "./types";
import { useEffect, useState } from "react";

export function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [programFeatures, setProgramFeatures] = useState<ProgramFeature[]>([]);
  const [partnerCategories, setPartnerCategories] = useState<LandingPartnerCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [programRes, partnerRes] = await Promise.all([
          fetch("/api/programs"),
          fetch("/api/internship"),
        ]);

        if (programRes.ok) {
          const programData = await programRes.json();
          setProgramFeatures(programData.programFeatures);
        }

        if (partnerRes.ok) {
          const partnerData = await partnerRes.json();
          setPartnerCategories(partnerData.partnerCategories);
        }

      } catch (error) {
        console.error("Failed to fetch landing data", error);
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 gap-2 md:gap-8 lg:gap-12 items-center">

          {/* TEXT CONTENT */}
          <div className="relative z-10 space-y-3 md:space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary/10 text-secondary border border-primary/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="truncate">SMK N 1 Gantiwarno</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-7xl font-black text-secondary dark:text-white leading-[1.1] tracking-tighter">
              Teknik Komputer <br className="hidden lg:block" /> & {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600 dark:from-primary dark:to-yellow-300">
                Jaringan
              </span>
            </h1>

            <p className="text-xs sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Program keahlian yang membekali siswa dengan kompetensi di bidang jaringan komputer, sistem operasi, dan teknologi informasi untuk siap kerja, berwirausaha, maupun melanjutkan pendidikan.
            </p>
          </div>

          {/* GRAPHIC COMPONENT */}
          <HeroGraphic />
        </div>
      </section>

      {/* Learning Materials Section */}
      <section className="py-24 bg-secondary/5 dark:bg-slate-900/30" id="learn">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32 self-start">
              <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-6">
                Materi Belajar
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Siswa dibekali dengan kompetensi yang relevan dengan kebutuhan industri teknologi informasi saat ini.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-secondary dark:text-slate-200">
                  <Icon name="check_circle" className="text-primary font-bold" />
                  <span className="font-semibold">Sesuai Kurikulum SMK</span>
                </div>
                <div className="flex items-center gap-4 text-secondary dark:text-slate-200">
                  <Icon name="check_circle" className="text-primary font-bold" />
                  <span className="font-semibold">Praktik Lab Komputer</span>
                </div>
              </div>
              <Button
                variant="secondary"
                to="/learning"
                icon="arrow_forward"
                className="shadow-lg shadow-purple-900/20 group"
              >
                Buka Pusat Belajar
              </Button>
            </div>
            <div className="relative lg:w-2/3 grid sm:grid-cols-2 gap-6">
              <LoadingOverlay visible={loading} />
              {programFeatures && programFeatures.length > 0 ? (
                programFeatures.map((features, idx) => (
                  <FeatureCard key={idx} {...features} />
                ))
              ) : (
                !loading && (
                  <EmptyState />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <AchievementSection />

      {/* Prakerin Section */}
      <section className="py-24 bg-background border-y border-border/40" id="pkl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-secondary dark:text-white mb-4">
              Praktik Kerja Industri
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Siswa melaksanakan Praktik Kerja Industri (Prakerin) di berbagai instansi dan perusahaan yang relevan untuk pengalaman kerja nyata.
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <LoadingOverlay visible={loading} />
            {partnerCategories && partnerCategories.length > 0 ? (
              partnerCategories.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
              ))
            ) : (
              !loading && (
                <EmptyState />
              )
            )}
          </div>

          <div className="text-center">
            <Button
              variant="secondary"
              to="/prakerin"
              icon="arrow_forward"
              className="rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Lihat Semua Tempat Prakerin
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
