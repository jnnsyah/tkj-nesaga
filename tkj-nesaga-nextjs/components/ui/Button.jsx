"use client";

import Link from "next/link"
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const variantClasses = {
    primary: "bg-primary text-secondary font-bold hover:brightness-105 shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-white font-bold hover:bg-secondary/90 shadow-lg hover:shadow-xl",
    ghost: "bg-secondary/5 text-secondary dark:text-white hover:bg-primary/20",
    outline: "border border-border bg-transparent hover:bg-secondary/5"
};

const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
};

/**
 * Reusable Button component with variants
 * @param {string} variant - Style variant: primary, secondary, ghost, outline
 * @param {string} size - Size: sm, md, lg
 * @param {string} to - If provided, renders as Link
 * @param {string} icon - Optional icon name
 * @param {string} iconPosition - Icon position: left, right
 */
export default function Button({
    variant = "primary",
    size = "md",
    to,
    icon,
    iconPosition = "right",
    children,
    className = "",
    ...props
}) {
    const baseClasses = cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
    );

    const content = (
        <>
            {icon && iconPosition === "left" && <Icon name={icon} size="sm" />}
            {children}
            {icon && iconPosition === "right" && <Icon name={icon} size="sm" />}
        </>
    );

    if (to) {
        return (
            <Link href={to} className={baseClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={baseClasses} {...props}>
            {content}
        </button>
    );
}
