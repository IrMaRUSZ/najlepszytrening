import { MetadataRoute } from 'next'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

async function getAllPosts() {
  // Tu implementujesz logikę pobierania postów
  return [
    { slug: 'pierwszy-post', lastModified: '2024-12-08' },
    { slug: 'drugi-post', lastModified: '2024-12-08' },
    // itd.
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://najlepszytrening.pl'

  const posts = await getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${baseUrl}/o-mnie`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trener-personalny-lodz`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wspolpraca-online`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${baseUrl}/narzedzia`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/narzedzia/bmi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/narzedzia/onerepmax`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/narzedzia/bodyfat`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/narzedzia/Kalkulator-zapotrzebowania-kalorycznego`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified).toISOString(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}