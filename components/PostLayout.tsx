// components/PostLayout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { Components } from 'react-markdown';
import styles from '../styles/PostLayout.module.css';

interface PostLayoutProps {
  content: string;
  title?: string;
  date?: string;
  metaDescription?: string;
  image?: string;
  readingTime?: number;
  categories?: string[];
  isLocalContent?: boolean;
  location?: string;
  keywords?: string[];
  relatedPosts?: {
    title: string;
    slug: string;
    excerpt: string;
    image?: string;
    isLocalContent?: boolean;
  }[];
}

// Komponent schematu artykułu dla SEO
// Dodajemy użycie zmiennej keywords
// Możemy dodać ją do komponentu ArticleSchema

// Fragment components/PostLayout.tsx dotyczący schema.org

const ArticleSchema = ({ title, date, image, metaDescription, slug, keywords }: Pick<PostLayoutProps, 'title' | 'date' | 'image' | 'metaDescription' | 'keywords'> & { slug: string }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.najlepszytrening.pl/posts/${slug}`
    },
    "headline": title,
    "image": image ? [`https://www.najlepszytrening.pl${image}`] : undefined,
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Person",
      "name": "Ireneusz Maruszewski",
      "url": "https://www.najlepszytrening.pl/o-mnie"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Najlepszy Trening",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.najlepszytrening.pl/logo.png"
      }
    },
    "description": metaDescription,
    "keywords": keywords?.join(", ") || "trener personalny łódź"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

const PostLayout: React.FC<PostLayoutProps> = ({
  content,
  title,
  date,
  image,
  metaDescription,
  readingTime = 5,
  categories,
  isLocalContent,
  location,
  keywords,
  relatedPosts,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Wykrywanie słów kluczowych w treści
  const enhanceTextWithKeywords = (text: string) => {
    // Słowa kluczowe, które chcemy wzmacniać
    const keyTerms = [
      'trening personalny',
      'trener personalny', 
      'Łódź', 
      'plan treningowy', 
      'dieta',
      'redukcja wagi',
      'budowa masy mięśniowej'
    ];
    
    // Prosta implementacja wzmacniania słów kluczowych
    let enhancedText = text;
    keyTerms.forEach(term => {
      // Znajdujemy pierwsze wystąpienie terminu, które nie jest już w tagu
      const regex = new RegExp(`(?<!<[^>]*)(${term})(?![^<]*>)`, 'i');
      const match = enhancedText.match(regex);
      
      if (match && match.index !== undefined) {
        const index = match.index;
        
        // Wzmacniamy tylko pierwsze wystąpienie słowa kluczowego w tekście
        enhancedText = 
          enhancedText.substring(0, index) + 
          `<strong>${match[0]}</strong>` + 
          enhancedText.substring(index + match[0].length);
      }
    });
    
    return enhancedText;
  };

  const components: Partial<Components> = {
    h2: ({ children, ...props }) => {
      const id = children?.toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

      return (
        <h2 id={id} className={styles.heading2} {...props}>
          {children}
          <a href={`#${id}`} className={styles.anchor} aria-hidden="true">
            #
          </a>
        </h2>
      );
    },
    h3: ({ children }) => (
        <h3 className={styles.heading3}>
          {children}
        </h3>
    ),
    a: ({ href, children, ...props }) => {
      const isInternalLink = href?.startsWith('#');
      
      if (isInternalLink) {
        return (
          <a href={href} className={styles.tocLink} {...props}>
            {children}
          </a>
        );
      }

      if (!href) return <>{children}</>;

      // Dodajemy atrybut rel dla linków zewnętrznych
      if (href.startsWith('http')) {
        return (
          <a 
            href={href} 
            className={styles.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={styles.link}>
          {children}
        </Link>
      );
    },
    ul: ({ children, ...props }) => (
      <ul className={styles.list} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className={styles.orderedList} {...props}>
        {children}
      </ol>
    ),
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match && !className;
      return (
        <code
          className={isInline ? styles.inlineCode : styles.codeBlock}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className={styles.preBlock}>
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => {
      if (!src) return null;
      
      // Wzbogacenie atrybutu alt o słowa kluczowe, jeśli brakuje
      const enhancedAlt = alt || `${title} - Trener personalny Łódź`;
      
      return (
        <div className={styles.markdownImageWrapper}>
          <Image
            src={src}
            alt={enhancedAlt}
            className={styles.markdownImage}
            width={500}
            height={300}
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      );
    },
    table: ({ children }) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className={styles.tableHeader}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className={styles.tableCell}>
        {children}
      </td>
    ),
    // Wzmacniamy pierwsze wystąpienie slow kluczowych w akapitach
    p: ({ children }) => {
      // Konwersja dzieci na string, aby móc wzmocnić słowa kluczowe
      const childrenAsString = React.Children.toArray(children)
        .map(child => typeof child === 'string' ? child : '')
        .join('');
      
      if (childrenAsString.length > 0) {
        const enhancedHtml = enhanceTextWithKeywords(childrenAsString);
        return <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: enhancedHtml }} />;
      }
      
      return <p className={styles.paragraph}>{children}</p>;
    }
  };

  return (
    <div className={styles.container}>
      {/* Schema.org dla artykułu */}
      {title && <ArticleSchema 
  title={title} 
  date={date} 
  image={image} 
  metaDescription={metaDescription} 
  slug={location || ''} 
  keywords={keywords}
/>}
      
      <article className={styles.post}>
        <div className={styles.postHeader}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {(formattedDate || categories) && (
            <div className={styles.meta}>
              {formattedDate && (
                <span className={styles.date}>
                  <Calendar size={16} />
                  {formattedDate}
                </span>
              )}
              <span className={styles.readTime}>
                <Clock size={16} />
                {readingTime} min czytania
              </span>
              {isLocalContent && (
                <span className={styles.localContentBadge}>
                  <MapPin size={16} />
                  Treść lokalna - Łódź
                </span>
              )}
              {categories && categories.length > 0 && (
                <div className={styles.categories}>
                  {categories.map(category => (
                    <span key={category} className={styles.category}>
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          {image && (
            <div className={styles.imageWrapper}>
              <Image 
                src={image} 
                alt={title ? `${title} - Trener personalny Łódź` : 'Najlepszy Trening - Trener personalny Łódź'} 
                className={styles.image}
                width={1200}
                height={800}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
                priority
              />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {content}
          </ReactMarkdown>
          
          {/* Sekcja CTA po treści artykułu */}
          <div className={styles.postCta}>
            <h3>Chcesz trenować pod okiem profesjonalisty?</h3>
            <p>Zapraszam na treningi personalne w Łodzi lub online. Otrzymasz indywidualny plan treningowy i wsparcie na każdym kroku.</p>
            <div className={styles.ctaButtons}>
              <Link href="/kontakt" className={styles.primaryCta}>
                Umów konsultację
                <ArrowRight size={18} />
              </Link>
              <Link href="/trener-personalny-lodz" className={styles.secondaryCta}>
                Dowiedz się więcej
              </Link>
            </div>
          </div>
        </div>
      </article>

      <aside className={styles.sidebar}>
        <div className={styles.stickyContainer}>
          <h2 className={styles.recommendedTitle}>
            <span className={styles.recommendedTitleText}>Polecane</span>
          </h2>
          <div className={styles.relatedPosts}>
            {relatedPosts?.map((post) => (
              <Link
                href={`/posts/${post.slug}`}
                key={post.slug}
                className={styles.relatedPost}
              >
                <div className={styles.relatedImageWrapper}>
                  {post.image && (
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      className={styles.relatedImage}
                      width={200}
                      height={150}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                  )}
                  {post.isLocalContent && (
                    <span className={styles.relatedLocalBadge}>
                      <MapPin size={12} />
                      Łódź
                    </span>
                  )}
                </div>
                <div className={styles.relatedContent}>
                  <h3 className={styles.relatedTitle}>{post.title}</h3>
                  <p className={styles.relatedExcerpt}>{post.excerpt}</p>
                  <span className={styles.readMore}>
                    Czytaj więcej
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Dodatkowa sekcja z usługami */}
          <div className={styles.servicesSection}>
            <h3 className={styles.servicesTitle}>Nasze usługi</h3>
            <div className={styles.servicesList}>
              <Link href="/trener-personalny-lodz" className={styles.serviceItem}>
                <h4>Trening personalny w Łodzi</h4>
                <p>Indywidualne treningi personalne dopasowane do Twoich potrzeb</p>
              </Link>
              <Link href="/Wspolpraca-online" className={styles.serviceItem}>
                <h4>Treningi online</h4>
                <p>Trening i wsparcie niezależnie od miejsca zamieszkania</p>
              </Link>
              <Link href="/narzedzia" className={styles.serviceItem}>
                <h4>Narzędzia treningowe</h4>
                <p>Kalkulatory i narzędzia do samodzielnego planowania treningów</p>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PostLayout;