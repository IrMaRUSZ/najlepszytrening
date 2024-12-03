import { getPost, getAllPostSlugs, getAllPosts } from '../../../lib/posts';
import PostLayout from '../../../components/PostLayout';

// Define the params type
type Params = {
  slug: string;
};

// Define page props interface with Promise params
interface PageProps {
  params: Promise<Params>;
}

// Generate static params for all possible slugs
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata with Promise params
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post nie znaleziony',
      description: ''
    };
  }

  return {
    title: `${post.title} | Blog Trenera Personalnego Łódź`,
    description: post.excerpt || `${post.title} - przeczytaj artykuł na blogu Antidotum Studio. Profesjonalne porady treningowe i dietetyczne.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [post.image],
      publishedTime: post.date,
    }
  };
}

// Post page component
const PostPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return <p>Ładowanie...</p>;
  }

  const post = await getPost(slug);
  if (!post) {
    return <p>Post nie znaleziony</p>;
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== slug);

  return (
    <PostLayout 
      content={post.content} 
      title={post.title} 
      date={post.date} 
      metaDescription={post.description} 
      image={post.image} 
      relatedPosts={relatedPosts}
    />
  );
};

export default PostPage;