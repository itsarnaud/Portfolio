import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  allowedDevOrigins: ['192.168.1.75'],
  experimental: {
    // app/global-not-found.tsx : la 404 des adresses inconnues, dans la langue de l'adresse,
    // sans rendre tout le site dynamique (voir ce fichier).
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
