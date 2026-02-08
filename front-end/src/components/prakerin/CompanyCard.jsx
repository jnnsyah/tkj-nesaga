import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

/**
 * Company card for Prakerin list view
 * @param {object} company - Company data object
 * @param {boolean} isSelected - Whether this card is selected
 * @param {boolean} isGridView - Whether displaying in grid view
 * @param {function} onClick - Click handler
 */
export default function CompanyCard({
    company,
    isSelected = false,
    isGridView = false,
    onClick
}) {
    const { name, category, verified, shortDesc } = company;

    return (
        <div
            onClick={onClick}
            className={cn(
                "p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] group h-fit",
                isSelected
                    ? "bg-card border-l-8 border-l-primary shadow-lg border-y-border border-r-border"
                    : "bg-card/50 border-border hover:border-primary/50",
                isGridView && "hover:shadow-md bg-card"
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-[10px]">
                    {category}
                </Badge>
                {verified && (
                    <Icon
                        name="verified"
                        className="text-primary"
                        title="Verified"
                    />
                )}
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                {name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
                {shortDesc}
            </p>
        </div>
    );
}
