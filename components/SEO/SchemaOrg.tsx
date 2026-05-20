// components/SEO/SchemaOrg.tsx
import React from 'react';

export const generateSchemaMarkup = () => {
const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'], // Dodajemy kategorię zdrowotną
    '@id': 'https://www.najlepszytrening.pl',
    name: 'Najlepszy Trening - Ireneusz Maruszewski Trener Personalny i Fizjoterapeuta',
    description: 'Połączenie fizjoterapii i treningu personalnego w Łodzi. Skutecznie pomagam zrzucić wagę, zbudować mięśnie i pozbyć się bólu pleców/stawów.',
    url: 'https://www.najlepszytrening.pl',
    telephone: '+48 737730868',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gojawiczyńskiej 26',
      addressLocality: 'Łódź',
      addressRegion: 'łódzkie',
      postalCode: '93-253',
      addressCountry: 'PL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.7349044,
      longitude: 19.5163388
    },      
    image: {
      '@type': 'ImageObject',
      url: 'https://www.najlepszytrening.pl/images/Maruszewskibt.webp',
      width: '1200',
      height: '630',
      caption: 'Ireneusz Maruszewski - Trener Personalny Łódź'
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday'
      ],
      opens: '07:00',
      closes: '21:00'
    },
    sameAs: [
      'https://instagram.com/trener_ireneusz',
      'https://youtube.com/@trener_ireneusz',
      'https://facebook.com/TrenerIreneusz'
    ],
    keywords: "trener personalny łódź, fizjoterapeuta łódź, trening medyczny łódź, rehabilitacja ruchowa łódź, ból pleców trening",
 hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi treningowe i fizjoterapeutyczne',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Trening personalny i medyczny w Łodzi',
          description: 'Indywidualne treningi w Łodzi prowadzone przez fizjoterapeutę. Idealne dla osób po kontuzjach lub chcących trenować bezpiecznie i bez bólu.',
          price: '150.00',
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Współpraca online',
          description: 'Trenuj z profesjonalnym wsparciem, gdziekolwiek jesteś. Instruktaże video, monitorowanie postępów, stały kontakt.',
          price: '250.00',
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan treningowy 100kg w 10 tygodni',
          description: '10-tygodniowy program progresji w wyciskaniu leżąc. Systematyczne zwiększanie obciążeń z odpowiednimi przerwami między treningami.',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.najlepszytrening.pl#person',
    name: 'Ireneusz Maruszewski',
    jobTitle: ['Trener Personalny', 'Fizjoterapeuta'],
    description: 'Certyfikowany trener personalny i dyplomowany fizjoterapeuta z Łodzi. Specjalizuję się w treningu siłowym oraz wyprowadzaniu pacjentów z bólu narządu ruchu.',
    image: 'https://www.najlepszytrening.pl/images/Maruszewskibt.webp',
    url: 'https://www.najlepszytrening.pl',
    sameAs: [
      'https://instagram.com/trener_ireneusz',
      'https://youtube.com/@trener_ireneusz',
      'https://facebook.com/TrenerIreneusz'
    ],
    worksFor: {
      '@id': 'https://www.najlepszytrening.pl'
    },
    location: {
      '@type': 'Place',
      name: 'Łódź, Polska',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Gojawiczyńskiej 26',
        addressLocality: 'Łódź',
        addressRegion: 'łódzkie',
        postalCode: '93-253',
        addressCountry: 'PL'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
};

export default generateSchemaMarkup;