import { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/posts'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.najlepszytrening.pl'
  
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
      url: `${baseUrl}/Wspolpraca-online`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/grywalizacja`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/100w10tygodni`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.5,
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
    {
      url: `${baseUrl}/prywatnosc`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.5,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}