/**
 * Structured learning paths for TKJ curriculum.
 * Each path contains prerequisites, topics, and step-by-step modules.
 */
export const learningPaths = [
    {
        id: "basic-networking",
        icon: "hub",
        title: "Dasar Jaringan Komputer",
        level: "Foundation",
        levelVariant: "blue",
        topics: [
            "OSI Layer & TCP/IP",
            "IP Address",
            "Subnetting Address"
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
                    { icon: "play_circle", label: "Panduan Video (1)", to: "https://youtu.be/2tWCf7AEe8c" },
                    { icon: "play_circle", label: "Panduan Video (2)", to: "https://youtu.be/in97LOmns74" },
                    { icon: "description", label: "Panduan Teks", to: "https://telkomuniversity.ac.id/mengenal-jaringan-komputer-definisi-fungsi-cara-kerja-dan-ragam-jenisnya/" }
                ]
            },
            {
                title: "Model OSI & TCP/IP",
                description: "Mempelajari 7 layer OSI model dan 4 layer TCP/IP serta fungsi masing-masing layer.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/3g1Bh7PmK-s" },
                ]
            },
            {
                title: "IP Address & MAC Address",
                description: "Mempelajari IP Address dan MAC Address.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/mv6SQQIyw6A" },
                ]
            },
            {
                title: "IP Public & IP Private",
                description: "Memahami konsep dasar IP Public dan IP Private.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/GnaeX2OQTNU" },
                ]
            },
            {
                title: "Subnetting Address",
                description: "Membagi IP Address menjadi beberapa subnet.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/ogIrAUnPZJY" },
                ]
            }
        ],
        recommendations: [
            {
                icon: "play_circle",
                title: "ID Network",
                description: "Playlist dasar jaringan komputer yang mudah dipahami untuk pemula.",
                href: "https://www.youtube.com/playlist?list=PLbLqbqNn7VYraPWWgO4UEUA07lK4iZCRF",
                color: "red"
            },
            {
                icon: "play_circle",
                title: "Practical Networking Channel",
                description: "Playlist dasar jaringan komputer yang cukup lengkap.",
                href: "https://www.youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi",
                color: "red"
            },
            {
                icon: "play_circle",
                title: "Aji Diyantoro Channel",
                description: "Playlist dasar jaringan komputer yang dibawakan dengan bahasa Indonesia dan cukup mendetail.",
                href: "https://www.youtube.com/playlist?list=PLiqv0ZJPMZsLNljfNaZ7TYwASbWSAqTXy",
                color: "red"
            }
        ]
    },
    {
        id: "cisco-packet-tracer",
        icon: "router",
        title: "Praktik di Cisco Packet Tracer",
        level: "Beginner",
        levelVariant: "green",
        topics: [
            "IP Addressing & Subnetting",
            "VLAN & Inter-VLAN Routing",
            "Static Routing",
            "Dynamic Routing"
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
                description: "Tutorial segmentasi jaringan menggunakan VLAN dan trunking di switch Cisco.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Static Routing",
                description: "Mengonfigurasi routing statis antar jaringan menggunakan router Cisco.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Dynamic Routing",
                description: "Pengantar routing dinamis (EIGRP/OSPF) pada router Cisco.",
                status: "locked",
                mediaType: "Video"
            }
        ],
        recommendations: [
            {
                icon: "school",
                title: "CCNA v7 Intro to Networks",
                description: "Kursus fundamental CCNA untuk persiapan sertifikasi internasional.",
                href: "https://www.netacad.com/courses/networking/ccna-introduction-networks",
                color: "blue"
            },
            {
                icon: "terminal",
                title: "Packet Tracer Tutorials",
                description: "Kumpulan tutorial simulasi jaringan menggunakan Cisco Packet Tracer.",
                href: "https://www.youtube.com/playlist?list=PLh94XW3R96R8O3U_Vsh_bXqA_rVbXvX5r",
                color: "orange"
            }
        ]
    },
    {
        id: "mikrotik",
        icon: "router",
        title: "MikroTik Jaringan",
        level: "Beginner",
        levelVariant: "green",
        topics: [
            "Pengenalan MikroTik & RouterOS",
            "Konfigurasi Dasar Mikrotik",
            "Hotspot Mikrotik",
            "DHCP Server di Mikrotik"
        ],
        actionIcon: "play_circle",
        prerequisites: [
            "Dasar-dasar Jaringan Komputer",
            "Pengantar Linux CLI"
        ],
        steps: [
            {
                title: "Pengenalan MikroTik & RouterOS",
                description: "Mengenal perangkat MikroTik dan sistem operasi RouterOS, termasuk fitur dasar dan aplikasi Winbox.",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video" },
                    { icon: "description", label: "Panduan Teks" }
                ]
            },
            {
                title: "Konfigurasi Dasar Mikrotik",
                description: "Mengkonfigurasi alamat IP dasar dan setting jaringan menggunakan Mikrotik.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Konfigurasi Hotspot Mikrotik",
                description: "Membuat layanan Hotspot untuk manajemen akses pengguna pada jaringan Mikrotik.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Konfigurasi DHCP Server",
                description: "Menerapkan DHCP Server pada Mikrotik untuk alokasi alamat IP otomatis.",
                status: "locked",
                mediaType: "Video"
            }
        ],
        recommendations: [
            {
                icon: "school",
                title: "MikroTik Official Wiki",
                description: "Dokumentasi resmi MikroTik untuk konfigurasi RouterOS.",
                href: "https://wiki.mikrotik.com",
                color: "blue"
            },
            {
                icon: "play_circle",
                title: "MTCNA Video Series",
                description: "Video tutorial persiapan sertifikasi MikroTik Certified Network Associate.",
                href: "https://www.youtube.com/results?search_query=mtcna+tutorial",
                color: "orange"
            },
            {
                icon: "school",
                title: "Kursus Dasar MikroTik",
                description: "Kursus online dasar MikroTik untuk pemula.",
                href: "https://www.udemy.com/topic/mikrotik/",
                color: "red"
            }
        ]
    },
    {
        id: "linux",
        icon: "computer",
        title: "Linux Dasar",
        level: "Intermediate",
        levelVariant: "orange",
        topics: [
            "Linux CLI Dasar",
            "Manajemen File & Permission",
            "Jaringan di Linux",
            "Shell Scripting Dasar"
        ],
        actionIcon: "terminal",
        prerequisites: [
            "Dasar-dasar Sistem Operasi",
            "Pemahaman Konsep Jaringan"
        ],
        steps: [
            {
                title: "Instalasi & Pengenalan Linux",
                description: "Instalasi sistem Linux (misalnya Debian/Ubuntu) dan pengenalan antarmuka baris perintah (CLI).",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video" },
                    { icon: "description", label: "Panduan Teks" }
                ]
            },
            {
                title: "Dasar CLI & Perintah Linux",
                description: "Mempelajari perintah dasar Linux (ls, cd, cp, mv, rm, dll) dan navigasi sistem file.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Manajemen User & File System",
                description: "Mengelola pengguna (user, group) dan izin akses file pada Linux.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Jaringan & Skrip Dasar",
                description: "Konfigurasi jaringan sederhana (IP statis, DNS) dan penulisan skrip shell dasar.",
                status: "locked",
                mediaType: "Video"
            }
        ],
        recommendations: [
            {
                icon: "terminal",
                title: "Debian Official Wiki",
                description: "Dokumentasi terlengkap untuk administrasi sistem operasi Debian.",
                href: "https://wiki.debian.org/",
                color: "red"
            },
            {
                icon: "school",
                title: "Tutorial Linux untuk Pemula",
                description: "Seri panduan dasar Linux untuk pemula.",
                href: "https://www.tutorialspoint.com/unix/index.htm",
                color: "green"
            },
            {
                icon: "play_circle",
                title: "Linux SysAdmin Course",
                description: "Kursus lengkap administrasi sistem Linux dari dasar.",
                href: "https://www.youtube.com/playlist?list=PLmX6p8q7W7OqJov_GshA4mCizp7XQY23p",
                color: "green"
            }
        ]
    },
    {
        id: "debian-sysadmin",
        icon: "dns",
        title: "Praktik SysAdmin Debian",
        level: "Intermediate",
        levelVariant: "orange",
        topics: [
            "Instalasi & Konfigurasi Debian",
            "Web Server (Apache/Nginx)",
            "Database Server (MySQL/MariaDB)",
            "Mail Server (Postfix/Dovecot)"
        ],
        actionIcon: "terminal",
        prerequisites: [
            "Dasar-dasar Sistem Operasi",
            "Pengalaman Linux CLI"
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
                status: "available"
            },
            {
                title: "Mail Server Postfix & Dovecot",
                description: "Konfigurasi layanan email (SMTP/IMAP) pada Debian.",
                status: "locked"
            }
        ],
        recommendations: [
            {
                icon: "terminal",
                title: "Debian Official Wiki",
                description: "Dokumentasi terlengkap untuk administrasi sistem operasi Debian.",
                href: "https://wiki.debian.org/",
                color: "red"
            },
            {
                icon: "play_circle",
                title: "Linux SysAdmin Course",
                description: "Kursus lengkap administrasi sistem Linux dari dasar.",
                href: "https://www.youtube.com/playlist?list=PLmX6p8q7W7OqJov_GshA4mCizp7XQY23p",
                color: "green"
            }
        ]
    },
    {
        id: "algoritma-pemrograman",
        icon: "code",
        title: "Algoritma & Pemrograman",
        level: "Beginner",
        levelVariant: "green",
        topics: [
            "Algoritma & Flowchart",
            "Dasar Pemrograman Python",
            "Kontrol Percabangan & Perulangan",
            "Fungsi & Modul Python"
        ],
        actionIcon: "code",
        prerequisites: [
            "Minat pada pemrograman",
            "Logika Matematika Dasar"
        ],
        steps: [
            {
                title: "Pengenalan Algoritma & Flowchart",
                description: "Memahami konsep dasar algoritma dan pembuatan flowchart untuk pemecahan masalah.",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Panduan Video" },
                    { icon: "description", label: "Panduan Teks" }
                ]
            },
            {
                title: "Dasar Pemrograman Python",
                description: "Instalasi Python, penjelasan sintaks dasar, dan program pertama (*Hello World*).",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Percabangan & Perulangan di Python",
                description: "Kontrol logika dengan *if/else*, *for*, dan *while* di Python.",
                status: "available",
                mediaType: "Video"
            },
            {
                title: "Fungsi dan Modul Python",
                description: "Penggunaan fungsi, argumen, dan modul untuk menyusun kode terstruktur.",
                status: "locked",
                mediaType: "Video"
            }
        ],
        recommendations: [
            {
                icon: "code",
                title: "Python Official Tutorial",
                description: "Dokumentasi resmi Python untuk belajar bahasa pemrograman ini.",
                href: "https://docs.python.org/3/tutorial/",
                color: "blue"
            },
            {
                icon: "school",
                title: "Belajar Python Dasar",
                description: "Tutorial pemrograman Python untuk pemula.",
                href: "https://www.programiz.com/python-programming",
                color: "green"
            },
            {
                icon: "play_circle",
                title: "Python Tutorial (freeCodeCamp)",
                description: "Video kursus Python lengkap untuk pemula.",
                href: "https://www.youtube.com/watch?v=rfscVS0vtbw",
                color: "red"
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
