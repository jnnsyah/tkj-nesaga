// Schema migration: Updated props to match new schema.
// - icon, levelVariant, actionIcon now come from domain relation
// - level is now a relation object { name, color }
// - topics is now { id, topic }[] instead of string[]

"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { CheckItem } from "@/components/ui/check-item";

type BadgeVariant = "default" | "blue" | "green" | "orange" | "primary" | "secondary";

interface LearningPathCardProps {
  id: string;
  title: string;
  level: { name: string; color: string };
  topics?: { id: number; topic: string }[];
  domain?: {
    icon: string;
    levelVariant: string;
    actionIcon?: string;
  };
}

/**
 * Learning path card for LearningHubPage
 */
export function LearningPathCard({
  id,
  title,
  level,
  topics = [],
  domain,
}: LearningPathCardProps) {
  const icon = domain?.icon ?? "school";
  const levelVariant = domain?.levelVariant ?? "blue";
  const actionIcon = domain?.actionIcon ?? "menu_book";

  return (
    <Card className="group rounded-3xl" padding="lg">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-primary/20 rounded-2xl">
          <Icon name={icon} size="xl" className="text-primary" />
        </div>
        <Badge variant={levelVariant as BadgeVariant}>{level.name}</Badge>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">
        {title}
      </h3>

      <ul className="space-y-3 mb-8">
        {topics.map((t) => (
          <CheckItem key={t.id}>{t.topic}</CheckItem>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          href={`/learning/path/${id}`}
          className="bg-primary text-secondary px-8 py-3 rounded-2xl font-bold flex-1 hover:brightness-105 transition-all text-center"
        >
          Alur Belajar
        </Link>
        <button className="bg-secondary/5 text-secondary dark:text-white p-3 rounded-2xl hover:bg-primary/20 transition-colors">
          <Icon name={actionIcon} />
        </button>
      </div>
    </Card>
  );
}
