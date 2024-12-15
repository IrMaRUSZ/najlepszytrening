import React from 'react';

interface Rating {
  '@type': 'Rating';
  ratingValue: string;
  bestRating: string;
}

interface Review {
  '@type': 'Review';
  reviewRating: Rating;
  author: {
    '@type': 'Person';
    name: string;
  };
}

interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

interface SchemaData {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  image: {
    '@type': 'ImageObject';
    url: string;
  };
  priceRange: string;
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs: string[];
  review: Review;
  aggregateRating: AggregateRating;
}

export const generateSchemaMarkup = (): JSX.Element => {
  const schemaData: SchemaData = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};