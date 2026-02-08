import Icon from "@/components/ui/Icon";
import DownloadCard from "@/components/cards/DownloadCard";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { faqItems, downloads, timelineSteps } from "@/data/faqItems";

export default function PanduanPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 max-w-6xl mx-auto">
            {/* Hero */}
            <section className="text-center mb-24">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-secondary dark:text-primary">
                    Panduan Sukses Prakerin TKJ
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Peta jalan, dokumen wajib, dan solusi masalah saat terjun ke industri.
                </p>
            </section>

            {/* Timeline */}
            <section className="mb-32">
                <h2 className="text-2xl font-bold mb-16 text-center text-secondary dark:text-foreground">
                    Alur Perjalananmu
                </h2>
                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute top-[40px] left-[10%] right-[10%] h-1 bg-border hidden md:block z-0" />
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {timelineSteps.map((step, idx) => (
                            <TimelineCard key={idx} {...step} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Downloads */}
            <section className="mb-32">
                <h2 className="text-2xl font-bold mb-10 text-center text-secondary dark:text-foreground">
                    Survival Kit — Download Area
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {downloads.map((item, idx) => (
                        <DownloadCard key={idx} {...item} />
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-secondary dark:text-foreground">
                    <Icon name="medical_services" className="text-red-500" />
                    P3K: Pertolongan Pertama — FAQ
                </h2>
                <div className="space-y-4">
                    {faqItems.map((item, idx) => (
                        <FAQAccordion key={idx} {...item} />
                    ))}
                </div>
            </section>
        </div>
    );
}

// Timeline card component for Panduan page
function TimelineCard({ icon, title, description, size = "normal", highlight = false }) {
    const isLarge = size === "large" || highlight;

    return (
        <div className="flex flex-col items-center text-center px-4 group">
            <div className={`
                rounded-full flex items-center justify-center mb-6 shadow-lg z-10 
                transition-transform group-hover:scale-110
                ${isLarge
                    ? "w-24 h-24 bg-primary border-4 border-secondary shadow-xl md:-mt-2"
                    : "w-20 h-20 bg-card border-4 border-secondary"
                }
            `}>
                <Icon
                    name={icon}
                    size={isLarge ? "xl" : "lg"}
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
