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
            "Topologi Jaringan",
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
                    { icon: "play_circle", label: "Panduan Video (1)", to: "https://youtu.be/in97LOmns74" },
                    { icon: "play_circle", label: "Panduan Video (2)", to: "https://youtu.be/2tWCf7AEe8c" },
                    { icon: "description", label: "Panduan Teks", to: "https://telkomuniversity.ac.id/mengenal-jaringan-komputer-definisi-fungsi-cara-kerja-dan-ragam-jenisnya/" }
                ]
            },
            {
                title: "Topologi Jaringan",
                description: "Mempelajari topologi jaringan dan jenis-jenisnya.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/mWZcLpuCQos" },
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
                title: "ID Networkers",
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
    // {
    //     id: "cisco-packet-tracer",
    //     icon: "router",
    //     title: "Praktik di Cisco Packet Tracer",
    //     level: "Beginner",
    //     levelVariant: "green",
    //     topics: [
    //         "IP Addressing & Subnetting",
    //         "VLAN & Inter-VLAN Routing",
    //         "Static Routing",
    //         "Dynamic Routing"
    //     ],
    //     actionIcon: "play_circle",
    //     prerequisites: [
    //         "Konsep dasar Jaringan Komputer",
    //         "Pengalamatan IP & Subnetting"
    //     ],
    //     steps: [
    //         {
    //             title: "Fundamental Jaringan & CLI Cisco",
    //             description: "Mempelajari dasar-dasar perangkat keras Cisco dan pengenalan antarmuka baris perintah (CLI).",
    //             status: "current",
    //             mediaType: "Video & Teks",
    //             actions: [
    //                 { icon: "play_circle", label: "Panduan Video" },
    //                 { icon: "description", label: "Panduan Teks" }
    //             ]
    //         },
    //         {
    //             title: "Konfigurasi VLAN & Trunking",
    //             description: "Tutorial segmentasi jaringan menggunakan VLAN dan trunking di switch Cisco.",
    //             status: "available",
    //             mediaType: "Video"
    //         },
    //         {
    //             title: "Static Routing",
    //             description: "Mengonfigurasi routing statis antar jaringan menggunakan router Cisco.",
    //             status: "available",
    //             mediaType: "Video"
    //         },
    //         {
    //             title: "Dynamic Routing",
    //             description: "Pengantar routing dinamis (EIGRP/OSPF) pada router Cisco.",
    //             status: "available",
    //             mediaType: "Video"
    //         }
    //     ],
    //     recommendations: [
    //         {
    //             icon: "school",
    //             title: "CCNA v7 Intro to Networks",
    //             description: "Kursus fundamental CCNA untuk persiapan sertifikasi internasional.",
    //             href: "https://www.netacad.com/courses/networking/ccna-introduction-networks",
    //             color: "blue"
    //         },
    //         {
    //             icon: "terminal",
    //             title: "Packet Tracer Tutorials",
    //             description: "Kumpulan tutorial simulasi jaringan menggunakan Cisco Packet Tracer.",
    //             href: "https://www.youtube.com/playlist?list=PLh94XW3R96R8O3U_Vsh_bXqA_rVbXvX5r",
    //             color: "orange"
    //         }
    //     ]
    // },
    // {
    //     id: "mikrotik",
    //     icon: "router",
    //     title: "MikroTik Jaringan",
    //     level: "Beginner",
    //     levelVariant: "green",
    //     topics: [
    //         "Pengenalan MikroTik & RouterOS",
    //         "Konfigurasi Dasar Mikrotik",
    //         "Hotspot Mikrotik",
    //         "DHCP Server di Mikrotik"
    //     ],
    //     actionIcon: "play_circle",
    //     prerequisites: [
    //         "Dasar-dasar Jaringan Komputer",
    //         "Pengantar Linux CLI"
    //     ],
    //     steps: [
    //         {
    //             title: "Pengenalan MikroTik & RouterOS",
    //             description: "Mengenal perangkat MikroTik dan sistem operasi RouterOS, termasuk fitur dasar dan aplikasi Winbox.",
    //             status: "current",
    //             mediaType: "Video & Teks",
    //             actions: [
    //                 { icon: "play_circle", label: "Panduan Video" },
    //                 { icon: "description", label: "Panduan Teks" }
    //             ]
    //         },
    //         {
    //             title: "Konfigurasi Dasar Mikrotik",
    //             description: "Mengkonfigurasi alamat IP dasar dan setting jaringan menggunakan Mikrotik.",
    //             status: "available",
    //             mediaType: "Video"
    //         },
    //         {
    //             title: "Konfigurasi DHCP Server",
    //             description: "Menerapkan DHCP Server pada Mikrotik untuk alokasi alamat IP otomatis.",
    //             status: "available",
    //             mediaType: "Video"
    //         },
    //         {
    //             title: "Konfigurasi Hotspot Mikrotik",
    //             description: "Membuat layanan Hotspot untuk manajemen akses pengguna pada jaringan Mikrotik.",
    //             status: "available",
    //             mediaType: "Video"
    //         }
    //     ],
    //     recommendations: [
    //         {
    //             icon: "school",
    //             title: "MikroTik Official Wiki",
    //             description: "Dokumentasi resmi MikroTik untuk konfigurasi RouterOS.",
    //             href: "https://wiki.mikrotik.com",
    //             color: "blue"
    //         },
    //         {
    //             icon: "play_circle",
    //             title: "MTCNA Video Series",
    //             description: "Video tutorial persiapan sertifikasi MikroTik Certified Network Associate.",
    //             href: "https://www.youtube.com/results?search_query=mtcna+tutorial",
    //             color: "orange"
    //         },
    //         {
    //             icon: "school",
    //             title: "Kursus Dasar MikroTik",
    //             description: "Kursus online dasar MikroTik untuk pemula.",
    //             href: "https://www.udemy.com/topic/mikrotik/",
    //             color: "red"
    //         }
    //     ]
    // },
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
                title: "Pengenalan & Instalasi Linux",
                description: "Instalasi sistem Linux (misalnya Debian/Ubuntu) dan pengenalan antarmuka baris perintah (CLI).",
                status: "current",
                mediaType: "Video & Teks",
                actions: [
                    { icon: "play_circle", label: "Pengenalan", to: "https://youtu.be/uAW1HaBQphI" },
                    { icon: "play_circle", label: "Instalasi", to: "https://youtu.be/f3q-_froZIQ" }
                ]
            },
            {
                title: "Dasar CLI & Perintah Linux",
                description: "Mempelajari perintah dasar Linux (ls, cd, cp, mv, rm, dll) dan navigasi sistem file.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/Pl1tWBOnLKw" }
                ]
            },
            {
                title: "Manajemen File dan Direktori",
                description: "Mempelajari struktur direktori Linux serta perintah dasar untuk membuat, mengelola, dan menghapus file maupun direktori.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/THc_GtWi5-M" }
                ]
            },
            {
                title: "Manajemen User dan Permission",
                description: "Mempelajari cara membuat, mengelola, dan mengatur hak akses user pada sistem Linux.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/C64zbtDI2O0" }
                ]
            },
            {
                title: "KonfigurasiJaringan",
                description: "Konfigurasi jaringan sederhana (IP statis, DNS).",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/hD2FHzKqHIU" }
                ]
            },
            {
                title: "Package Management",
                description: "Mempelajari cara mengelola paket perangkat lunak pada sistem Linux.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/hD2FHzKqHIU" }
                ]
            },
            {
                title: "Remote Access",
                description: "Mempelajari cara remote access pada sistem Linux.",
                status: "available",
                mediaType: "Video",
                actions: [
                    { icon: "play_circle", label: "Panduan Video", to: "https://youtu.be/xFlSgaja8M4" }
                ]
            }
        ],
        recommendations: [
            {
                icon: "play_circle",
                title: "ID Networkers",
                description: "Playlist youtube untuk mempelajari dasar linux dengan video praktik.",
                href: "https://youtube.com/playlist?list=PLbLqbqNn7VYpZjf4i02hzlId7314OuM1Y&si=uHXZP8h4PIN4O5aV",
                color: "red"
            },
            {
                icon: "play_circle",
                title: "Perintah Dasar Linux",
                description: "Playlist youtube untuk mempelajari perintah dasar linux.",
                href: "https://youtube.com/playlist?list=PLw9DU6QeTc-gZVNZotKj3qyXdgN7SAecJ",
                color: "red"
            },
            {
                icon: "article",
                title: "Artikel Belajar Linux",
                description: "Artikel untuk mempelajari perintah dasar linux.",
                href: "https://www.jagoanhosting.com/blog/belajar-linux/",
                color: "blue"
            }
        ]
    },
    // {
    //     id: "debian-sysadmin",
    //     icon: "dns",
    //     title: "Praktik SysAdmin Debian",
    //     level: "Intermediate",
    //     levelVariant: "orange",
    //     topics: [
    //         "Instalasi & Konfigurasi Debian",
    //         "Web Server (Apache/Nginx)",
    //         "Database Server (MySQL/MariaDB)",
    //         "Mail Server (Postfix/Dovecot)"
    //     ],
    //     actionIcon: "terminal",
    //     prerequisites: [
    //         "Dasar-dasar Sistem Operasi",
    //         "Pengalaman Linux CLI"
    //     ],
    //     steps: [
    //         {
    //             title: "Instalasi & Konfigurasi Dasar Debian",
    //             description: "Instalasi Debian Server, konfigurasi jaringan statis, dan manajemen paket dengan APT.",
    //             status: "current",
    //             mediaType: "Video & Teks",
    //             actions: [
    //                 { icon: "play_circle", label: "Panduan Video" },
    //                 { icon: "terminal", label: "Lab Praktik" }
    //             ]
    //         },
    //         {
    //             title: "Web Server Apache/Nginx",
    //             description: "Instalasi dan konfigurasi web server, virtual host, dan SSL/TLS.",
    //             status: "available"
    //         },
    //         {
    //             title: "Database Server MySQL/MariaDB",
    //             description: "Setup database server, manajemen user, backup dan restore database.",
    //             status: "available"
    //         },
    //         {
    //             title: "Mail Server Postfix & Dovecot",
    //             description: "Konfigurasi layanan email (SMTP/IMAP) pada Debian.",
    //             status: "available"
    //         }
    //     ],
    //     recommendations: [
    //         {
    //             icon: "terminal",
    //             title: "Debian Official Wiki",
    //             description: "Dokumentasi terlengkap untuk administrasi sistem operasi Debian.",
    //             href: "https://wiki.debian.org/",
    //             color: "red"
    //         },
    //         {
    //             icon: "play_circle",
    //             title: "Linux SysAdmin Course",
    //             description: "Kursus lengkap administrasi sistem Linux dari dasar.",
    //             href: "https://www.youtube.com/playlist?list=PLmX6p8q7W7OqJov_GshA4mCizp7XQY23p",
    //             color: "green"
    //         }
    //     ]
    // },
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
                description: "Memahami konsep dasar algoritma, logika berpikir terstruktur, dan pembuatan flowchart untuk menyelesaikan masalah sederhana.",
                status: "current"
            },
            {
                title: "Pengenalan Python",
                description: "Mengenal bahasa pemrograman Python, kegunaannya, serta cara menjalankan program Python pertama.",
                status: "available"
            },
            {
                title: "Variabel dan Tipe Data",
                description: "Mempelajari cara menyimpan data menggunakan variabel serta mengenal tipe data dasar seperti integer, float, string, dan boolean.",
                status: "available"
            },
            {
                title: "Input dan Output",
                description: "Mempelajari cara menerima input dari pengguna dan menampilkan output menggunakan Python.",
                status: "available"
            },
            {
                title: "Percabangan (If Else)",
                description: "Membuat program yang dapat mengambil keputusan menggunakan struktur percabangan if, else, dan elif.",
                status: "available"
            },
            {
                title: "Perulangan (Looping)",
                description: "Mempelajari perulangan menggunakan for dan while untuk menjalankan kode secara berulang.",
                status: "available"
            },
            {
                title: "Fungsi Dasar",
                description: "Mempelajari cara membuat dan menggunakan fungsi untuk membuat program lebih rapi dan terstruktur.",
                status: "available"
            },
            {
                title: "Mini Project Python",
                description: "Menerapkan seluruh materi dalam pembuatan program Python sederhana berbasis studi kasus.",
                status: "available"
            }
        ],
        recommendations: [
            {
                icon: "school",
                title: "Belajar Python Dasar",
                description: "Tutorial belajar Python lengkap berbahasa Indonesia.",
                href: "https://belajarpython.com/",
                color: "green"
            },
            {
                icon: "play_circle",
                title: "Python Tutorial (Kelas Terbuka)",
                description: "Video Playlist Python lengkap untuk pemula.",
                href: "https://www.youtube.com/playlist?list=PLZS-MHyEIRo59lUBwU-XHH7Ymmb04ffOY",
                color: "red"
            },
            {
                icon: "code",
                title: "Python Official Tutorial",
                description: "Dokumentasi resmi Python untuk belajar bahasa pemrograman ini.",
                href: "https://docs.python.org/3/tutorial/",
                color: "blue"
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
