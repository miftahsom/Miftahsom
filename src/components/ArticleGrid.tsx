import ArticleCard from './ArticleCard';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';
import heroEducationImage from '@/assets/hero-education.jpg';
import heroBabyNamesImage from '@/assets/hero-baby-names.jpg';
import { useTranslation } from '@/contexts/TranslationContext';

const ArticleGrid = () => {
  const { t } = useTranslation();
  
  // Mock articles data - 15+ articles for populated feel
  const articles = [
    {
      title: t('articles.somali-baby-names'),
      excerpt: t('articles.somali-baby-names-excerpt'),
      image: heroBabyNamesImage,
      category: t('category.baby-names.title'),
      categorySlug: 'baby-names' as const,
      date: "2025-01-12",
      href: "/articles/somali-baby-names-heritage"
    },
    {
      title: t('articles.work-life-balance'),
      excerpt: t('articles.work-life-balance-excerpt'),
      image: heroEducationImage,
      category: t('category.education.title'),
      categorySlug: 'education' as const,
      date: "2025-01-11",
      href: "/articles/work-life-balance-countries-2025"
    },
    {
      title: t('articles.islamic-values'),
      excerpt: t('articles.islamic-values-excerpt'),
      image: heroQuranImage,
      category: t('category.quran.title'),
      categorySlug: 'quran' as const,
      date: "2025-01-10",
      href: "/articles/teaching-islamic-values-home"
    },
    {
      title: t('articles.healthy-breakfast'), 
      excerpt: t('articles.healthy-breakfast-excerpt'),
      image: heroHealthImage,
      category: t('category.health.title'),
      categorySlug: 'health' as const,
      date: "2025-01-09",
      href: "/articles/healthy-breakfast-children"
    },
    {
      title: t('articles.positive-discipline'),
      excerpt: t('articles.positive-discipline-excerpt'),
      image: heroParentingImage,
      category: t('category.parenting.title'),
      categorySlug: 'parenting' as const,
      date: "2025-01-08",
      href: "/articles/positive-discipline-toddlers"
    },
    {
      title: t('articles.educational-activities'),
      excerpt: t('articles.educational-activities-excerpt'),
      image: heroEducationImage,
      category: t('category.education.title'), 
      categorySlug: 'education' as const,
      date: "2025-01-07",
      href: "/articles/educational-activities-preschoolers"
    },
    {
      title: t('articles.arabic-names-girls'),
      excerpt: t('articles.arabic-names-girls-excerpt'),
      image: heroBabyNamesImage,
      category: t('category.baby-names.title'),
      categorySlug: 'baby-names' as const,
      date: "2025-01-06", 
      href: "/articles/meaningful-arabic-names-girls"
    },
    {
      title: t('articles.mental-health-parenting'),
      excerpt: t('articles.mental-health-parenting-excerpt'),
      image: heroParentingImage,
      category: t('category.parenting.title'),
      categorySlug: 'parenting' as const,
      date: "2025-01-05",
      href: "/articles/mental-health-parenting-balance"
    },
    {
      title: t('articles.quran-memorization'), 
      excerpt: t('articles.quran-memorization-excerpt'),
      image: heroQuranImage,
      category: t('category.quran.title'),
      categorySlug: 'quran' as const,
      date: "2025-01-04",
      href: "/articles/quran-memorization-children"
    },
    {
      title: t('articles.immune-systems'),
      excerpt: t('articles.immune-systems-excerpt'),
      image: heroHealthImage,
      category: t('category.health.title'),
      categorySlug: 'health' as const,
      date: "2025-01-03",
      href: "/articles/building-immune-systems-naturally"
    },
    {
      title: t('articles.stem-education'),
      excerpt: t('articles.stem-education-excerpt'),
      image: heroEducationImage,
      category: t('category.education.title'),
      categorySlug: 'education' as const,
      date: "2025-01-02",
      href: "/articles/stem-education-children-future"
    },
    {
      title: t('articles.traditional-somali-names'),
      excerpt: t('articles.traditional-somali-names-excerpt'),
      image: heroBabyNamesImage,
      category: t('category.baby-names.title'),
      categorySlug: 'baby-names' as const,
      date: "2025-01-01",
      href: "/articles/traditional-somali-names-modern"
    }
  ];

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
              href={article.href}
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
            categorySlug={article.categorySlug}
              date={article.date}
              href={article.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;