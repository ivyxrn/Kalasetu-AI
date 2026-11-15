import React from 'react';
import { Image, CheckCircle2, FileText } from 'lucide-react';
import { useLanguage } from '../../i18n';

export default function ArtworkStats({ artworks }) {
  const { t } = useLanguage();
  const total = artworks.length;
  const published = artworks.filter((a) => a.status === 'Published').length;
  const drafts = artworks.filter((a) => a.status === 'Draft').length;

  const statItems = [
    {
      id: 'total',
      label: t('artwork.totalArtworks', 'Total Artworks'),
      value: total,
      icon: Image,
      iconColor: 'text-terracotta',
      bgColor: 'bg-terracotta/10 border-terracotta/20',
    },
    {
      id: 'published',
      label: t('artwork.published', 'Published'),
      value: published,
      icon: CheckCircle2,
      iconColor: 'text-[#2D5A3C]',
      bgColor: 'bg-[#EBF3ED] border-[#C6DEC9]',
    },
    {
      id: 'drafts',
      label: t('artwork.drafts', 'Drafts'),
      value: drafts,
      icon: FileText,
      iconColor: 'text-[#8C6B28]',
      bgColor: 'bg-[#FDF6E8] border-[#EDDCBA]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-beige-light border border-beige-dark/55 rounded-xl p-4 flex items-center gap-4 shadow-card hover:shadow-card-hover transition-all duration-200"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.bgColor}`}
            >
              <Icon size={20} className={item.iconColor} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-serif font-bold text-brown text-2xl leading-none">
                {item.value}
              </p>
              <p className="font-sans text-brown/55 text-xs mt-1 font-medium leading-tight">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

