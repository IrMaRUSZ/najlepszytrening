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
        source: '/dieta',
        destination: '/posts/dieta',
        permanent: true, // 301 przekierowanie
      },
      {
        source: '/Wspolpraca',
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
      {
        source: '/cwiczenia-na-plaski-brzuch-i-szczuple-uda-nie-daj-sobie-wcisnac-sciemy/',
        destination: 'posts/cwiczenia-na-plaski-brzuch-i-szczuple-uda-nie-daj-sobie-wcisnac-sciemy/',
        permanent: true, // 301 przekierowanie
      },
            {
        source: '/najlepsze-cwiczenia-na-klatke-piersiowa',
        destination: '/posts/najlepsze-cwiczenia-na-klatke-piersiowa',
        permanent: true, // 301 przekierowanie
      },
    ]
  },
}

module.exports = nextConfig
