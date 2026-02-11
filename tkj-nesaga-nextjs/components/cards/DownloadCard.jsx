"use client"

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

/**
 * Download card for downloadable resources
 * @param {string} title - File title
 * @param {string} ext - File extension
 * @param {string} icon - Material Symbol icon name
 * @param {string} href - Download URL
 */
export default function DownloadCard({
    title,
    ext,
    icon = "description",
    href = "#"
}) {
    return (
        <Card
            className="group rounded-3xl flex flex-col items-center text-center hover:shadow-xl"
            padding="lg"
        >
            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                <Icon name={icon} size="xl" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-secondary dark:text-white">
                {title}
            </h3>
            <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold">
                {ext}
            </p>
            <Button
                variant="primary"
                icon="download"
                iconPosition="left"
                className="w-full"
                onClick={() => window.open(href)}
            >
                Unduh
            </Button>
        </Card>
    );
}
