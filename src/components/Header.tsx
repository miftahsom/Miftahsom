import { useState } from 'react';
import { Search, Globe, Menu, X, Youtube, ChevronDown } from 'lucide-react';
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
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo - Text Based */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground leading-tight">Miftah Som Academy</h1>
              <p className="text-xs text-text-secondary">Health & Education</p>
            </div>
            {/* Mobile Logo Text */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-foreground">Miftah Som Academy</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 relative group ${
                  item.active
                    ? 'text-blue-600'
                    : 'text-text-secondary'
                }`}
              >
                {item.title}
                {item.active && (
                  <div className="absolute -bottom-6 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Mobile Optimized */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-border rounded-xl shadow-xl p-4 z-50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('common.search')}
                      className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-blue-600">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Toggle - Desktop */}
            <div className="hidden sm:block">
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border border-border rounded-lg text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className={`font-medium ${language === 'en' ? 'text-blue-600' : ''}`}>EN</span>
                <span className="text-text-meta">|</span>
                <span className={`font-medium ${language === 'so' ? 'text-blue-600' : ''}`}>SO</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced Design */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border-light bg-background">
            {/* Mobile Navigation Links */}
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2 ${
                    item.active 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-text-secondary hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.title}</span>
                  {item.active && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Language Toggle */}
            <div className="px-4 py-3 border-t border-border-light">
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-text-secondary hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4" />
                  <span>{language === 'en' ? t('common.switch-to-somali') : t('common.switch-to-english')}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            {/* Mobile Social Media */}
            <div className="px-4 py-3 border-t border-border-light">
              <div className="flex items-center justify-center space-x-6">
                <a
                  href="https://youtube.com/@miftahsom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-blue-600 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('social.youtube')}</span>
                </a>
                <a
                  href="https://tiktok.com/@miftahsom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.16z"/>
                  </svg>
                  <span className="text-sm font-medium">{t('social.tiktok')}</span>
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