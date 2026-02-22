import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface CategoryCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

/**
 * Category card for Prakerin section
 */
export function CategoryCard({ icon, title, subtitle }: CategoryCardProps) {
  return (
    <Card
      className="group text-center cursor-default hover:shadow-xl"
      padding="md"
    >
      <Icon
        name={icon}
        size="lg"
        className="text-secondary dark:text-primary mb-3 block"
      />
      <h5 className="font-black text-xs uppercase tracking-widest text-secondary dark:text-white">
        {title}
      </h5>
      <p className="text-[10px] text-muted-foreground mt-1">{subtitle}</p>
    </Card>
  );
}
