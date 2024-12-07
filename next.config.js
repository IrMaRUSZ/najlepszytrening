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
      {
        source: '/artykuly/',
        destination: '/blog',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/home/prywatnosc/',
        destination: '/prywatnosc',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/trening/prywatnosc',
        destination: '/prywatnosc',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/strona-glowna/trening/',
        destination: '/posts/Jakstworzyc-skuteczny-plan-treningowy',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/trening',
        destination: '/posts/Jakstworzyc-skuteczny-plan-treningowy',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/trening/trening',
        destination: '/posts/Jakstworzyc-skuteczny-plan-treningowy',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/trening__trashed/prywatnosc/',
        destination: '/prywatnosc',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/treningi-i-diety/trening/',
        destination: '/Wspolpraca-online',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/jadlospis-dla-sportowcow-jakie-produkty-powinny-znalezc-sie-na-talerzu/feed/',
        destination: 'posts/jadlospis-dla-sportowcow-jakie-produkty-powinny-znalezc-sie-na-talerzu',
        permanent: true, // 301 przekierowanie
      },
    ]
  },
}

module.exports = nextConfig
