"use client"

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const colorVariants = {
  red: "bg-red-50 dark:bg-red-900/20 text-red-600",
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
  green: "bg-green-50 dark:bg-green-900/20 text-green-600",
  orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
} as const;

type ColorVariant = keyof typeof colorVariants;

interface ResourceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  color?: string; // Changed from ColorVariant to string to allow matching with data
}

/**
 * Resource card for external learning resources
 */
export default function ResourceCard({
  icon,
  title,
  description,
  href = "#",
  color = "red"
}: ResourceCardProps) {
  const variantClass = colorVariants[color as ColorVariant] || colorVariants.red;

  return (
    <Card className="group rounded-3xl" padding="md">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${variantClass}`}>
          <Icon name={icon} size="lg" className="font-bold" />
        </div>
        <a
          href={href}
          className="bg-secondary/5 p-2 rounded-full group-hover:bg-primary group-hover:text-secondary transition-all"
        >
          <Icon name="arrow_forward" size="md" className="block" />
        </a>
      </div>
      <h4 className="text-lg font-bold mb-2 text-secondary dark:text-white">
        {title}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
