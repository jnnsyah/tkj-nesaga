import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

/**
 * Category card for Prakerin section
 * @param {string} icon - Material Symbol icon name
 * @param {string} title - Category title
 * @param {string} subtitle - Category subtitle
 */
export default function CategoryCard({ icon, title, subtitle }) {
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
