import ArticleCard from './ArticleCard';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEffect, useState } from 'react';
import { loadBlogPosts, type BlogPost } from '@/lib/contentLoader';

const HeroSection = () => {
  const { t } = useTranslation();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await loadBlogPosts();
      if (mounted) setPosts(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const hero = posts[0];
  const side = posts.slice(1, 3);

  return (
    <section className="container mx-auto px-4 lg:px-6">
      {/* Mobile: Al Jazeera Health Style */}
      <div className="lg:hidden py-4">
        {/* Section Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-card-foreground">Health</h2>
        </div>
        
        {/* Featured Article - Large */}
        <div className="mb-6">
          {hero && (
            <ArticleCard
              variant="hero"
              title={hero.title}
              excerpt={hero.excerpt}
              image={hero.image}
              category={hero.category}
              date={hero.date}
              href={`/articles/${hero.slug}`}
            />
          )}
        </div>

        {/* Side Articles - Horizontal Layout */}
        <div className="space-y-3">
          {side.map((article, index) => (
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

      {/* Desktop: Al Jazeera Layout - Large right, two stacked left */}
      <div className="hidden lg:block py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Two Stacked Articles */}
          <div className="col-span-1 space-y-6">
            {side.map((article, index) => (
              <ArticleCard
                key={index}
                variant="small"
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                category={article.category}
                date={article.date}
                href={`/articles/${article.slug}`}
              />
            ))}
          </div>

          {/* Right Column: Large Hero Article */}
          <div className="col-span-2">
            {hero && (
              <ArticleCard
                variant="hero"
                title={hero.title}
                excerpt={hero.excerpt}
                image={hero.image}
                category={hero.category}
                date={hero.date}
                href={`/articles/${hero.slug}`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;