// components/SEO/SchemaOrg.tsx
import React from 'react';

export const generateSchemaMarkup = () => {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.najlepszytrening.pl',
    name: 'Najlepszy Trening - Ireneusz Maruszewski',
    description: 'Pierwszy krok jest najtrudniejszy - rozumiem Twoje obawy, bo sam kiedyś zaczynałem. Treningi Widzew, Dąbrowa, Centrum',
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
    keywords: "trener personalny łódź, trening personalny łódź, treningi indywidualne łódź, trener personalny łódź widzew, trener personalny łódź bałuty, plan treningowy łódź",
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi treningowe',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Trening personalny w Łodzi',
          description: 'Treningi personalne w centrum i wszystkich dzielnicach Łodzi. Zero oceniania, plan skrojony na miarę, zawsze jestem obok podczas treningu.',
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
    description: 'Trener personalny w Łodzi, który rozumie Twoje obawy. Sam kiedyś zaczynałem i wiem, jak przytłaczająca może być siłownia na początku. Dlatego skupiam się przede wszystkim na tym, żebyś czuł się pewnie i bezpiecznie podczas każdego treningu.',
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