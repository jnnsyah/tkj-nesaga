"use client"
import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 mt-10 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">TKJ Nesaga - Growing together</p>

        <div className="flex items-center justify-center gap-2 mt-2 text-sm">
          <span>Developed by</span>
          <Link
            href="https://instagram.com/jnnsyah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>Rama Jiansyah</span>
          </Link>
          <Link
            href="https://instagram.com/zlfrts_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            <Instagram className="w-4 h-4" />
            <span>Andryan Zulfi</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
