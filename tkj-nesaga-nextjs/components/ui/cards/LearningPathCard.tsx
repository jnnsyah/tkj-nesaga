"use client"

import Link from "next/link"
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import CheckItem from "@/components/ui/CheckItem";

// Need to match Variant from Badge.tsx, but since we can't import types easily without exporting them cleanly or using 'typeof', I'll redefine or use string for now if Badge doesn't export it.
// Checking Badge.tsx again... I didn't export Variant type.
// I'll assume string is fine or just redefine the union.
type BadgeVariant = "default" | "blue" | "green" | "orange" | "primary" | "secondary";

interface LearningPathCardProps {
  id: string;
  icon: string;
  title: string;
  level: string;
  levelVariant?: string;
  topics?: string[];
  actionIcon?: string;
}

/**
 * Learning path card for LearningHubPage
 */
export default function LearningPathCard({
  id,
  icon,
  title,
  level,
  levelVariant = "blue",
  topics = [],
  actionIcon = "menu_book"
}: LearningPathCardProps) {
  return (
    <Card className="group rounded-3xl" padding="lg">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-primary/20 rounded-2xl">
          <Icon name={icon} size="xl" className="text-primary" />
        </div>
        <Badge variant={levelVariant as any}>{level}</Badge>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">
        {title}
      </h3>

      <ul className="space-y-3 mb-8">
        {topics.map((topic, idx) => (
          <CheckItem key={idx}>{topic}</CheckItem>
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
