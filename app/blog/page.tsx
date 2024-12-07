import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import styles from '../../styles/Blog.module.css';
import Image from 'next/image';

type CategoryType = 
  'Dieta' | 
  'Trening' | 
  'Zdrowie' | 
  'Motywacja' | 
  'Lifestyle' | 
  'Pomiary' | 
  'Planowanie' | 
  'Sport' | 
  'Odżywianie' | 
  'Siłownia' | 
  'Poradnik' | 
  'Dla kobiet' | 
  'Regeneracja';

const CATEGORIES: Record<CategoryType, string> = {
  'Dieta': '#FF6B6B',
  'Trening': '#4ECDC4',
  'Zdrowie': '#95D44A',
  'Motywacja': '#FFD93D',
  'Lifestyle': '#6C5CE7',
  'Pomiary': '#FF7EB3',
  'Planowanie': '#3498DB',
  'Sport': '#E67E22',
  'Odżywianie': '#27AE60',
  'Siłownia': '#8E44AD',
  'Poradnik': '#F39C12',
  'Dla kobiet': '#FF9FF3',
  'Regeneracja': '#00CEC9'
};

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // Zmieniamy na wymagane pole
  categories: CategoryType[];
  readingTime: number;
}

export default function BlogPage() {
  const getPosts = (): Post[] => {
    const files = fs.readdirSync(path.join(process.cwd(), 'posts'));
    const posts = files.map((filename) => {
      const filePath = path.join(process.cwd(), 'posts', filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        excerpt: data.excerpt || '',
        image: data.image || '',
        date: data.date || new Date().toISOString(), // Domyślna data dla postów bez daty
        categories: data.categories || [],
        readingTime: data.readingTime || 5
      };
    });

    // Sortowanie postów według daty (od najnowszych)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const posts = getPosts();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleHighlight}>Blog</span>
        </h1>
        <p className={styles.subtitle}>
          Najnowsze artykuły o treningu, diecie i zdrowym stylu życia
        </p>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <Link href={`/posts/${post.slug}`} className={styles.imageLink}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={800}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div className={styles.categories}>
                  {post.categories.map((category: CategoryType) => (
                    <span
                      key={category}
                      className={styles.category}
                      style={{
                        backgroundColor: CATEGORIES[category]
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            
            <div className={styles.content}>
              <div className={styles.meta}>
                <div className={styles.readTime}>
                  <Clock size={16} />
                  <span>{post.readingTime} min czytania</span>
                </div>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <Link href={`/posts/${post.slug}`} className={styles.titleLink}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
              </Link>

              <p className={styles.excerpt}>{post.excerpt}</p>

              <Link href={`/posts/${post.slug}`} className={styles.readMore}>
                Czytaj więcej
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}