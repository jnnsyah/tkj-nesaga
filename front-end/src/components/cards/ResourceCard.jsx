import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const colorVariants = {
    red: "bg-red-50 dark:bg-red-900/20 text-red-600",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
};

/**
 * Resource card for external learning resources
 * @param {string} icon - Material Symbol icon name
 * @param {string} title - Resource title
 * @param {string} description - Resource description
 * @param {string} href - Link URL
 * @param {string} color - Icon color variant
 */
export default function ResourceCard({
    icon,
    title,
    description,
    href = "#",
    color = "red"
}) {
    return (
        <Card className="group rounded-3xl" padding="md">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${colorVariants[color] || colorVariants.red}`}>
                    <Icon name={icon} size="lg" className="font-bold" />
                </div>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
