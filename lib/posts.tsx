import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  content: string;
  title: string;
  description: string;
  metaDescription: string; // Dodane pole
  excerpt: string;
  date?: string;
  image?: string;
  imageAlt?: string; // Warto też dodać alt do obrazów
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

  return {
    slug,
    content,
    title: data.title || '',
    description: data.description || '',
    metaDescription: data.metaDescription || '', // Dodana obsługa metaDescription
    excerpt: data.excerpt || '',
    date: data.date || '',
    image: data.image || '',
    imageAlt: data.imageAlt || '', // Dodana obsługa imageAlt
  };
};

// Funkcja do pobierania wszystkich postów
export const getAllPosts = async (): Promise<Post[]> => {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPost(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      // Sortowanie postów od najnowszych do najstarszych
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
};

// Funkcja do pobierania powiązanych postów
export const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
};