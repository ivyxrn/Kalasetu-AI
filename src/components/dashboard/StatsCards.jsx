import React from 'react';
import { Image, BookOpen, LayoutGrid, BarChart2 } from 'lucide-react';
import { stats } from '../../data/sampleData';
import { useLanguage } from '../../i18n';

const iconMap = { Image, BookOpen, LayoutGrid, BarChart2 };

const iconStyles = {
  Image:      { icon: 'text-terracotta',   bg: 'bg-terracotta/10' },
  BookOpen:   { icon: 'text-forest',       bg: 'bg-forest/10' },
  LayoutGrid: { icon: 'text-ochre-dark',   bg: 'bg-ochre/15' },
  BarChart2:  { icon: 'text-brown/60',     bg: 'bg-brown/10' },
};

export default function StatsCards() {
  const { t } = useLanguage();

  const getStatLabel = (stat) => {
    switch (stat.id) {
      case 1:
        return t('dashboard.stats.totalArtworks', stat.label);
      case 2:
        return t('dashboard.stats.storiesCreated', stat.label);
      case 3:
        return t('dashboard.stats.portfolioPublished', stat.label);
      case 4:
        return t('dashboard.stats.catalogueListings', stat.label);
      default:
        return stat.label;
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || Image;
        const style = iconStyles[stat.icon] || iconStyles.BarChart2;

        return (
          <div key={stat.id} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${style.bg}`}>
              <Icon size={17} className={style.icon} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-serif font-semibold text-brown leading-none" style={{ fontSize: '1.6rem' }}>
                {stat.value}
              </p>
              <p className="font-sans text-brown/50 mt-1 leading-tight" style={{ fontSize: '0.72rem' }}>
                {getStatLabel(stat)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
