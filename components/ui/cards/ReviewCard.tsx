// Schema migration: Updated to match CompanyReview schema (name, text, academicYear).
// Removed role, initial, and rating fields that no longer exist in the schema.

"use client"

import Icon from "@/components/ui/Icon";

export interface ReviewCardProps {
  name: string;
  text: string;
  academicYear: string;
}

/**
 * Review card for displaying user reviews
 */
export default function ReviewCard({ name, academicYear, text }: ReviewCardProps) {
  return (
    <div className="bg-secondary/5 p-6 rounded-2xl border border-border">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center shadow-sm">
            <Icon name="person" size="lg" />
          </div>
          <div>
            <p className="font-bold text-sm text-secondary dark:text-white">
              {name}
            </p>
            <span className="text-xs text-muted-foreground">
              Periode {academicYear}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4 py-1">
        &quot;{text}&quot;
      </p>
    </div>
  );
}
