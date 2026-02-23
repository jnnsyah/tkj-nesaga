import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return "/login";

            // Cek apakah email terdaftar di AdminUser
            const adminUser = await prisma.adminUser.findUnique({
                where: { email: user.email },
            });

            if (!adminUser || !adminUser.isActive) {
                return "/login";
            }

            // Update fullName, lastLogin, dan status saat login
            await prisma.adminUser.update({
                where: { email: user.email },
                data: {
                    fullName: user.name || adminUser.fullName,
                    lastLogin: new Date(),
                    status: "ACTIVE",
                },
            });

            return true;
        },
        async jwt({ token, user }) {
            // Saat pertama kali login (user object tersedia), ambil data role dari DB
            if (user?.email) {
                const adminUser = await prisma.adminUser.findUnique({
                    where: { email: user.email },
                    select: { id: true, role: true },
                });
                if (adminUser) {
                    token.role = adminUser.role;
                    token.userId = adminUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role) {
                session.user.role = token.role as "ADMIN" | "SUPERADMIN";
            }
            if (token.userId) {
                session.user.id = token.userId as string;
            }
            return session;
        },
    },
});