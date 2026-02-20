import { Icon } from "@/components/ui/icon";

interface ContactItemProps {
    icon: string;
    value: string;
}

export function ContactItem({ icon, value }: ContactItemProps) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center shadow-sm">
                <Icon name={icon} size="sm" className="relative -top-[0.5px]" />
            </div>
            <span className="text-sm font-semibold tracking-wide leading-none">{value}</span>
        </div>
    );
}
