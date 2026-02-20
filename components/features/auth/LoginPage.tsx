"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-10 w-full max-w-sm flex flex-col items-center gap-8 relative z-10">
                {/* Logo / Title */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-primary text-secondary rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-3xl font-bold">lan</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Admin Portal</h1>
                        <p className="text-sm text-foreground/60 mt-1">
                            Akses khusus pengurus TKJ Nesaga
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-border/40" />

                {/* Login Buttons */}
                <div className="w-full flex flex-col gap-4">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => signIn("github", { callbackUrl: "/admin" })}
                        className="w-full py-3.5 shadow-md flex items-center justify-center gap-3 !font-semibold"
                    >
                        {/* GitHub Icon (Material Symbols has no explicit Github, using a generic logo or keeping custom path) */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Masuk dengan GitHub
                    </Button>

                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => signIn("google", { callbackUrl: "/admin" })}
                        className="w-full py-3.5 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-border/50 text-foreground hover:bg-white/80 dark:hover:bg-black/40 shadow-sm flex items-center justify-center gap-3 !font-semibold"
                    >
                        {/* Google Icon */}
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Masuk dengan Google
                    </Button>
                    <a
                        href="/"
                        className="text-sm text-foreground/50 hover:text-foreground/80 transition-colors flex items-center justify-center gap-1.5 w-full py-2"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Kembali ke Home
                    </a>
                </div>

                <p className="text-xs text-foreground/40 text-center leading-relaxed max-w-[250px]">
                    Hanya akun yang ada pada whitelist yang dapat melanjutkan akses.
                </p>
            </div>
        </div>
    );
}
