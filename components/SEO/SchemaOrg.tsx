// components/SEO/SchemaOrg.tsx
export const generateSchemaMarkup = () => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://najlepszytrening.pl',
      name: 'Najlepszy Trening - Ireneusz Maruszewski',
      description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy.',
      url: 'https://najlepszytrening.pl',
      telephone: '+48 737730868',
      address: {
        '@type': 'Dabrowskiego 207/225 Fit Fabric',
        addressLocality: 'Łódź',
        addressRegion: 'łódzkie',
        addressCountry: 'PL'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '51.7349044', // szerokość geograficzna
        longitude: '19.5163388' // długość geograficzna
      },      
      image: '/images/Maruszewski.webp',
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        opens: '07:00',
        closes: '21:00'
      },
      sameAs: [
        'https://instagram.com/trener_ireneusz',
        'https://youtube.com/@trener_ireneusz'
      ]
    }
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    )
  }