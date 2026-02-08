import { cn } from "@/lib/utils";
import Icon from "./Icon";

/**
 * Check list item with icon and text
 * @param {string} children - Item text
 * @param {string} iconColor - Icon color class
 */
export default function CheckItem({
    children,
    iconColor = "text-primary",
    className = ""
}) {
    return (
        <li className={cn("flex items-center gap-3 text-muted-foreground", className)}>
            <Icon name="check_circle" className={iconColor} size="md" />
            <span>{children}</span>
        </li>
    );
}
