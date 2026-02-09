/**
 * Structured learning paths for TKJ curriculum.
 * Each path contains prerequisites, topics, and step-by-step modules.
 */
export const learningPaths = [
    {
        id: "basic-networking",
        icon: "hub",
        title: "Basic Networking",
        level: "Foundation",
        levelVariant: "blue",
        topics: [
            "Dasar-dasar OSI Model",
            "Pengkabelan & Topologi",
            "Konfigurasi SOHO Router"
        ],
        actionIcon: "menu_book",
        prerequisites: [
            "Pemahaman dasar komputer",
            "Minat di bidang jaringan"
        ],
        steps: [
            {
                title: "Pengenalan Jaringan Komputer",
                description: "Memahami konsep dasar jaringan, jenis-jenis jaringan (LAN, WAN, MAN), dan komponen-komponen jaringan.",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/2tWCf7AEe8c" },
                    { icon: "description", label: "Panduan Teks", to: "https://telkomuniversity.ac.id/mengenal-jaringan-komputer-definisi-fungsi-cara-kerja-dan-ragam-jenisnya/" }
                ]
            },
            {
                title: "Model OSI & TCP/IP",
                description: "Mempelajari 7 layer OSI model dan 4 layer TCP/IP serta fungsi masing-masing layer.",
                status: "available"
            },
            {
                title: "Media Transmisi & Pengkabelan",
                description: "Praktik crimping kabel UTP (straight & crossover), pengenalan fiber optik, dan wireless.",
                status: "available"
            },
            {
                title: "IP Address & Subnetting",
                description: "Memahami konsep dasar IP Address dan Subnetting.",
                status: "available"
            }
        ]
    },
    {
        id: "cisco-networking",
        icon: "router",
        title: "Cisco Networking",
        level: "Beginner",
        levelVariant: "green",
        topics: [
            "IP Addressing & Subnetting",
            "VLAN & Inter-VLAN Routing",
            "Static & Dynamic Routing"
        ],
        actionIcon: "play_circle",
        prerequisites: [
            "Konsep dasar Jaringan Komputer",
            "Pengalamatan IP & Subnetting"
        ],
        steps: [
            {
                title: "Fundamental Jaringan & CLI Cisco",
                description: "Mempelajari dasar-dasar perangkat keras Cisco dan pengenalan antarmuka baris perintah (CLI).",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video" },
                    { icon: "description", label: "Panduan Teks" }
                ]
            },
            {
                title: "Konfigurasi VLAN & Trunking",
                description: "Kumpulan tutorial untuk melakukan segmentasi jaringan menggunakan VLAN.",
                status: "available"
            },
            {
                title: "Inter-VLAN Routing",
                description: "Mengkonfigurasi routing antar VLAN menggunakan Router-on-a-Stick dan Layer 3 Switch.",
                status: "locked"
            }
        ]
    },
    {
        id: "debian-sysadmin",
        icon: "dns",
        title: "Debian Sysadmin",
        level: "Intermediate",
        levelVariant: "orange",
        topics: [
            "Linux CLI Fundamentals",
            "Web Server (Apache/Nginx)",
            "Database & Mail Configuration"
        ],
        actionIcon: "terminal",
        prerequisites: [
            "Dasar-dasar sistem operasi",
            "Pemahaman konsep jaringan"
        ],
        steps: [
            {
                title: "Instalasi & Konfigurasi Dasar Debian",
                description: "Instalasi Debian Server, konfigurasi jaringan statis, dan manajemen paket dengan APT.",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video" },
                    { icon: "terminal", label: "Lab Praktik" }
                ]
            },
            {
                title: "Web Server Apache/Nginx",
                description: "Instalasi dan konfigurasi web server, virtual host, dan SSL/TLS.",
                status: "available"
            },
            {
                title: "Database Server MySQL/MariaDB",
                description: "Setup database server, manajemen user, backup dan restore database.",
                status: "locked"
            }
        ]
    }
];

/**
 * Retrieve a learning path by its unique identifier.
 * @param {string} id - Learning path ID
 * @returns {Object|undefined} Learning path or undefined
 */
export function getLearningPathById(id) {
    return learningPaths.find(path => path.id === id);
}
