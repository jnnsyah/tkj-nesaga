import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import CheckItem from "@/components/ui/CheckItem";

/**
 * Learning path card for LearningHubPage
 * @param {string} id - Path ID for routing
 * @param {string} icon - Material Symbol icon name
 * @param {string} title - Path title
 * @param {string} level - Difficulty level
 * @param {string} levelVariant - Badge color variant
 * @param {Array} topics - List of topic strings
 * @param {string} actionIcon - Secondary action icon
 */
export default function LearningPathCard({
    id,
    icon,
    title,
    level,
    levelVariant = "blue",
    topics = [],
    actionIcon = "menu_book"
}) {
    return (
        <Card className="group rounded-3xl" padding="lg">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-primary/20 rounded-2xl">
                    <Icon name={icon} size="xl" className="text-primary" />
                </div>
                <Badge variant={levelVariant}>{level}</Badge>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-white">
                {title}
            </h3>

            <ul className="space-y-3 mb-8">
                {topics.map((topic, idx) => (
                    <CheckItem key={idx}>{topic}</CheckItem>
                ))}
            </ul>

            <div className="flex items-center gap-3">
                <Link
                    to={`/learning/path/${id}`}
                    className="bg-primary text-secondary px-8 py-3 rounded-2xl font-bold flex-1 hover:brightness-105 transition-all text-center"
                >
                    Alur Belajar
                </Link>
                <button className="bg-secondary/5 text-secondary dark:text-white p-3 rounded-2xl hover:bg-primary/20 transition-colors">
                    <Icon name={actionIcon} />
                </button>
            </div>
        </Card>
    );
}
