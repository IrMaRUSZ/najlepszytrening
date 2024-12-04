/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl',
  },
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/wspolpraca',
        destination: '/',
        permanent: true, // 301 przekierowanie
      },
    ]
  },
}

module.exports = nextConfig
