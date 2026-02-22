import { Icon } from "@/components/ui/icon";

interface SectionTitleProps {
    icon: string;
    title: string;
}

export function SectionTitle({ icon, title }: SectionTitleProps) {
    return (
        <h4 className="font-bold text-md mb-3 flex items-center gap-2 text-foreground">
            <Icon name={icon} className="text-primary relative -top-[0.5px]" />
            <span className="leading-none">{title}</span>
        </h4>
    );
}
