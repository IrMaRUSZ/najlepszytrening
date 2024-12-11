// components/SEO/SchemaOrg.tsx
export const generateSchemaMarkup = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.najlepszytrening.pl',
    name: 'Najlepszy Trening - Ireneusz Maruszewski',
    description: 'Profesjonalny trener personalny w Łodzi. Treningi personalne, indywidualny plan treningowy.',
    url: 'https://www.najlepszytrening.pl',
    telephone: '+48 737730868',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dąbrowskiego 207/225',
      addressLocality: 'Łódź',
      addressRegion: 'łódzkie',
      postalCode: '93-231',
      addressCountry: 'PL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.7349044,
      longitude: 19.5163388
    },      
    image: {
      '@type': 'ImageObject',
      url: 'https://www.najlepszytrening.pl/images/Maruszewski.webp'
    },
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
    ],
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: 'Zweryfikowane opinie Google'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1'
    }
  }
 
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
 }