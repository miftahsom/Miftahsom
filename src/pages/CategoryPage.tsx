import { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { useTranslation } from '@/contexts/TranslationContext';
import { loadBlogPosts, BlogPost } from '@/lib/contentLoader';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';
import heroEducationImage from '@/assets/hero-education.jpg';
import heroBabyNamesImage from '@/assets/hero-baby-names.jpg';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Extract category from pathname if not in params
  const getCurrentCategory = () => {
    if (category) return category;
    const path = location.pathname.replace('/', '');
    return path || 'health';
  };
  
  const categoryInfo: Record<string, { title: string; description: string; image: string }> = {
    'parenting': {
      title: t('category.parenting.title'),
      description: t('category.parenting.description'),
      image: heroParentingImage
    },
    'baby-names': {
      title: t('category.baby-names.title'),
      description: t('category.baby-names.description'),
      image: heroBabyNamesImage
    },
    'education': {
      title: t('category.education.title'),
      description: t('category.education.description'),
      image: heroEducationImage
    },
    'quran': {
      title: t('category.quran.title'),
      description: t('category.quran.description'),
      image: heroQuranImage
    }
  };

  const currentCategory = getCurrentCategory();
  const info = categoryInfo[currentCategory] || {
    title: t('category.health.title'),
    description: t('category.health.description'),
    image: heroHealthImage
  };

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const all = await loadBlogPosts();
        const filtered = all.filter(p => p.category.toLowerCase().includes(info.title.toLowerCase().split(' ')[0].toLowerCase()));
        setPosts(filtered);
      } catch (e) {
        setError('load-failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [currentCategory, info.title]);

  return (
    <Layout>
      {/* Category Header */}
      <div className="bg-aljazeera-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{info.title}</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              {info.description}
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p, index) => (
                <ArticleCard
                  key={index}
                  title={p.title}
                  excerpt={p.excerpt}
                  image={p.image || info.image}
                  category={p.category}
                  categorySlug={currentCategory as 'health' | 'parenting' | 'education' | 'quran' | 'baby-names'}
                  date={p.date}
                  href={`/articles/${p.slug}`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden xl:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;