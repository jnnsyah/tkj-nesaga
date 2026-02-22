import { Icon } from "@/components/ui/icon";

export interface TimelineCardProps {
    icon: string;
    title: string;
    description: string;
    isCenter?: boolean;
}

export function TimelineCard({ icon, title, description, isCenter = false }: TimelineCardProps) {
    return (
        <div className="flex flex-col items-center text-center px-4 group">
            <div className={`
        rounded-full flex items-center justify-center mb-6 shadow-lg z-10 
        transition-transform group-hover:scale-110
        ${isCenter
                    ? "w-24 h-24 bg-primary border-4 border-secondary shadow-xl md:-mt-2"
                    : "w-20 h-20 bg-card border-4 border-secondary"
                }
      `}>
                <Icon
                    name={icon}
                    size={isCenter ? "xl" : "lg"}
                    className="text-secondary font-bold"
                />
            </div>
            <h3 className="font-bold text-lg mb-3 text-secondary dark:text-primary">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}
