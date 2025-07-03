/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    // Cache ayarları
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 0,
        },
    },
    // API route'lar için cache devre dışı
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Pragma', 
                        value: 'no-cache',
                    },
                    {
                        key: 'Expires',
                        value: '0',
                    },
                ],
            },
        ];
    },
}

export default nextConfig;
