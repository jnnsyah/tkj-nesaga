export function HeroGraphic() {
    return (
        <div className="relative flex justify-center items-center animate-in fade-in zoom-in duration-1000 w-full">
            <div className="relative w-full aspect-square flex items-center justify-center globe-grid rounded-full">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl lg:blur-3xl opacity-50" />

                <div className="relative z-10 w-[90%] h-[90%] text-secondary dark:text-primary transition-transform hover:scale-105 duration-700">
                    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-20" cx="100" cy="100" fill="none" r="90" stroke="currentColor" strokeDasharray="4 2" strokeWidth="0.5" />
                        <circle cx="100" cy="100" fill="none" r="85" stroke="currentColor" strokeWidth="1.5" />
                        <ellipse className="opacity-60" cx="100" cy="100" fill="none" rx="85" ry="30" stroke="currentColor" strokeWidth="1" />
                        <ellipse className="opacity-40" cx="100" cy="100" fill="none" rx="85" ry="60" stroke="currentColor" strokeWidth="0.8" />
                        <ellipse className="opacity-60" cx="100" cy="100" fill="none" rx="30" ry="85" stroke="currentColor" strokeWidth="1" />
                        <ellipse className="opacity-40" cx="100" cy="100" fill="none" rx="60" ry="85" stroke="currentColor" strokeWidth="0.8" />
                        <line className="opacity-60" stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="15" y2="185" />
                        <line className="opacity-60" stroke="currentColor" strokeWidth="1" x1="15" x2="185" y1="100" y2="100" />
                        <circle cx="100" cy="15" fill="currentColor" r="3" />
                        <circle cx="100" cy="185" fill="currentColor" r="3" />
                        <circle cx="15" cy="100" fill="currentColor" r="3" />
                        <circle cx="185" cy="100" fill="currentColor" r="3" />
                        <circle cx="145" cy="50" fill="currentColor" r="2.5" />
                        <circle cx="55" cy="150" fill="currentColor" r="2.5" />
                        <circle cx="160" cy="140" fill="currentColor" r="2" />
                        <circle cx="40" cy="60" fill="currentColor" r="2" />
                        <path className="opacity-50" d="M145 50 Q 120 75 100 100" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5" />
                        <path className="opacity-50" d="M55 150 Q 80 125 100 100" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
