// components/SEO/generatePageMetadata.tsx
import { Metadata } from 'next'
import { generateDefaultMetadata } from './SEOConfig'

interface PageMetadataProps {
  title?: string
  description?: string
  path?: string
  imageUrl?: string
}

export const generatePageMetadata = ({
  title,
  description,
  path = '',
  imageUrl,
}: PageMetadataProps): Metadata => {
  const baseMetadata = generateDefaultMetadata(title, description)
  const url = `https://najlepszy-trening.pl${path}`
  
  return {
    ...baseMetadata,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      url,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || baseMetadata.title as string,
        }
      ] : baseMetadata.openGraph?.images,
    }
  }
}