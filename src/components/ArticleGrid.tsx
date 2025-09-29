import ArticleCard from './ArticleCard';
import { useEffect, useState } from 'react';
import { loadBlogPosts, type BlogPost } from '@/lib/contentLoader';

const ArticleGrid = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await loadBlogPosts();
      if (mounted) setArticles(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

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