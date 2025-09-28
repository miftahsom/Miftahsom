import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  
  const footerSections = [
    {
      title: t('footer.content'),
      links: [
        { title: t('category.health.title'), href: "/health" },
        { title: t('category.parenting.title'), href: "/parenting" },
        { title: t('category.baby-names.title'), href: "/baby-names" },
        { title: t('category.education.title'), href: "/education" },
        { title: t('category.quran.title'), href: "/quran" }
      ]
    },
    {
      title: t('footer.about-us'), 
      links: [
        { title: t('footer.our-mission'), href: "/about" },
        { title: t('footer.contact-us'), href: "/contact" },
        { title: t('footer.editorial-team'), href: "/team" },
        { title: t('footer.privacy-policy'), href: "/privacy" },
        { title: t('footer.terms-of-service'), href: "/terms" }
      ]
    },
    {
      title: t('footer.resources'),
      links: [
        { title: t('footer.article-archive'), href: "/archive" },
        { title: t('footer.research-library'), href: "/research" },
        { title: t('footer.expert-contributors'), href: "/experts" },
        { title: t('footer.community-guidelines'), href: "/guidelines" },
        { title: t('footer.rss-feeds'), href: "/rss" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: t('social.facebook') },
    { icon: Twitter, href: "#", label: t('social.twitter') },
    { icon: Instagram, href: "#", label: t('social.instagram') },
    { icon: Youtube, href: "#", label: t('social.youtube') }
  ];

  return (
    <footer className="bg-background border-t border-border-light">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-aljazeera-blue rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Miftah Som Academy</h3>
                  <p className="text-sm text-text-secondary">Health &amp; Education</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-aljazeera-blue" />
                <span>info@miftahsom.academy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-aljazeera-blue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-aljazeera-blue" />
                <span>Global Online Platform</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 bg-card-hover rounded-full flex items-center justify-center text-text-secondary hover:bg-aljazeera-blue hover:text-white transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary hover:text-aljazeera-blue transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border-light">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-text-secondary">
              {t('footer.copyright')}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-text-secondary hover:text-aljazeera-blue transition-colors">
                {t('footer.privacy-policy')}
              </Link>
              <Link to="/terms" className="text-text-secondary hover:text-aljazeera-blue transition-colors">
                {t('footer.terms-of-service')}
              </Link>
              <Link to="/cookies" className="text-text-secondary hover:text-aljazeera-blue transition-colors">
                {t('footer.cookie-policy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;