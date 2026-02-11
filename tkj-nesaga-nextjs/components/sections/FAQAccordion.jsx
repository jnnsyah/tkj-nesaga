"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

/**
 * FAQ Accordion item with expand/collapse
 * @param {string} question - Question text
 * @param {string} answer - Answer text (optional for collapsed items)
 * @param {boolean} defaultOpen - Start in open state
 */
export default function FAQAccordion({
    question,
    answer,
    defaultOpen = false
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const hasAnswer = Boolean(answer);

    return (
        <div className={cn(
            "border rounded-2xl overflow-hidden bg-card",
            isOpen ? "border-primary/30" : "border-border"
        )}>
            <button
                className={cn(
                    "w-full p-6 text-left flex justify-between items-center transition-colors",
                    isOpen ? "bg-primary/10" : "hover:bg-secondary/5"
                )}
                onClick={() => hasAnswer && setIsOpen(!isOpen)}
            >
                <span className="font-bold text-lg text-secondary dark:text-white">
                    {question}
                </span>
                <Icon
                    name={isOpen ? "expand_less" : "expand_more"}
                    className={!hasAnswer ? "text-muted-foreground" : ""}
                />
            </button>

            {isOpen && answer && (
                <div className="p-6 bg-card dark:bg-secondary/10">
                    <p className="leading-relaxed text-muted-foreground">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}
