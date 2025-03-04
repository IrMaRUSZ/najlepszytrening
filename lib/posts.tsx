import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  content: string;
  title: string;
  description: string;
  metaDescription: string; 
  excerpt: string;
  date?: string;
  image?: string;
  imageAlt?: string;
  location?: string; // Nowe pole dla treści lokalnych
  isLocalContent?: boolean; // Flaga dla treści dopasowanych do Łodzi
  keywords?: string[]; // Dodatkowe słowa kluczowe
  readingTime?: number;
  categories?: string[];
  alternates?: {
    canonical?: string;
  } | string;
}

// Funkcja pobierająca wszystkie slugi postów
export const getAllPostSlugs = async (): Promise<string[]> => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
};

// Funkcja do pobierania pojedynczego posta
export const getPost = async (slug: string): Promise<Post | null> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    console.error(`Post not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Sprawdź czy to treść lokalna
  const isLocalContent = 
    content.toLowerCase().includes('łódź') || 
    content.toLowerCase().includes('lodz') ||
    (data.title || '').toLowerCase().includes('łódź') ||
    (data.metaDescription || '').toLowerCase().includes('łódź');
  
  // Przygotuj słowa kluczowe 
  const keywords = [
    ...(data.categories || []),
    'trener personalny',
    'trening personalny',
    isLocalContent ? 'trener personalny łódź' : '',
    isLocalContent ? 'treningi w łodzi' : '',
  ].filter(Boolean);

  return {
    slug,
    content,
    title: data.title || '',
    description: data.description || '',
    metaDescription: data.metaDescription || data.description || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    image: data.image || '',
    imageAlt: data.imageAlt || data.title || '', 
    location: isLocalContent ? 'Łódź' : undefined,
    isLocalContent,
    keywords,
    readingTime: data.readingTime || calculateReadingTime(content),
    categories: data.categories || [],
  };
};

// Funkcja do szacowania czasu czytania
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Funkcja do pobierania wszystkich postów
export const getAllPosts = async (): Promise<Post[]> => {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPost(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      // Priorytetyzuj treści lokalne a następnie sortuj według daty
      if (a.isLocalContent && !b.isLocalContent) return -1;
      if (!a.isLocalContent && b.isLocalContent) return 1;
      
      // Sortowanie postów od najnowszych do najstarszych
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
};

// Funkcja do pobierania lokalnych postów
export const getLocalPosts = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.isLocalContent);
};

// Funkcja do pobierania powiązanych postów
export const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return allPosts.filter(post => post.slug !== currentSlug).slice(0, limit);
  }
  
  // Znalezienie postów o podobnych kategoriach
  const relatedByCategory = allPosts.filter(post => {
    if (post.slug === currentSlug) return false;
    
    // Sprawdzenie wspólnych kategorii
    const commonCategories = post.categories?.filter(
      category => currentPost.categories?.includes(category)
    );
    
    return commonCategories && commonCategories.length > 0;
  });
  
  // Jeśli mamy wystarczająco powiązanych, zwróć je
  if (relatedByCategory.length >= limit) {
    return relatedByCategory.slice(0, limit);
  }
  
  // Dodaj inne posty, aby uzupełnić limit
  const otherPosts = allPosts.filter(post => 
    post.slug !== currentSlug && !relatedByCategory.some(p => p.slug === post.slug)
  );
  
  return [...relatedByCategory, ...otherPosts].slice(0, limit);
};

// Funkcja do pobierania postów według kategorii
export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.categories?.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
};