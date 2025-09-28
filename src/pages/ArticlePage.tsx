import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import ArticleCard from '@/components/ArticleCard';
import { Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import heroHealthImage from '@/assets/hero-health-nutrition.jpg';
import heroParentingImage from '@/assets/hero-parenting.jpg';
import heroQuranImage from '@/assets/hero-quran.jpg';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  // Mock article data
  const article = {
    title: "Essential Nutrition Guide: Building Healthy Eating Habits for the Whole Family",
    subtitle: "Discover comprehensive strategies for maintaining optimal health through balanced nutrition, including practical meal planning tips and evidence-based dietary recommendations.",
    image: heroHealthImage,
    category: t('category.health.title'),
    date: "2025-01-15",
    author: "Dr. Amina Hassan",
    readTime: `8 ${t('article.read-time')}`,
    content: `
      <p>Maintaining a healthy diet for your family can seem overwhelming in today's fast-paced world. However, with the right strategies and understanding of nutritional fundamentals, you can create sustainable eating habits that benefit everyone in your household.</p>

      <h2>Understanding Nutritional Basics</h2>
      <p>A balanced diet consists of five main food groups: fruits, vegetables, grains, protein foods, and dairy. Each group provides essential nutrients that our bodies need to function optimally. The key is to consume foods from all groups in appropriate proportions.</p>

      <h3>The Foundation: Fruits and Vegetables</h3>
      <p>Fruits and vegetables should form the foundation of your family's diet. They provide essential vitamins, minerals, fiber, and antioxidants that protect against chronic diseases. Aim to fill half your plate with colorful fruits and vegetables at each meal.</p>

      <h3>Whole Grains for Sustained Energy</h3>
      <p>Choose whole grains over refined grains whenever possible. Brown rice, quinoa, whole wheat bread, and oats provide more fiber, vitamins, and minerals than their processed counterparts. These foods help maintain steady blood sugar levels and provide lasting energy.</p>

      <h2>Meal Planning Strategies</h2>
      <p>Successful family nutrition starts with planning. Dedicate time each week to plan meals, create shopping lists, and prepare ingredients in advance. This approach reduces stress, saves money, and ensures your family eats nutritious meals consistently.</p>

      <h3>Batch Cooking and Preparation</h3>
      <p>Prepare large batches of healthy staples like grains, legumes, and chopped vegetables on weekends. This investment of time pays dividends throughout the week when you can quickly assemble nutritious meals.</p>

      <h2>Creating Healthy Habits</h2>
      <p>Building lasting healthy eating habits requires patience and consistency. Start with small changes and gradually incorporate more nutritious foods into your family's routine. Remember, the goal is progress, not perfection.</p>
    `
  };

  const relatedArticles = [
    {
      title: "Healthy Breakfast Ideas for Growing Children",
      excerpt: "Start your child's day right with these nutritious and delicious breakfast options.",
      image: heroHealthImage,
      category: t('category.health.title'),
      date: "2025-01-10",
      href: "/articles/healthy-breakfast-children"
    },
    {
      title: "Teaching Children About Healthy Food Choices", 
      excerpt: "Practical strategies for educating kids about nutrition in an age-appropriate way.",
      image: heroParentingImage,
      category: t('category.parenting.title'),
      date: "2025-01-08",
      href: "/articles/teaching-healthy-food-choices"
    },
    {
      title: "Islamic Principles of Eating and Nutrition",
      excerpt: "Explore how Islamic teachings guide us toward mindful and healthy eating habits.",
      image: heroQuranImage,
      category: t('category.quran.title'),
      date: "2025-01-05",
      href: "/articles/islamic-principles-nutrition"
    }
  ];

  return (
    <Layout>
      {/* Article Header */}
      <article className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Article Content */}
          <div className="flex-1 max-w-4xl">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-category-health/10 text-category-health text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Article Subtitle */}
            <p className="text-xl text-text-secondary mb-6 leading-relaxed">
              {article.subtitle}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-text-meta text-sm mb-8 pb-6 border-b border-border-light">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{t('article.author')}: {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <span>{article.readTime}</span>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 lg:h-80 object-cover rounded-large"
              />
            </div>

            {/* Social Share Bar - Floating Left */}
            <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-10">
              <div className="flex flex-col gap-3 bg-background border border-border-light rounded-large p-3 shadow-sm">
                <button className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-text-secondary hover:text-blue-400 hover:bg-blue-50 rounded transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-text-secondary hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 text-text-secondary hover:text-aljazeera-blue hover:bg-aljazeera-blue/10 rounded transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.7',
                fontSize: '1.125rem'
              }}
            />

            {/* Mobile Social Share */}
            <div className="lg:hidden mt-8 pt-6 border-t border-border-light">
              <div className="flex items-center justify-center gap-4">
                <span className="text-text-secondary text-sm font-medium">{t('article.share')}:</span>
                <div className="flex gap-3">
                  <button className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-blue-400 hover:bg-blue-50 rounded transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-card-hover rounded-large border border-card-border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-aljazeera-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{article.author}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t('article.author-bio')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden xl:block">
            <Sidebar />
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">{t('article.related-articles')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                category={article.category}
                date={article.date}
                href={article.href}
              />
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default ArticlePage;