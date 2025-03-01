// app/blog/page.tsx
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/posts';
import styles from '../../styles/Blog.module.css';

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
  date: string;
  categories: CategoryType[];
  readingTime: number;
  isLocalContent?: boolean;
}

// Generator metadanych dla strony bloga
export async function generateMetadata() {
  return {
    title: "Blog Trenera Personalnego | Najlepszy Trening Łódź",
    description: "Sprawdzone porady treningowe, dietetyczne i zdrowotne. Praktyczna wiedza od doświadczonego trenera personalnego z Łodzi.",
    keywords: "trener personalny łódź, blog treningowy, porady treningowe, dieta, treningi w łodzi",
    openGraph: {
      title: "Blog Trenera Personalnego | Najlepszy Trening Łódź",
      description: "Sprawdzone porady treningowe, dietetyczne i zdrowotne. Praktyczna wiedza od doświadczonego trenera personalnego z Łodzi.",
      url: "https://najlepszytrening.pl/blog",
      type: "website",
    }
  }
}

export default async function BlogPage() {
  const getPosts = async (): Promise<Post[]> => {
    try {
      const posts = await getAllPosts();
      
      // Priorytetyzuj treści lokalne i sortuj
      return posts
        .map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt || '',
          image: post.image || '',
          date: post.date || new Date().toISOString(),
          categories: post.categories as CategoryType[] || [],
          readingTime: post.readingTime || 5,
          isLocalContent: post.isLocalContent
        }))
        .sort((a, b) => {
          // Najpierw treści lokalne
          if (a.isLocalContent && !b.isLocalContent) return -1;
          if (!a.isLocalContent && b.isLocalContent) return 1;
          
          // Potem wg daty
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const posts = await getPosts();
  
  // Podział postów na lokalne (dla Łodzi) i pozostałe
  const localPosts = posts.filter(post => post.isLocalContent);
  const otherPosts = posts.filter(post => !post.isLocalContent);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleHighlight}>Blog Trenera Personalnego z Łodzi</span>
        </h1>
        <p className={styles.subtitle}>
          Najnowsze artykuły o treningu, diecie i zdrowym stylu życia dla mieszkańców Łodzi i okolic
        </p>
      </div>
      
      {/* Sekcja postów lokalnych */}
      {localPosts.length > 0 && (
        <div className={styles.localPostsSection}>
          <h2 className={styles.sectionTitle}>Treści dla mieszkańców Łodzi</h2>
          <div className={styles.grid}>
            {localPosts.map((post) => renderPostCard(post))}
          </div>
        </div>
      )}
      
      {/* Pozostałe posty */}
      <div className={styles.grid}>
        {otherPosts.map((post) => renderPostCard(post))}
      </div>
      
      {/* Sekcja CTA */}
      <div className={styles.ctaSection}>
        <h2>Szukasz trenera personalnego w Łodzi?</h2>
        <p>Zapraszam na konsultację. Razem ustalimy plan działania dopasowany do Twoich potrzeb i możliwości.</p>
        <div className={styles.ctaButtons}>
          <Link href="/kontakt" className={styles.primaryButton}>
            Umów spotkanie
            <ArrowRight size={18} />
          </Link>
          <Link href="/trener-personalny-lodz" className={styles.secondaryButton}>
            Dowiedz się więcej
          </Link>
        </div>
      </div>
    </div>
  );
  
  // Funkcja pomocnicza renderująca kartę posta
  function renderPostCard(post: Post) {
    return (
      <article key={post.slug} className={`${styles.card} ${post.isLocalContent ? styles.localCard : ''}`}>
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
              loading="lazy"
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
            {post.isLocalContent && (
              <span className={styles.localBadge}>Łódź</span>
            )}
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
    );
  }
}