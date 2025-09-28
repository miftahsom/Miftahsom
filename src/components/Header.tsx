import { useState } from 'react';
import { Search, Globe, Menu, X, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, toggleLanguage, t } = useTranslation();

  const navigationItems = [
    { title: t('nav.health'), href: '/health', active: true },
    { title: t('nav.parenting'), href: '/parenting' },
    { title: t('nav.baby-names'), href: '/baby-names' },
    { title: t('nav.education'), href: '/education' },
    { title: t('nav.quran'), href: '/quran' },
  ];

  return (
    <header className="bg-background border-b border-border-light sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center h-header justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-aljazeera-blue rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm md:text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-base md:text-xl font-bold text-foreground leading-tight">Miftah Som Academy</h1>
              <p className="text-xs md:text-sm text-text-secondary">Health &amp; Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-aljazeera-blue relative ${
                  item.active
                    ? 'text-aljazeera-blue after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-0.5 after:bg-aljazeera-blue'
                    : 'text-text-secondary'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {/* Social Media Icons - Desktop Only */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://youtube.com/@miftahsom"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-secondary hover:text-aljazeera-blue transition-colors"
                aria-label={t('social.youtube')}
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@miftahsom"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-secondary hover:text-aljazeera-blue transition-colors"
                aria-label={t('social.tiktok')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.16z"/>
                </svg>
              </a>
            </div>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 sm:p-1.5 md:p-2 text-text-secondary hover:text-aljazeera-blue transition-colors"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 md:w-80 bg-background border border-border rounded-large shadow-lg p-4 z-50">
                  <input
                    type="text"
                    placeholder={t('common.search')}
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-aljazeera-blue"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="relative hidden sm:block">
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-2 py-1 text-text-secondary hover:text-aljazeera-blue transition-colors border border-border rounded text-xs sm:text-sm"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className={`font-medium ${language === 'en' ? 'text-aljazeera-blue' : ''}`}>EN</span>
                <span className="text-text-meta">|</span>
                <span className={`font-medium ${language === 'so' ? 'text-aljazeera-blue' : ''}`}>SO</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1 sm:p-1.5 md:p-2 text-text-secondary hover:text-aljazeera-blue transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border-light py-3 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors py-2 px-1 ${
                    item.active ? 'text-aljazeera-blue' : 'text-text-secondary hover:text-aljazeera-blue'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Language Toggle & Social Media */}
            <div className="pt-2 border-t border-border-light space-y-3">
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-text-secondary hover:text-aljazeera-blue transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'en' ? t('common.switch-to-somali') : t('common.switch-to-english')}
                </span>
              </button>
              
              {/* Mobile Social Media */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://youtube.com/@miftahsom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-aljazeera-blue transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="text-sm">{t('social.youtube')}</span>
                </a>
                <a
                  href="https://tiktok.com/@miftahsom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-aljazeera-blue transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.16z"/>
                  </svg>
                  <span className="text-sm">{t('social.tiktok')}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;