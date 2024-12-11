  // components/PostLayout.tsx
  'use client';

  import React from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import ReactMarkdown from 'react-markdown';
  import remarkGfm from 'remark-gfm';
  import { Clock, Calendar, ArrowRight } from 'lucide-react';
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
    relatedPosts?: {
      title: string;
      slug: string;
      excerpt: string;
      image?: string;
    }[];
  }

  const PostLayout: React.FC<PostLayoutProps> = ({
    content,
    title,
    date,
    image,
    readingTime = 5,
    categories,
    relatedPosts,
  }) => {
    const formattedDate = date
      ? new Date(date).toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

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
        
        return (
          <div className={styles.markdownImageWrapper}>
            <Image
              src={src}
              alt={alt || ''}
              className={styles.markdownImage}
              width={500}
              height={300}
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
    };

    return (
      <div className={styles.container}>
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
                  alt={title || 'Post image'} 
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
                      />
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
          </div>
        </aside>
      </div>
    );
  };

  export default PostLayout;