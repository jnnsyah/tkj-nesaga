import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * Feature card for learning materials section
 */
export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group" padding="lg">
      <div className="w-12 h-12 bg-secondary/5 dark:bg-primary/10 rounded-lg flex items-center justify-center text-secondary dark:text-primary mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
        <Icon name={icon} className="font-bold" />
      </div>
      <h4 className="text-xl font-black text-secondary dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}
