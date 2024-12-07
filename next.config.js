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
      {
        source: '/tools/diet',
        destination: '/narzedzia',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/contact',
        destination: '/kontakt',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/top-5-suplementow-diety',
        destination: '/posts/top-5-suplementow-diety',
        permanent: true, // 301 przekierowanie
      },
    ]
  },
}

module.exports = nextConfig
