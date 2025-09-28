import ArticleCard from './ArticleCard';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';
import { useTranslation } from '@/contexts/TranslationContext';

const HeroSection = () => {
  const { t } = useTranslation();
  
  // Mock data - exactly matching Al Jazeera layout structure
  const heroArticle = {
    title: t('hero.main-title'),
    excerpt: t('hero.main-excerpt'),
    image: heroHealthImage,
    category: t('category.health.title'),
    date: "2025-01-15",
    href: "/articles/essential-nutrition-guide"
  };

  const sideArticles = [
    {
      title: t('hero.side1-title'),
      excerpt: t('hero.side1-excerpt'),
      image: heroParentingImage,
      category: t('category.parenting.title'), 
      date: "2025-01-14",
      href: "/articles/modern-parenting-balance"
    },
    {
      title: t('hero.side2-title'),
      excerpt: t('hero.side2-excerpt'),
      image: heroQuranImage,
      category: t('category.quran.title'),
      date: "2025-01-13", 
      href: "/articles/quranic-values-daily-life"
    }
  ];

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
          <ArticleCard
            variant="hero"
            title={heroArticle.title}
            excerpt={heroArticle.excerpt}
            image={heroArticle.image}
            category={heroArticle.category}
            date={heroArticle.date}
            href={heroArticle.href}
          />
        </div>

        {/* Side Articles - Horizontal Layout */}
        <div className="space-y-3">
          {sideArticles.map((article, index) => (
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

      {/* Desktop: Al Jazeera Layout - Large right, two stacked left */}
      <div className="hidden lg:block py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Two Stacked Articles */}
          <div className="col-span-1 space-y-6">
            {sideArticles.map((article, index) => (
              <ArticleCard
                key={index}
                variant="small"
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                category={article.category}
                date={article.date}
                href={article.href}
              />
            ))}
          </div>

          {/* Right Column: Large Hero Article */}
          <div className="col-span-2">
            <ArticleCard
              variant="hero"
              title={heroArticle.title}
              excerpt={heroArticle.excerpt}
              image={heroArticle.image}
              category={heroArticle.category}
              date={heroArticle.date}
              href={heroArticle.href}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;