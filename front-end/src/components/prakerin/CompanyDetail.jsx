import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import ReviewCard from "@/components/cards/ReviewCard";

/**
 * Company detail view for Prakerin page
 * @param {object} company - Company data object
 * @param {function} onClose - Close handler for mobile
 */
export default function CompanyDetail({ company, onClose }) {
    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Icon name="touch_app" size="2xl" className="mb-4 opacity-50" />
                <p>Pilih tempat prakerin untuk melihat detail</p>
            </div>
        );
    }

    const { name, verified, address, phone, email, description, reviews } = company;

    return (
        <>
            {/* Header */}
            <div className="p-8 border-b border-border bg-gradient-to-r from-background to-secondary/5 relative">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 p-2 bg-secondary/10 rounded-full hover:bg-secondary/20"
                    >
                        <Icon name="close" />
                    </button>
                )}
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-primary shadow-lg shrink-0">
                        <Icon name="business" size="2xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-3xl font-bold text-secondary dark:text-white">
                                {name}
                            </h2>
                            {verified && (
                                <Icon
                                    name="verified"
                                    className="text-blue-500"
                                    filled
                                />
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Icon name="location_on" size="md" />
                                <p className="text-sm">{address}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-6">
                                <ContactItem icon="call" value={phone} />
                                <ContactItem icon="mail" value={email} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {/* Description */}
                <div className="mb-10">
                    <SectionTitle icon="description" title="Deskripsi" />
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Map Placeholder */}
                <div className="mb-10">
                    <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative border-4 border-card shadow-lg flex items-center justify-center">
                        <Icon name="map" size="xl" className="text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground font-bold">
                            Map Placeholder
                        </span>
                    </div>
                </div>

                {/* Reviews */}
                {reviews && reviews.length > 0 && (
                    <div>
                        <SectionTitle icon="star" title="Ulasan Kakak Kelas" />
                        <div className="space-y-6">
                            {reviews.map((review, idx) => (
                                <ReviewCard key={idx} {...review} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// Helper: Contact info item
function ContactItem({ icon, value }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center shadow-sm">
                <Icon name={icon} size="sm" />
            </div>
            <span className="text-sm font-semibold tracking-wide">{value}</span>
        </div>
    );
}

// Helper: Section title with icon
function SectionTitle({ icon, title }) {
    return (
        <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-secondary dark:text-primary">
            <Icon name={icon} />
            {title}
        </h4>
    );
}
