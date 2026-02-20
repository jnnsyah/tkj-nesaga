"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-8 md:p-12 max-w-lg w-full text-center flex flex-col items-center gap-6">

                {/* Animated Icon */}
                <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
                    <span className="material-symbols-outlined text-4xl">error</span>
                </div>

                <div>
                    <h1 className="text-3xl font-extrabold text-foreground mb-3">Oops! Terjadi Kesalahan</h1>
                    <p className="text-foreground/70 text-sm md:text-base">
                        Sepertinya ada yang salah di sistem kami. Coba muat ulang halaman ini atau kembali ke beranda.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-3 mt-4">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => reset()}
                        className="w-full"
                        icon="refresh"
                        iconPosition="left"
                    >
                        Coba Lagi
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        to="/"
                        className="w-full"
                        icon="home"
                        iconPosition="left"
                    >
                        Ke Beranda
                    </Button>
                </div>
            </div>
        </div>
    );
}
