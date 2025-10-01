import ArticleCard from './ArticleCard';
import { useEffect, useState } from 'react';
import { loadBlogPosts, type BlogPost } from '@/lib/contentLoader';

const ArticleGrid = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        console.log("Loading blog posts...");
        setLoading(true);
        setError(null);
        const data = await loadBlogPosts();
        console.log("Loaded articles:", data.length, data);
        if (mounted) {
          setArticles(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
        if (mounted) {
          setError("Failed to load blog posts");
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 lg:px-6 py-8">
        <div className="text-center">
          <p className="text-text-secondary">Loading articles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 lg:px-6 py-8">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="container mx-auto px-4 lg:px-6 py-8">
        <div className="text-center">
          <p className="text-text-secondary">No articles found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 lg:px-6">
      {/* Mobile: Al Jazeera Health Style - Horizontal Cards */}
      <div className="lg:hidden py-4">
        <div className="space-y-3">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              variant="mobile-horizontal"
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              category={article.category}
              date={article.date}
              href={`/articles/${article.slug}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 3 Column Grid */}
      <div className="hidden lg:block py-8">
        <div className="grid grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              category={article.category}
              date={article.date}
              href={`/articles/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;