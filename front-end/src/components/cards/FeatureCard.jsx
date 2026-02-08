import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

/**
 * Feature card for learning materials section
 * @param {string} icon - Material Symbol icon name
 * @param {string} title - Card title
 * @param {string} description - Card description
 */
export default function FeatureCard({ icon, title, description }) {
    return (
        <Card className="group" padding="lg">
            <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center text-secondary mb-6 group-hover:bg-primary transition-colors">
                <Icon name={icon} className="font-bold" />
            </div>
            <h4 className="text-xl font-black text-secondary dark:text-white mb-2">
                {title}
            </h4>
            <p className="text-muted-foreground">{description}</p>
        </Card>
    );
}
