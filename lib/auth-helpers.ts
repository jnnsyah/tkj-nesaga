import { auth } from "@/auth";

export type CurrentUser = {
    id: string;
    email: string;
    role: "ADMIN" | "SUPERADMIN";
    name?: string | null;
};

/**
 * Get the current authenticated user from the session.
 * Returns null if the user is not authenticated.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    const session = await auth();
    if (!session?.user?.email || !session?.user?.role) {
        return null;
    }
    return {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        name: session.user.name,
    };
}

/**
 * Require authentication and return the current user.
 * Throws a Response-like object if not authenticated.
 */
export async function requireAuth(): Promise<CurrentUser> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}
