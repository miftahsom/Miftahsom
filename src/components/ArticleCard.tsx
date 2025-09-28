import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  href: string;
  variant?: 'default' | 'small' | 'hero' | 'mobile-horizontal';
}

const ArticleCard = ({
  title,
  excerpt,
  image,
  category,
  date,
  href,
  variant = 'default'
}: ArticleCardProps) => {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Health': 'text-category-health bg-category-health/10',
      'Parenting': 'text-category-parenting bg-category-parenting/10',
      'Education': 'text-category-education bg-category-education/10',
      'Quran': 'text-category-quran bg-category-quran/10',
      'Baby Names': 'text-category-baby-names bg-category-baby-names/10',
    };
    return colors[cat] || 'text-text-secondary bg-text-secondary/10';
  };

  const getImageClasses = () => {
    switch (variant) {
      case 'hero':
        return 'h-48 sm:h-64 lg:h-96';
      case 'small':
        return 'h-36 lg:h-40';
      default:
        return 'h-48 sm:h-56';
    }
  };

  const getTitleClasses = () => {
    switch (variant) {
      case 'hero':
        return 'text-hero-title';
      case 'small':
        return 'text-card-title';
      default:
        return 'text-article-title';
    }
  };

  // Mobile horizontal layout for Al Jazeera style
  if (variant === 'mobile-horizontal') {
    return (
      <article className="group bg-card hover:bg-card/80 transition-all duration-300">
        <Link to={href} className="flex items-start space-x-3 p-3">
          {/* Image Container - Small square on left */}
          <div className="relative overflow-hidden w-20 h-20 rounded-md flex-shrink-0">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-sm font-semibold text-card-foreground mb-1 group-hover:text-aljazeera-blue transition-colors line-clamp-2 leading-tight">
              {title}
            </h3>

            {/* Date */}
            <div className="text-xs text-text-meta">
              <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })}</time>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-card border border-card-border rounded-large overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={href} className="block">
        {/* Image Container */}
        <div className={`relative overflow-hidden ${getImageClasses()}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-2 py-1 rounded text-small font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          {/* Gradient Overlay for better text readability on hero */}
          {variant === 'hero' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className={`p-4 ${variant === 'small' ? 'p-3' : ''}`}>
          {/* Date */}
          <div className="flex items-center text-text-meta text-meta mb-2">
            <Calendar className="w-3 h-3 mr-1" />
            <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</time>
          </div>

          {/* Title */}
          <h3 className={`${getTitleClasses()} font-semibold text-card-foreground mb-2 group-hover:text-aljazeera-blue transition-colors line-clamp-2`}>
            {title}
          </h3>

          {/* Excerpt - hidden on small variant */}
          {variant !== 'small' && (
            <p className="text-body text-text-secondary line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;