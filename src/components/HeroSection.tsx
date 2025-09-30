import { useEffect, useMemo, useState } from 'react';
import ArticleCard from './ArticleCard';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';
import { useTranslation } from '@/contexts/TranslationContext';
import { loadBlogPosts, BlogPost } from '@/lib/contentLoader';

const HeroSection = () => {
  const { t } = useTranslation();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBlogPosts();
        setPosts(all);
      } catch (e) {
        setError('load-failed');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = useMemo(() => posts[0], [posts]);
  const sides = useMemo(() => posts.slice(1, 3), [posts]);

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
          {featured ? (
            <ArticleCard
              variant="hero"
              title={featured.title}
              excerpt={featured.excerpt}
              image={featured.image || heroHealthImage}
              category={featured.category}
              categorySlug={'health'}
              date={featured.date}
              href={`/articles/${featured.slug}`}
            />
          ) : null}
        </div>

        {/* Side Articles - Horizontal Layout */}
        <div className="space-y-3">
          {sides.map((p, index) => (
            <ArticleCard
              key={index}
              variant="mobile-horizontal"
              title={p.title}
              excerpt={p.excerpt}
              image={p.image || heroParentingImage}
              category={p.category}
              categorySlug={'parenting'}
              date={p.date}
              href={`/articles/${p.slug}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Al Jazeera Layout - Large right, two stacked left */}
      <div className="hidden lg:block py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Two Stacked Articles */}
          <div className="col-span-1 space-y-6">
            {sides.map((p, index) => (
              <ArticleCard
                key={index}
                variant="small"
                title={p.title}
                excerpt={p.excerpt}
                image={p.image || heroQuranImage}
                category={p.category}
                categorySlug={'quran'}
                date={p.date}
                href={`/articles/${p.slug}`}
              />
            ))}
          </div>

          {/* Right Column: Large Hero Article */}
          <div className="col-span-2">
            {featured ? (
              <ArticleCard
                variant="hero"
                title={featured.title}
                excerpt={featured.excerpt}
                image={featured.image || heroHealthImage}
                category={featured.category}
                categorySlug={'health'}
                date={featured.date}
                href={`/articles/${featured.slug}`}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;