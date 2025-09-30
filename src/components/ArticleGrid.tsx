import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';
import heroEducationImage from '@/assets/hero-education.jpg';
import heroBabyNamesImage from '@/assets/hero-baby-names.jpg';
import { useTranslation } from '@/contexts/TranslationContext';
import { loadBlogPosts, BlogPost } from '@/lib/contentLoader';

const ArticleGrid = () => {
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
        // Surface error in console to diagnose missing posts in production
        console.error('[ArticleGrid] Failed to load blog posts', e);
        setError('load-failed');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="container mx-auto px-4 lg:px-6">
      {/* Mobile: Al Jazeera Health Style - Horizontal Cards */}
      <div className="lg:hidden py-4">
        <div className="space-y-3">
          {posts.length === 0 && !loading && (
            <div className="text-center text-text-secondary py-6">
              No articles available yet.
            </div>
          )}
          {posts.map((p, index) => (
            <ArticleCard
              key={index}
              variant="mobile-horizontal"
              title={p.title}
              excerpt={p.excerpt}
              image={p.image || heroHealthImage}
              category={p.category}
              date={p.date}
              href={`/articles/${p.slug}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 3 Column Grid */}
      <div className="hidden lg:block py-8">
        <div className="grid grid-cols-3 gap-6">
          {posts.length === 0 && !loading && (
            <div className="col-span-3 text-center text-text-secondary py-12 border border-dashed border-card-border rounded-lg">
              No articles available yet.
            </div>
          )}
          {posts.map((p, index) => (
            <ArticleCard
              key={index}
              title={p.title}
              excerpt={p.excerpt}
              image={p.image || heroHealthImage}
              category={p.category}
            categorySlug={'health'}
              date={p.date}
              href={`/articles/${p.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;