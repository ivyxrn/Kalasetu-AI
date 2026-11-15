import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, BookOpen, User } from 'lucide-react';
import { quickActions } from '../../data/sampleData';
import { useLanguage } from '../../i18n';

const iconMap = {
  Upload,
  Sparkles,
  FileText: BookOpen,
  User,
};

const colorStyles = {
  terracotta: {
    icon: 'text-terracotta',
    bg: 'bg-terracotta/10 group-hover:bg-terracotta/15',
    title: 'group-hover:text-terracotta',
  },
  forest: {
    icon: 'text-forest',
    bg: 'bg-forest/10 group-hover:bg-forest/15',
    title: 'group-hover:text-forest',
  },
  ochre: {
    icon: 'text-ochre-dark',
    bg: 'bg-ochre/15 group-hover:bg-ochre/20',
    title: 'group-hover:text-ochre-dark',
  },
  brown: {
    icon: 'text-brown/70',
    bg: 'bg-brown/10 group-hover:bg-brown/15',
    title: 'group-hover:text-brown',
  },
};

export default function QuickActions() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleActionClick = (route) => {
    if (route) navigate(route);
  };

  const getActionContent = (action) => {
    switch (action.id) {
      case 1:
        return {
          title: t('dashboard.quickActions.uploadArtwork', action.title),
          desc: t('dashboard.quickActions.uploadDesc', action.description),
        };
      case 2:
        return {
          title: t('dashboard.quickActions.createArtStory', action.title),
          desc: t('dashboard.quickActions.createArtStoryDesc', action.description),
        };
      case 3:
        return {
          title: t('dashboard.quickActions.createCatalogue', action.title),
          desc: t('dashboard.quickActions.createCatalogueDesc', action.description),
        };
      case 4:
        return {
          title: t('dashboard.quickActions.myPortfolio', action.title),
          desc: t('dashboard.quickActions.myPortfolioDesc', action.description),
        };
      default:
        return { title: action.title, desc: action.description };
    }
  };

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-serif font-semibold text-brown text-base tracking-tight">
          {t('dashboard.quickActions.title', 'Quick Actions')}
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = iconMap[action.icon] || Upload;
          const styles = colorStyles[action.color] || colorStyles.brown;
          const content = getActionContent(action);

          return (
            <button
              key={action.id}
              className="action-card group text-left"
              onClick={() => handleActionClick(action.route)}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${styles.bg}`}
              >
                <Icon size={16} className={styles.icon} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-sans font-semibold text-brown leading-tight transition-colors duration-200 truncate ${styles.title}`}
                  style={{ fontSize: '0.8125rem' }}
                >
                  {content.title}
                </p>
                <p
                  className="font-sans text-brown/50 mt-0.5 leading-tight truncate"
                  style={{ fontSize: '0.72rem' }}
                >
                  {content.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
