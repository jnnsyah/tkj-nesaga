import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

/**
 * Review card for displaying user reviews
 * @param {string} name - Reviewer name
 * @param {string} role - Reviewer role/period
 * @param {string} initial - Avatar initials
 * @param {number} rating - Rating out of 5
 * @param {string} text - Review text
 */
export default function ReviewCard({ name, role, initial, rating, text }) {
    return (
        <div className="bg-secondary/5 p-6 rounded-2xl border border-border">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center font-bold text-lg shadow-md">
                        {initial}
                    </div>
                    <div>
                        <p className="font-bold text-sm text-secondary dark:text-white">
                            {name}
                        </p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                </div>
                <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                        <Icon
                            key={i}
                            name="star"
                            size="sm"
                            filled
                            className={cn(
                                i < rating ? "text-primary" : "text-muted"
                            )}
                        />
                    ))}
                </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4 py-1">
                "{text}"
            </p>
        </div>
    );
}
